#! /usr/bin/env node
import { Command  } from "commander";
import createPackage from "./createPackage.js";
import publish from "./publish.js";

const program = new Command();

program
    .name("mf")
    .description("CLI for simplifying actions related to Maelstrom-Futurism")
    .version("1.0.0");

program.command("create-package")
    .description("creates a new component package in the packages folder")
    .argument("<string>", "name of the new package")
    .option("-d, --description <string>", "description of the package to be created. Used in the package.json", "")
    .option("--pv, --packageVersion <string>", "sets the version in the package.json", "0.7.0")
    .action(createPackage);

program.command("publish")
    .description("bump versions, sync deps, commit, tag, and publish all packages")
    .action(publish);

program.parse();