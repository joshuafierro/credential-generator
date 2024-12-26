#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";

async function greeting() {
  console.clear();
  try {
    console.log(
      await figlet.text("Credential Generator!", {
        font: "Speed",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 100,
        whitespaceBreak: true,
      })
    );
  } catch (err) {
    console.log("Something went wrong...");
    console.dir(err);
  }
}

async function selectPwordLength() {
  const answers = await inquirer.prompt({
    type: "select",
    name: "length",
    message: "Select a password length",
    choices: ["8", "12", "24"],
  });
  return answers.length;
}

async function approveSpecialChars() {
  const answers = await inquirer.prompt({
    type: "confirm",
    name: "requirements",
    message: "Should it contain special characters?", //Select any additional requirements for your password
  });
  return answers.requirements;
}

function generatePWord(pwordLength, includeSpecialChars) {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQUSTUVWXYZ012345689";
  let pword = "";
  if (includeSpecialChars === true) {
    let specialChars = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    chars += specialChars;
  }
  while (pword.length < pwordLength) {
    const nextChar = chars[Math.floor(Math.random() * chars.length)];
    if (pword.includes(nextChar)) {
      continue; // if char already exists skip it.
    } else {
      pword += nextChar;
    }
  }
  if (pword.length < pwordLength || pword.length < 8) {
    throw chalk.bgRedBright(
      "There was an issue generating your password. Please try again."
    );
  }
  return pword;
}

await greeting();
const passwordLength = await selectPwordLength();
const specialChars = await approveSpecialChars();
const generatedPass = generatePWord(passwordLength, specialChars);
console.log(
  `\n\nyour generated password is: ` +
    chalk.inverse(chalk.bold(generatedPass) + "\n\n")
);
