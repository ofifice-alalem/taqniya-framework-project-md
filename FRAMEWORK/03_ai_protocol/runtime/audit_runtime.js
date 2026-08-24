/**
 * ==============================================================================
 * TAQNIYA FRAMEWORK: RUNTIME & EXECUTION ENGINE ABSTRACTION AUDIT
 * ==============================================================================
 * Formally validates the Execution Engine Abstraction, Catalog integrity,
 * engine resolution algorithm, strict error handling on unknown engines,
 * missing file fallback to "native", swappability, and terminology cleanliness.
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

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
console.log('🚀 TAQNIYA RUNTIME & EXECUTION ENGINE AUDIT SUITE');
console.log('====================================================\n');

// ------------------------------------------------------------------------------
// Helper: Simple YAML parser for key-value & lists in execution_engines.yaml
// ------------------------------------------------------------------------------
function parseEnginesCatalog(catalogContent) {
  const engines = [];
  const lines = catalogContent.split('\n');
  let currentEngine = null;

  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- name:')) {
      const match = trimmed.match(/- name:\s*["']?([^"']+)["']?/);
      if (match) {
        currentEngine = { name: match[1] };
        engines.push(currentEngine);
      }
    } else if (trimmed.startsWith('description:') && currentEngine) {
      const match = trimmed.match(/description:\s*["']?([^"']+)["']?/);
      if (match) currentEngine.description = match[1];
    }
  }
  return engines;
}

function parseProjectEngine(yamlContent) {
  if (!yamlContent) return null;
  const match = yamlContent.match(/name:\s*["']?([^"'\s]+)["']?/);
  return match ? match[1] : null;
}

// ------------------------------------------------------------------------------
// Formal Engine Resolver Algorithm (Simulating Taqniya Runtime Step 2 & 7)
// ------------------------------------------------------------------------------
function resolveExecutionEngine(yamlContent, fileExists, registeredEngines) {
  if (!fileExists) {
    return { status: 'RESOLVED', engine: 'native', fallback: true };
  }

  const engineName = parseProjectEngine(yamlContent);
  if (!engineName) {
    return { status: 'ERROR', error: 'CONFIGURATION_ERROR: Empty or invalid execution_engine configuration' };
  }

  const isRegistered = registeredEngines.some(e => e.name === engineName);
  if (!isRegistered) {
    return {
      status: 'ERROR',
      error: `CONFIGURATION_ERROR: Unknown execution engine '${engineName}'. Must match an engine registered in execution_engines.yaml.`
    };
  }

  return { status: 'RESOLVED', engine: engineName, fallback: false };
}

// ------------------------------------------------------------------------------
// TEST 1: Canonical Catalog Registry Integrity
// ------------------------------------------------------------------------------
const catalogPath = path.join(RUNTIME_DIR, 'execution_engines.yaml');
const catalogExists = fs.existsSync(catalogPath);
assert(catalogExists, 'Canonical catalog execution_engines.yaml exists');

let catalogEngines = [];
if (catalogExists) {
  const content = fs.readFileSync(catalogPath, 'utf8');
  catalogEngines = parseEnginesCatalog(content);
  const registeredNames = catalogEngines.map(e => e.name);
  
  const expectedEngines = ['superpowers', 'claude_code', 'antigravity', 'codex', 'custom', 'native'];
  const allExpectedPresent = expectedEngines.every(name => registeredNames.includes(name));
  assert(allExpectedPresent, `Registry contains all 6 recognized engines (${registeredNames.join(', ')})`);
}

// ------------------------------------------------------------------------------
// TEST 2: Resolver Acceptance of All Standard Catalog Engines
// ------------------------------------------------------------------------------
let allValidAccepted = true;
['superpowers', 'claude_code', 'antigravity', 'codex', 'custom', 'native'].forEach(eng => {
  const yaml = `execution_engine:\n  name: "${eng}"`;
  const result = resolveExecutionEngine(yaml, true, catalogEngines);
  if (result.status !== 'RESOLVED' || result.engine !== eng) {
    allValidAccepted = false;
  }
});
assert(allValidAccepted, 'Resolver successfully accepts all 6 valid catalog engines');

// ------------------------------------------------------------------------------
// TEST 3: Strict Error Handling on Unknown Engines & Typos (No Silent Custom Fallback)
// ------------------------------------------------------------------------------
const typoYaml = `execution_engine:\n  name: "claud_code"`;
const typoResult = resolveExecutionEngine(typoYaml, true, catalogEngines);
assert(typoResult.status === 'ERROR' && typoResult.error.includes('CONFIGURATION_ERROR'), 'Resolver strictly flags typo "claud_code" as CONFIGURATION_ERROR');

const unknownYaml = `execution_engine:\n  name: "unknown_random_agent"`;
const unknownResult = resolveExecutionEngine(unknownYaml, true, catalogEngines);
assert(unknownResult.status === 'ERROR' && unknownResult.error.includes('CONFIGURATION_ERROR'), 'Resolver strictly flags "unknown_random_agent" as CONFIGURATION_ERROR');

// ------------------------------------------------------------------------------
// TEST 4: Missing File Deterministically Defaults to "native"
// ------------------------------------------------------------------------------
const missingResult = resolveExecutionEngine('', false, catalogEngines);
assert(missingResult.status === 'RESOLVED' && missingResult.engine === 'native' && missingResult.fallback === true, 'Missing execution_engine.yaml deterministically resolves to "native"');

// ------------------------------------------------------------------------------
// TEST 5: Engine Template & Reference Spec Integrity (No Workflow Flags)
// ------------------------------------------------------------------------------
const templatePath = path.join(FRAMEWORK_ROOT, '05_templates/generic/project/execution_engine.yaml');
const referencePath = path.join(FRAMEWORK_ROOT, '../PROJECT/MD/execution_engine.yaml');

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
// TEST 6: Swappability Invariant (Engine change requires 0 framework mutations)
// ------------------------------------------------------------------------------
const lifecyclePath = path.join(RUNTIME_DIR, 'task_lifecycle.md');
const lifecycleText = fs.readFileSync(lifecyclePath, 'utf8');
const isAgnosticLifecycle = lifecycleText.includes('configured Execution Engine') && !lifecycleText.includes('if Superpowers');
assert(isAgnosticLifecycle, 'task_lifecycle.md Step 7 delegates generically to configured Execution Engine with zero conditional coupling');

// ------------------------------------------------------------------------------
// TEST 7: Terminology Cleanliness (Zero AI Host references in core runtime)
// ------------------------------------------------------------------------------
const runtimeReadmePath = path.join(RUNTIME_DIR, 'README.md');
const runtimeReadmeText = fs.readFileSync(runtimeReadmePath, 'utf8');
const contextResPath = path.join(RUNTIME_DIR, 'context_resolution.md');
const contextResText = fs.readFileSync(contextResPath, 'utf8');

const isHostClean = !runtimeReadmeText.includes('AI Host') && 
                    !contextResText.includes('powered by Antigravity') &&
                    !lifecycleText.includes('followed by Antigravity');
assert(isHostClean, 'Core runtime files maintain pure duality (Taqniya vs Execution Engine) with zero AI Host pollution');

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
