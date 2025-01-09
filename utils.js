import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { CHARS, SPECIAL_CHARS } from "./constants.js";

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
    choices: ["8", "16", "24", "32", "48"],
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
  let chars = CHARS;
  let pword = "";
  if (includeSpecialChars === true) {
    chars += SPECIAL_CHARS;
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

export { greeting, selectPwordLength, approveSpecialChars, generatePWord };
