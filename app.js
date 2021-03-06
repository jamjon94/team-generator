const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { prompt } = require("inquirer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// MEMBERS THAT ARE WRITTEN
const team = [];

// WHICH MEMBER QUESTIONS
const memberPick = [
  {
    type: "list",
    message: "Which type of employee would you like to add?",
    name: "whichMember",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

// ADD ANOTHER MEMBER QUESTION
const addNewMember = [
  {
    type: "confirm",
    message: "Would you like to add another employee to the team?",
    name: "newEmployee",
  },
];

// MANAGER QUESTIONS
const managerQues = [
  {
    type: "input",
    message: "What is your manager's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your manager's ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your manager's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your manager's office number?",
    name: "officeNumber",
  },
];

// ENGINEER QUESTIONS
const engineerQues = [
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your engineer's ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your engineer's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your engineer's GitHub username?",
    name: "github",
  },
];

// INTERN QUESTIONS
const internQues = [
  {
    type: "input",
    message: "What is your intern's Name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your intern's ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your intern's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What school does your intern go to?",
    name: "school",
  },
];

// FUNCTION FOR STARTER QUESTIONS
function init() {
  choosingMember();
  // FUNCTION FOR PICKING MEMBERS
  function choosingMember() {
    inquirer
      .prompt(memberPick)
      .then((data) => {
        console.log(data);
        if (data.whichMember === "Manager") {
          manager();
          // console.log("manager clicked");
        } else if (data.whichMember === "Engineer") {
          engineer();
        } else if (data.whichMember === "Intern") {
          intern();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // FUNCTION FOR MANAGER QUESTION PROMPTS
  function manager() {
    inquirer
      .prompt(managerQues)
      .then((data) => {
        const newManager = new Manager(
          data.name,
          data.id,
          data.email,
          data.officeNumber
        );
        team.push(newManager);
        console.log(newManager);
        addMember();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // FUNCTION FOR ENGINEER QUESTION PROMPTS
  function engineer() {
    inquirer
      .prompt(engineerQues)
      .then((data) => {
        const newEngineer = new Engineer(
          data.name,
          data.id,
          data.email,
          data.github
        );
        team.push(newEngineer);
        console.log(newEngineer);
        addMember();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // FUNCTION FOR INTERN QUESTION PROMPTS
  function intern() {
    inquirer
      .prompt(internQues)
      .then((data) => {
        const newIntern = new Intern(
          data.name,
          data.id,
          data.email,
          data.school
        );
        team.push(newIntern);
        console.log(newIntern);
        addMember();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // FUNCTION FOR ADDING NEW MEMBER
  function addMember() {
    inquirer
      .prompt(addNewMember)
      .then((data) => {
        console.log(data);
        if (data.newEmployee === true) {
          choosingMember();
        } else {
          endProgram();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ENDING FUNCTION
  function endProgram() {
    fs.writeFile(outputPath, render(team), function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Your team is complete!");
      }
    });
  }
}

// FUNCTION FOR EMPLOYEE MEMBERS

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
