/**
 * TOPCARE AI PLATFORM V2 — AUTH PERMISSION COMPATIBILITY BRIDGE
 * Path: assets/js/auth/auth.permission.js
 * Status: ACTIVE - FIX BUILD 138.2
 * SRP: Compatibility Bridge Adapter mapping legacy import path to V2 Permission Definitions
 */

export const PERMISSIONS = Object.freeze({
    // Patient Domain
    PATIENT_READ: 'patient.read',
    PATIENT_WRITE: 'patient.write',

    // SOAP & Clinical Notes Domain
    SOAP_READ: 'soap.read',
    SOAP_WRITE: 'soap.write',

    // Vitals & Prescriptions
    VITAL_WRITE: 'vital.write',
    PRESCRIPTION_WRITE: 'prescription.write',

    // AI Coach & Workspace Domain
    COACH_ACCESS: 'coach.access',
    PERSONALITY_TEST: 'personality.test',
    WORKSPACE_CHAT: 'workspace.chat'
});

export default PERMISSIONS;
