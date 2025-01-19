const fs = require('fs');
const path = require('path');

const [name, description] = process.argv.slice(2);

const packageJson = `{
  "name": "${name}",
  "version": "0.7.0",
  "description": "${description}",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "typings": "dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "default": "./dist/index.js"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc",
    "test": "vitest run --coverage",
    "test:dev": "vitest"
  },
  "author": "Dawson Goodell <dawsong@osmstudios.com>",
  "homepage": "https://osmstudios.com",
  "license": "SEE LICENSE IN LICENSE.txt",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/DawsonG/maelstrom-futurism.git",
    "directory": "packages/{name}"
  },
  "dependencies": {
    "@maelstrom-futurism/core": "../core"
  },
  "peerDependences": {
    "react": ">= 18.0.0",
    "react-dom": ">= 18.0.0"
  }
}`;

const tsconfigJson = `{
    "extends": "../../tsconfig.json",
    "include": ["src"],
    "compilerOptions": {
        "outDir": "dist",
        "jsxImportSource": "@emotion/react",
        "jsx": "react-jsx",
        "sourceMap": true,
        "declaration": true,
        "declarationDir": "dist"
    }
}`;

const dir = path.join('packages', name);
const src = path.join(dir, 'src');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    fs.mkdirSync(src);
}

fs.writeFile(path.join(dir, 'package.json'), packageJson, (err) => {
    if (err) throw err;
});

fs.writeFile(path.join(dir, 'tsconfig.json'), tsconfigJson, (err) => {
    if (err) throw err;
});