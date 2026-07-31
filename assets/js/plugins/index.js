/**
 * file: assets/js/plugins/index.js
 * Modul ekspor utama yang terkelompok secara rapi dan modular.
 */

// 1. Core Runtime & Lifecycle
export { PluginRegistry } from './plugin.registry.js';
export { PluginLoader } from './plugin.loader.js';
export { PluginBootstrap } from './plugin.bootstrap.js';
export { PluginManager } from './plugin.manager.js';
export { PluginService } from './plugin.service.js';
export { PluginManifestRegistry } from './plugin.manifest.registry.js';
export { PluginContext, ManifestContext, RuntimeContext, ExecutionContext } from './plugin.context.js';
export { PluginDependencyGraphRegistry } from './plugin.dependency.graph.js';
export { PluginResolver } from './plugin.resolver.js';
export { PluginActivator } from './plugin.activator.js';
export { PluginCacheManager } from './plugin.cache.manager.js';

// 2. Transaction & Journal
export { PluginTransactionManager } from './plugin.transaction.manager.js';
export { PluginTransactionJournal, JOURNAL_STATES } from './plugin.transaction.journal.js';
export { PluginDisposalService } from './plugin.disposal.service.js';
export { DisposalQueue } from './plugin.disposal.queue.js';
export { PluginLazyActivator } from './plugin.lazy.activator.js';

// 3. Security, Crypto & Trust Store
export { CryptoEngine } from './plugin.crypto.engine.js';
export { PublisherTrustStore } from './plugin.trust.store.js';
export { CAHierarchyValidator } from './plugin.ca.hierarchy.validator.js';
export { InstallationAuditTrail, AUDIT_ACTIONS } from './plugin.audit.trail.js';
export { CapabilityGate, CAPABILITY_PERMISSIONS } from './plugin.capability.gate.js';

// 4. Marketplace & Repository
export { PluginMarketplaceClient } from './plugin.marketplace.client.js';
export { GlobalRepositoryProvider, RepositoryProvider } from './plugin.repository.provider.js';
export { SecurePluginInstaller } from './plugin.marketplace.installer.js';
export { TcPluginPackageParser } from './plugin.package.parser.js';
export { MarketplaceSearchEngine, GlobalMarketplaceSearchEngine } from './plugin.marketplace.indexer.js';
export { MarketplaceRankingEngine } from './plugin.marketplace.ranking.engine.js';
export { MARKETPLACE_CATEGORIES, CATEGORY_METADATA } from './plugin.marketplace.categories.js';

// 5. Update Engine & Patching
export { UpdateConstraintManager, GlobalUpdateConstraintManager } from './plugin.update.constraints.js';
export { UpdateChannelSelector, GlobalUpdateChannelSelector } from './plugin.update.channels.js';
export { DeltaPatcher } from './plugin.delta.patcher.js';
export { PluginUpdateEngine } from './plugin.update.engine.js';

// 6. Worker Sandbox & Extension Host
export { ExtensionHostBridge } from './plugin.extension.host.js';
export { WebWorkerPluginSandbox } from './plugin.worker.sandbox.js';

// 7. Types & Exceptions
export { PluginSemVer } from './plugin.semver.js';
export { PluginDependencyMissingException, PluginCircularDependencyException, PluginStateTransitionException } from './plugin.exceptions.js';
export { PLUGIN_LIFECYCLE_STATES, PLUGIN_EVENTS } from './plugin.types.js';
export { MARKETPLACE_EVENTS, TRUST_LEVELS, UPDATE_CHANNELS } from './plugin.marketplace.types.js';