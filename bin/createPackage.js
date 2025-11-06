import fs from 'fs';
import path from 'path';
import { printHeader } from './utils.js';

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

const createPackage = (name, options) => {
  const { description, packageVersion } = options;
  const dir = path.join('packages', name);
  const src = path.join(dir, 'src');
  
  const packageJson = `{
    "name": "@maelstrom-futurism/${name}",
    "version": "${packageVersion}",
    "description": "${description}",
    "private": true,
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
      "directory": "packages/${name}"
    },
    "dependencies": {
      "@maelstrom-futurism/core": "*"
    },
    "peerDependences": {
      "react": ">= 18.0.0",
      "react-dom": ">= 18.0.0"
    }
  }`;
  
  printHeader();
  
  console.log(`Creating a new package with the following properties:
{
  "name": "@maelstrom-futurism/${name}",
  "version": "${packageVersion}",
  "description": "${description}",
  ...
}
  `);

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      fs.mkdirSync(src);
      console.log(`New package directory created ${dir}.
New src directory created ${src}.`);
  } else {
      console.error(`package with name ${name} already exists! Exiting...`);
      return false;
  }

  try {
    fs.writeFileSync(path.join(dir, 'package.json'), packageJson);
    console.log("package.json created");

    fs.writeFileSync(path.join(dir, 'tsconfig.json'), tsconfigJson);
    console.log("tsconfig.json created");
  } catch (err) {
    console.error("Error creating files");
    throw err;
  }

  console.log("\n\n\nDone! Have fun with your new package.");
};

export default createPackage;