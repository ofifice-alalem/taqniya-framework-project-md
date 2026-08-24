/**
 * ==============================================================================
 * TAQNIYA FRAMEWORK: ENGINE RESOLVER MODULE (engine_resolver.js)
 * ==============================================================================
 * Authoritative runtime resolver for execution engines under Taqniya AI Framework.
 * Reads the canonical catalog (execution_engines.yaml) and validates project
 * configuration (PROJECT/MD/execution_engine.yaml).
 *
 * Rules:
 * 1. Valid registered engine ➔ Resolves successfully.
 * 2. Missing execution_engine.yaml ➔ Resolves deterministically to "native".
 * 3. Unknown engine / Typo ➔ Throws/Returns CONFIGURATION_ERROR (halt & prompt).
 * 4. Engine swappability ➔ Preserves 100% immutable Taqniya Governance payload.
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_CATALOG_PATH = path.resolve(__dirname, 'execution_engines.yaml');
const DEFAULT_PROJECT_ENGINE_PATH = path.resolve(__dirname, '../../../PROJECT/MD/execution_engine.yaml');

/**
 * Parses execution_engines.yaml catalog
 */
function parseEnginesCatalog(catalogFilePath = DEFAULT_CATALOG_PATH) {
  if (!fs.existsSync(catalogFilePath)) {
    throw new Error(`CATALOG_ERROR: Canonical catalog file not found at ${catalogFilePath}`);
  }

  const content = fs.readFileSync(catalogFilePath, 'utf8');
  const engines = [];
  const lines = content.split('\n');
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

/**
 * Parses execution_engine.yaml content from string
 */
function parseProjectEngineYaml(yamlContent) {
  if (!yamlContent || typeof yamlContent !== 'string') return null;
  const match = yamlContent.match(/name:\s*["']?([^"'\s]+)["']?/);
  return match ? match[1] : null;
}

/**
 * Resolves the active Execution Engine
 */
function resolveExecutionEngine(options = {}) {
  const catalogPath = options.catalogPath || DEFAULT_CATALOG_PATH;
  const catalog = parseEnginesCatalog(catalogPath);
  const registeredNames = catalog.map(e => e.name);

  // Check if custom YAML content was provided directly (for testing/in-memory)
  if (options.customYamlContent !== undefined) {
    if (options.fileExists === false) {
      return { status: 'RESOLVED', engine: 'native', fallback: true, catalog };
    }

    const engineName = parseProjectEngineYaml(options.customYamlContent);
    if (!engineName) {
      return {
        status: 'ERROR',
        error: 'CONFIGURATION_ERROR: Empty or invalid execution_engine configuration in YAML.',
        code: 'INVALID_SCHEMA'
      };
    }

    if (!registeredNames.includes(engineName)) {
      return {
        status: 'ERROR',
        error: `CONFIGURATION_ERROR: Unknown execution engine '${engineName}'. Must match an engine registered in execution_engines.yaml (${registeredNames.join(', ')}).`,
        code: 'UNKNOWN_ENGINE'
      };
    }

    return { status: 'RESOLVED', engine: engineName, fallback: false, catalog };
  }

  // Resolve from physical disk file
  const projectYamlPath = options.projectEngineYamlPath || DEFAULT_PROJECT_ENGINE_PATH;
  if (!fs.existsSync(projectYamlPath)) {
    return { status: 'RESOLVED', engine: 'native', fallback: true, catalog };
  }

  const content = fs.readFileSync(projectYamlPath, 'utf8');
  const engineName = parseProjectEngineYaml(content);

  if (!engineName) {
    return {
      status: 'ERROR',
      error: `CONFIGURATION_ERROR: Empty or invalid execution_engine configuration in ${projectYamlPath}`,
      code: 'INVALID_SCHEMA'
    };
  }

  if (!registeredNames.includes(engineName)) {
    return {
      status: 'ERROR',
      error: `CONFIGURATION_ERROR: Unknown execution engine '${engineName}'. Must match an engine registered in execution_engines.yaml (${registeredNames.join(', ')}).`,
      code: 'UNKNOWN_ENGINE'
    };
  }

  return { status: 'RESOLVED', engine: engineName, fallback: false, catalog };
}

/**
 * Constructs the Universal Resolved Task Context Payload
 */
function buildResolvedTaskContext(engineName, projectConfig = {}) {
  return {
    engine: engineName,
    governance: {
      stack: projectConfig.stack || {},
      frontendCapabilities: projectConfig.frontendCapabilities || {},
      securityInvariants: [
        'PARAMETERIZED_SQL',
        'PERIMETER_AUTH_DEFAULT_DENY',
        'ZERO_SECRETS',
        'INPUT_VALIDATION_AT_INGRESS'
      ],
      verificationGates: [
        'STAGE_1_BUILD',
        'STAGE_2_TESTS',
        'STAGE_3_SECURITY',
        'STAGE_4_BOUNDARIES',
        'STAGE_5_UI',
        'STAGE_6_DOCS',
        'STAGE_7_PERF',
        'STAGE_8_DOD'
      ]
    }
  };
}

module.exports = {
  parseEnginesCatalog,
  parseProjectEngineYaml,
  resolveExecutionEngine,
  buildResolvedTaskContext,
  DEFAULT_CATALOG_PATH,
  DEFAULT_PROJECT_ENGINE_PATH
};

// CLI Direct Execution Support
if (require.main === module) {
  const result = resolveExecutionEngine();
  console.log('Taqniya Execution Engine Resolution Result:', JSON.stringify(result, null, 2));
}
