#!/usr/bin/env node
import chalk from "chalk";
import {
  greeting,
  selectPwordLength,
  approveSpecialChars,
  generatePWord,
} from "./utils.js";

await greeting();
const passwordLength = await selectPwordLength();
const specialChars = await approveSpecialChars();
const generatedPass = generatePWord(passwordLength, specialChars);
console.log(
  `\n\nyour generated password is: ` +
    chalk.inverse(chalk.bold(generatedPass) + "\n\n")
);
