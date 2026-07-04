import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgPath = join(__dirname, '..', 'package.json');
const packagesDir = join(__dirname, '..', '..');

const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

for (const dep of Object.keys(pkg.dependencies)) {
  const depPkgPath = join(packagesDir, dep.replace('@maelstrom-futurism/', ''), 'package.json');

  try {
    const depPkg = JSON.parse(readFileSync(depPkgPath, 'utf-8'));
    pkg.dependencies[dep] = `^${depPkg.version}`;
  } catch {
    console.warn(`Could not read ${depPkgPath}, skipping`);
  }
}

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('Synced dependency versions:', pkg.dependencies);
