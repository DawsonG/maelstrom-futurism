import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import readline from "readline";
import { printHeader } from "./utils.js";

const ROOT = path.resolve(import.meta.dirname, "..");
const PACKAGES_DIR = path.join(ROOT, "packages");

const ask = (question) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (ans) => { rl.close(); resolve(ans.trim()); }));
};

const confirm = async (question) => {
  const ans = await ask(`${question} (y/n) `);
  return ans.toLowerCase() === "y";
};

const pick = async (question, options) => {
  console.log(`\n${question}\n`);
  options.forEach((opt, i) => console.log(`  ${i + 1}) ${opt}`));
  const ans = await ask("\nChoice: ");
  const idx = parseInt(ans, 10) - 1;
  if (idx < 0 || idx >= options.length) {
    console.error("Invalid selection.");
    process.exit(1);
  }
  return options[idx];
};

const run = (cmd, opts = {}) => execSync(cmd, { cwd: ROOT, stdio: "inherit", ...opts });
const runQuiet = (cmd) => execSync(cmd, { cwd: ROOT, encoding: "utf-8" }).trim();

const getPublishablePackages = () => {
  const dirs = fs.readdirSync(PACKAGES_DIR).filter((d) => {
    const pkgPath = path.join(PACKAGES_DIR, d, "package.json");
    if (!fs.existsSync(pkgPath)) return false;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    return !pkg.private;
  });
  return dirs;
};

const bumpVersion = (version, type) => {
  const [major, minor, patch] = version.split(".").map(Number);
  switch (type) {
    case "patch": return `${major}.${minor}.${patch + 1}`;
    case "minor": return `${major}.${minor + 1}.0`;
    case "major": return `${major + 1}.0.0`;
    default: throw new Error(`Unknown bump type: ${type}`);
  }
};

const ensureNpmLogin = () => {
  try {
    const whoami = runQuiet("npm whoami");
    console.log(`Logged in to npm as: ${whoami}\n`);
  } catch {
    console.log("You are not logged in to npm. Please log in now:\n");
    run("npm login");
    console.log();
  }
};

const publish = async () => {
  printHeader();

  ensureNpmLogin();

  // 1. Show git status
  console.log("\n── Git Status ──\n");
  run("git status --short");

  const statusOutput = runQuiet("git status --porcelain");
  if (statusOutput) {
    console.log("\n⚠ You have uncommitted changes above.");
    if (!(await confirm("Continue anyway?"))) {
      console.log("Aborted.");
      process.exit(0);
    }
  } else {
    console.log("Working tree clean.\n");
  }

  // 2. Show current version and pick bump type
  const rootPkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf-8"));
  const currentVersion = rootPkg.version;
  console.log(`\nCurrent version: ${currentVersion}`);

  const bumpType = await pick("Version bump:", [
    `patch → ${bumpVersion(currentVersion, "patch")}`,
    `minor → ${bumpVersion(currentVersion, "minor")}`,
    `major → ${bumpVersion(currentVersion, "major")}`,
  ]);
  const type = bumpType.split(" ")[0];
  const newVersion = bumpVersion(currentVersion, type);

  console.log(`\nBumping all packages: ${currentVersion} → ${newVersion}\n`);

  // 3. Update root package.json
  rootPkg.version = newVersion;
  fs.writeFileSync(path.join(ROOT, "package.json"), JSON.stringify(rootPkg, null, 2) + "\n");
  console.log("  ✓ root package.json");

  // 4. Update all publishable packages
  const packages = getPublishablePackages();
  for (const dir of packages) {
    const pkgPath = path.join(PACKAGES_DIR, dir, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    pkg.version = newVersion;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(`  ✓ ${pkg.name}`);
  }

  // 5. Sync meta-package dependencies
  console.log("\nSyncing meta-package dependencies...");
  const metaPkgPath = path.join(PACKAGES_DIR, "maelstrom-futurism", "package.json");
  const metaPkg = JSON.parse(fs.readFileSync(metaPkgPath, "utf-8"));
  for (const dep of Object.keys(metaPkg.dependencies)) {
    const depDir = dep.replace("@maelstrom-futurism/", "");
    const depPkgPath = path.join(PACKAGES_DIR, depDir, "package.json");
    if (fs.existsSync(depPkgPath)) {
      const depPkg = JSON.parse(fs.readFileSync(depPkgPath, "utf-8"));
      metaPkg.dependencies[dep] = `^${depPkg.version}`;
    }
  }
  fs.writeFileSync(metaPkgPath, JSON.stringify(metaPkg, null, 2) + "\n");
  console.log("  ✓ meta-package dependencies synced\n");

  // 6. Git commit and tag
  console.log("── Committing ──\n");
  run("git add -A");
  run(`git commit -m "v${newVersion}"`);
  run(`git tag v${newVersion}`);
  console.log(`\n  ✓ Committed and tagged v${newVersion}\n`);

  // 7. Confirm before publish
  if (!(await confirm("Publish all packages to npm?"))) {
    console.log(`\nSkipped publish. You can publish manually with:\n  npm publish --workspaces\n  git push && git push --tags\n`);
    process.exit(0);
  }

  console.log("\n── Publishing ──\n");
  run("npm publish --workspaces");
  console.log("\n  ✓ All packages published\n");

  if (await confirm("Push commit and tag to remote?")) {
    run("git push origin main && git push --tags");
    console.log("\n  ✓ Pushed\n");
  }

  console.log("Done!");
};

export default publish;
