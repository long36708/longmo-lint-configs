import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Simple YAML parser for our specific use case
function parseSimpleYaml(content) {
  const lines = content.split('\n');
  const result = { catalog: {} };
  let inCatalog = false;

  for (const line of lines) {
    if (line.trim() === 'catalog:') {
      inCatalog = true;
      continue;
    }

    if (inCatalog && line.startsWith('  ') && line.includes(':')) {
      const [key, value] = line
        .trim()
        .split(':')
        .map((s) => s.trim());
      if (key && value) {
        // Remove quotes if present
        const cleanKey = key.replaceAll(/['"]/g, '');
        const cleanValue = value.replaceAll(/['"]/g, '');
        result.catalog[cleanKey] = cleanValue;
      }
    } else if (inCatalog && !line.startsWith('  ') && line.trim() !== '') {
      inCatalog = false;
    }
  }

  return result;
}

// Read pnpm-workspace.yaml to get catalog versions
const workspaceContent = readFileSync('pnpm-workspace.yaml', 'utf8');
const workspace = parseSimpleYaml(workspaceContent);
const catalog = workspace.catalog || {};

console.log('📦 Found catalog versions:', Object.keys(catalog).length);

// Get all internal packages
const internalDir = join(process.cwd(), 'internal');
const packages = readdirSync(internalDir).filter((dir) => {
  const packageJsonPath = join(internalDir, dir, 'package.json');
  return existsSync(packageJsonPath);
});

console.log('🔍 Processing packages:', packages);

packages.forEach((packageName) => {
  const packageJsonPath = join(internalDir, packageName, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

  console.log(`\n📝 Processing ${packageJson.name}...`);

  // Initialize peerDependencies if not exists
  if (!packageJson.peerDependencies) {
    packageJson.peerDependencies = {};
  }

  // Sync versions from catalog to peerDependencies and dependencies
  let updated = false;

  // Process dependencies
  if (packageJson.dependencies) {
    Object.keys(packageJson.dependencies).forEach((dep) => {
      if (packageJson.dependencies[dep] === 'catalog:' && catalog[dep]) {
        const currentVersion = packageJson.peerDependencies[dep];
        const catalogVersion = catalog[dep];

        // Update peerDependencies
        if (currentVersion !== catalogVersion) {
          packageJson.peerDependencies[dep] = catalogVersion;
          console.log(
            `  ✅ peerDependencies ${dep}: ${currentVersion || 'new'} → ${catalogVersion}`,
          );
          updated = true;
        }

        // Update dependencies with actual version
        packageJson.dependencies[dep] = catalogVersion;
        console.log(`  ✅ dependencies ${dep}: catalog: → ${catalogVersion}`);
        updated = true;
      }
    });
  }

  if (updated) {
    writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
    console.log(`  💾 Updated ${packageJson.name}`);
  } else {
    console.log(`  ✨ ${packageJson.name} is already up to date`);
  }
});

console.log('\n🎉 Peer dependencies sync completed!');
