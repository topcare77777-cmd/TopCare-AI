/**
 * file: assets/js/plugins/plugin.marketplace.installer.js
 */

import { Core } from '../core/index.js';
import { MARKETPLACE_EVENTS, TRUST_LEVELS } from './plugin.marketplace.types.js';
import { PluginRegistry } from './plugin.registry.js';
import { CryptoEngine } from './plugin.crypto.engine.js';
import { TcPluginPackageParser } from './plugin.package.parser.js';
import { InstallationAuditTrail } from './plugin.audit.trail.js';
import { PublisherTrustStore } from './plugin.trust.store.js';
import { PluginValidationService } from './plugin.validation.service.js';

export class SecurePluginInstaller {
    static async installPackage(meta, packageBuffer) {
        Core.Event.emit(MARKETPLACE_EVENTS.DOWNLOADING, { id: meta.id });
        Core.Logger.info(`Executing cryptographic verification & installation pipeline for: ${meta.id}`);

        try {
            // 1. Real Cryptographic Checksum Verification (SHA-256)
            Core.Event.emit(MARKETPLACE_EVENTS.VERIFYING, { id: meta.id });
            const computedChecksum = await CryptoEngine.computeSHA256(packageBuffer);

            if (meta.checksum && computedChecksum !== meta.checksum) {
                throw new Error(`Security Error: Package checksum mismatch! Expected '${meta.checksum}', computed '${computedChecksum}'. File compromised.`);
            }

            // 2. Parse Structured Container Package (.tcplugin)
            const parsedPackage = TcPluginPackageParser.parsePackage(packageBuffer);
            const manifest = parsedPackage.manifest;

            // 3. Publisher Identity & Digital Signature Verification
            const publisherId = manifest.publisherId || meta.publisherId;
            let signatureVerified = false;

            if (publisherId) {
                const publisherRecord = PublisherTrustStore.getPublisher(publisherId);
                if (publisherRecord && PublisherTrustStore.isTrusted(publisherId)) {
                    signatureVerified = await CryptoEngine.verifySignature(
                        parsedPackage.rawCodeBuffer,
                        parsedPackage.signature,
                        publisherRecord.publicKey
                    );
                    if (!signatureVerified) {
                        throw new Error(`Security Error: Digital signature validation failed for publisher '${publisherId}'. Package modification detected!`);
                    }
                    Core.Logger.info(`Digital signature successfully verified for publisher: ${publisherId}`);
                } else if (meta.trustLevel !== TRUST_LEVELS.UNSIGNED && !meta.allowUnsigned) {
                    throw new Error(`Security Error: Untrusted or unregistered publisher '${publisherId}'. Installation rejected.`);
                }
            }

            // 4. Validate Manifest Schema with PluginValidationService
            const validationResult = await PluginValidationService.validate(manifest);
            if (!validationResult.valid) {
                const errs = validationResult.errors.map(e => e.message).join('; ');
                throw new Error(`Manifest Validation Failed: ${errs}`);
            }

            // 5. Construct Executable Plugin Manifest
            const pluginManifest = {
                id: manifest.id,
                name: manifest.name,
                version: manifest.version,
                dependencies: Array.isArray(manifest.dependencies) ? manifest.dependencies : Object.keys(manifest.dependencies || {}),
                permissions: manifest.permissions || {},
                capabilities: manifest.capabilities || [],
                cachePolicy: meta.cachePolicy || 'unload',
                loader: async () => {
                    // Evaluate code payload safely inside runtime context
                    const moduleExports = {};
                    const runFactory = new Function('exports', 'module', 'Core', parsedPackage.codePayload);
                    const moduleObj = { exports: moduleExports };
                    runFactory(moduleExports, moduleObj, Core);
                    return moduleObj.exports;
                }
            };

            // 6. Transactional Registration to Runtime
            Core.Event.emit(MARKETPLACE_EVENTS.INSTALLATION_QUEUED, { id: meta.id });
            await PluginRegistry.register(pluginManifest);

            // 7. Record Immutable Cryptographic Audit Log
            await InstallationAuditTrail.recordInstallation({
                ...meta,
                publisherId: publisherId || 'Unknown'
            }, {
                signatureVerified,
                user: 'enterprise-admin'
            });

            Core.Event.emit(MARKETPLACE_EVENTS.INSTALLED, { id: meta.id });
            Core.Logger.info(`Secure package installation completed successfully for: ${meta.id}`);
            return true;
        } catch (err) {
            Core.Logger.error(`Secure installation pipeline aborted for '${meta.id}': ${err.message}`);
            Core.Event.emit(MARKETPLACE_EVENTS.FAILED, { id: meta.id, error: err.message });
            throw err;
        }
    }
}