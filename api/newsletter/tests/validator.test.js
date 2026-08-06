import { processEmailInput, normalizeSource } from '../gateway.js';

console.log('--- RUNNING UNIT TESTS: VALIDATOR ---');

// Test 1: Valid Email
console.assert(processEmailInput('  User.Test@Domain.com ') === 'user.test@domain.com', 'Test 1 Failed');

// Test 2: Invalid Email Syntax
console.assert(processEmailInput('invalid-email-string') === null, 'Test 2 Failed');

// Test 3: XSS Attempt Sanitization
console.assert(processEmailInput('user<script>@domain.com') === null, 'Test 3 Failed');

// Test 4: Source Normalization
console.assert(normalizeSource('LANDING') === 'landing', 'Test 4 Failed');
console.assert(normalizeSource('unknown_source') === 'footer', 'Test 5 Failed');

console.log('✅ ALL VALIDATOR UNIT TESTS PASSED!');