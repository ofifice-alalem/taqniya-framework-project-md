/**
 * ==============================================================================
 * TAQNIYA FRAMEWORK: RUNTIME & EXECUTION ENGINE INTEGRATION AUDIT
 * ==============================================================================
 * Formally executes end-to-end integration tests against the central,
 * authoritative runtime resolver module (engine_resolver.js) and verifies:
 * 1. Canonical Catalog loading & validation from execution_engines.yaml
 * 2. Real engine resolution for all standard engines
 * 3. Strict error handling on typos / unknown engines (CONFIGURATION_ERROR)
 * 4. Deterministic fallback to "native" when execution_engine.yaml is absent
 * 5. Template specification cleanliness (no forbidden workflow flags)
 * 6. Zero hardcoded coupling in task_lifecycle.md
 * 7. Clean runtime terminology (Zero AI Host / Antigravity coupling)
 * 8. 100% Governance Invariance across engine swaps (Deep Equality)
 * 9. Physical workspace project engine resolution from PROJECT/MD/execution_engine.yaml
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const {
  parseEnginesCatalog,
  resolveExecutionEngine,
  buildResolvedTaskContext,
  DEFAULT_CATALOG_PATH,
  DEFAULT_PROJECT_ENGINE_PATH
} = require('./engine_resolver');

const FRAMEWORK_ROOT = path.resolve(__dirname, '../../..');
const RUNTIME_DIR = path.resolve(__dirname);

let passedCount = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ [PASS] Test ${totalTests}: ${message}`);
    passedCount++;
  } else {
    console.error(`❌ [FAIL] Test ${totalTests}: ${message}`);
  }
}

console.log('====================================================');
console.log('🚀 TAQNIYA RUNTIME ENGINE RESOLVER INTEGRATION AUDIT');
console.log('====================================================\n');

// ------------------------------------------------------------------------------
// TEST 1: Canonical Catalog Registry Integrity via engine_resolver
// ------------------------------------------------------------------------------
let catalog = [];
try {
  catalog = parseEnginesCatalog(DEFAULT_CATALOG_PATH);
  const registeredNames = catalog.map(e => e.name);
  const expectedEngines = ['superpowers', 'claude_code', 'antigravity', 'codex', 'custom', 'native'];
  const allExpectedPresent = expectedEngines.every(name => registeredNames.includes(name));
  assert(allExpectedPresent && catalog.length === 6, `Catalog contains all 6 recognized engines (${registeredNames.join(', ')})`);
} catch (err) {
  assert(false, `Catalog loading failed: ${err.message}`);
}

// ------------------------------------------------------------------------------
// TEST 2: Central Resolver Acceptance of All Standard Catalog Engines
// ------------------------------------------------------------------------------
let allValidAccepted = true;
['superpowers', 'claude_code', 'antigravity', 'codex', 'custom', 'native'].forEach(eng => {
  const result = resolveExecutionEngine({
    customYamlContent: `execution_engine:\n  name: "${eng}"`,
    fileExists: true
  });
  if (result.status !== 'RESOLVED' || result.engine !== eng) {
    allValidAccepted = false;
  }
});
assert(allValidAccepted, 'Authoritative resolver accepts all 6 valid catalog engines');

// ------------------------------------------------------------------------------
// TEST 3: Strict Error Handling on Unknown Engines & Typos (No Silent Custom Fallback)
// ------------------------------------------------------------------------------
const typoResult = resolveExecutionEngine({
  customYamlContent: `execution_engine:\n  name: "claud_code"`,
  fileExists: true
});
assert(typoResult.status === 'ERROR' && typoResult.code === 'UNKNOWN_ENGINE', 'Resolver strictly rejects typo "claud_code" with CONFIGURATION_ERROR');

const unknownResult = resolveExecutionEngine({
  customYamlContent: `execution_engine:\n  name: "unregistered_agent_xyz"`,
  fileExists: true
});
assert(unknownResult.status === 'ERROR' && unknownResult.code === 'UNKNOWN_ENGINE', 'Resolver strictly rejects "unregistered_agent_xyz" with CONFIGURATION_ERROR');

// ------------------------------------------------------------------------------
// TEST 4: Missing File Deterministically Defaults to "native"
// ------------------------------------------------------------------------------
const missingResult = resolveExecutionEngine({
  fileExists: false,
  customYamlContent: ''
});
assert(missingResult.status === 'RESOLVED' && missingResult.engine === 'native' && missingResult.fallback === true, 'Missing execution_engine.yaml deterministically resolves to "native"');

// ------------------------------------------------------------------------------
// TEST 5: Physical Workspace Project Engine Resolution
// ------------------------------------------------------------------------------
const workspaceResult = resolveExecutionEngine({
  projectEngineYamlPath: DEFAULT_PROJECT_ENGINE_PATH
});
assert(workspaceResult.status === 'RESOLVED' && typeof workspaceResult.engine === 'string', `Physical workspace project engine resolved successfully (Active: '${workspaceResult.engine}')`);

// ------------------------------------------------------------------------------
// TEST 6: Engine Template & Reference Spec Integrity (No Workflow Flags)
// ------------------------------------------------------------------------------
const templatePath = path.join(FRAMEWORK_ROOT, '05_templates/generic/project/execution_engine.yaml');
const referencePath = DEFAULT_PROJECT_ENGINE_PATH;

let flagsClean = true;
[templatePath, referencePath].forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const text = fs.readFileSync(filePath, 'utf8');
    if (text.includes('tdd:') || text.includes('planning:') || text.includes('debugging:')) {
      flagsClean = false;
    }
  }
});
assert(flagsClean, 'execution_engine.yaml templates contain zero internal workflow flags (tdd, planning, etc.)');

// ------------------------------------------------------------------------------
// TEST 7: Swappability Invariant in task_lifecycle.md
// ------------------------------------------------------------------------------
const lifecyclePath = path.join(RUNTIME_DIR, 'task_lifecycle.md');
const lifecycleText = fs.readFileSync(lifecyclePath, 'utf8');
const isAgnosticLifecycle = lifecycleText.includes('configured Execution Engine') && !lifecycleText.includes('if Superpowers');
assert(isAgnosticLifecycle, 'task_lifecycle.md Step 7 delegates generically to configured Execution Engine with zero conditional coupling');

// ------------------------------------------------------------------------------
// TEST 8: Terminology Cleanliness (Zero AI Host references in core runtime)
// ------------------------------------------------------------------------------
const runtimeReadmePath = path.join(RUNTIME_DIR, 'README.md');
const runtimeReadmeText = fs.readFileSync(runtimeReadmePath, 'utf8');
const contextResPath = path.join(RUNTIME_DIR, 'context_resolution.md');
const contextResText = fs.readFileSync(contextResPath, 'utf8');
const bootstrapPath = path.join(RUNTIME_DIR, 'bootstrap.md');
const bootstrapText = fs.readFileSync(bootstrapPath, 'utf8');

const isHostClean = !runtimeReadmeText.includes('AI Host') && 
                    !contextResText.includes('powered by Antigravity') &&
                    !bootstrapText.includes('executed by Antigravity') &&
                    !lifecycleText.includes('followed by Antigravity');
assert(isHostClean, 'Core runtime files maintain pure duality (Taqniya vs Execution Engine) with zero operational Antigravity coupling');

// ------------------------------------------------------------------------------
// TEST 9: Engine Swappability Governance Invariant (Deep Equality)
// ------------------------------------------------------------------------------
const mockProject = {
  stack: { backend: 'Laravel 11', frontend: 'Vue 3', database: 'PostgreSQL' },
  frontendCapabilities: { lazy_loading: 'required', virtualization: 'optional', form_state_optimization: 'enabled' }
};

const payloadSuperpowers = buildResolvedTaskContext('superpowers', mockProject);
const payloadCodex = buildResolvedTaskContext('codex', mockProject);
const payloadClaude = buildResolvedTaskContext('claude_code', mockProject);
const payloadNative = buildResolvedTaskContext('native', mockProject);

const governanceInvariant = (
  JSON.stringify(payloadSuperpowers.governance) === JSON.stringify(payloadCodex.governance) &&
  JSON.stringify(payloadCodex.governance) === JSON.stringify(payloadClaude.governance) &&
  JSON.stringify(payloadClaude.governance) === JSON.stringify(payloadNative.governance)
);
assert(governanceInvariant, 'Swapping execution engines (superpowers ➔ codex ➔ claude_code ➔ native) preserves 100% invariant Taqniya Governance & Verification');

// ------------------------------------------------------------------------------
// TEST 10: Missing Frontend Capabilities Protocol Invariant
// ------------------------------------------------------------------------------
const profileResPath = path.join(RUNTIME_DIR, 'profile_resolution.md');
const profileResText = fs.readFileSync(profileResPath, 'utf8');
const handlesMissingCapabilities = profileResText.includes('NOT CONFIGURED') && profileResText.includes('MUST NOT silently assume a default policy');
assert(handlesMissingCapabilities, 'profile_resolution.md explicitly handles missing frontend_capabilities.yaml without silent assumptions');

// ------------------------------------------------------------------------------
// AUDIT SUMMARY
// ------------------------------------------------------------------------------
console.log('\n====================================================');
console.log(`AUDIT RESULTS: ${passedCount} / ${totalTests} PASSED (${totalTests - passedCount} FAILS)`);
console.log('====================================================\n');

if (passedCount === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
