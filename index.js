#!/usr/bin/env node
import inquirer from "inquirer"; //initialize inquirer module 
import chalk from "chalk";
let Todos = [];
let condition = true; //for while loop
console.log(chalk.bgGray("\n\t Welcome to To-Do List Application\n")); //welcome message
// while (condition) {
//   let addTask = await inquirer.prompt([
//     {
//       name: "todo",
//       type: "input",
//       message: chalk.red("what you want to add in todo list?"), 
//     },
//   ]);
//   Todos.push(addTask.todo); 
//   console.log(chalk.green(`your list is ${addTask.todo}`)); 
//   let addMoreTask = await inquirer.prompt([
//     {
//       name: "addMore",
//       type: "confirm",
//       message: chalk.blue("Do you want to add more task?"),
//       default: "false",
//     },
//   ]);
//   condition = addMoreTask.addMore;
// }
// console.log(chalk.green("your updated list is", Todos));
// function to select option
let main = async () => {
    while (condition) {
        let optionAnswer = await inquirer.prompt([
            {
                name: "option",
                type: "list",
                message: chalk.blue("What you want to do?"),
                choices: ["Add task", "Remove task", "Update task", "View task", "Exit"],
            },
        ]);
        if (optionAnswer.option === "Add task") {
            await addTask();
        }
        else if (optionAnswer.option === "Remove task") {
            await removeTask();
        }
        else if (optionAnswer.option === "Update task") {
            await updatedTask();
        }
        else if (optionAnswer.option === "View task") {
            await viewTask();
        }
        else if (optionAnswer.option === "Exit") {
            condition = false;
        }
    }
};
// function to add task
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.red("Add a new task"),
        },
    ]);
    Todos.push(newTask.task);
    console.log(chalk.green(`\n your new task is ${newTask.task}\n`));
};
// function to view all task in todo list
let viewTask = async () => {
    console.log("\n your todos list:\n");
    Todos.forEach((task, index) => {
        console.log(`${index} ${task}`); //if you want indexing no start from 1 then console log(`${index + 1} ${task}`) for 1 based indexing and also changes in removeTask and updatedTask.
    });
    console.log("\n"); //must be after brackets otherwise more gap between two lines.
};
//function to remove task
let removeTask = async () => {
    await viewTask();
    let removeTask = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.red("Enter the index number of task you want to remove"),
        },
    ]);
    let removeTaskIndex = Todos.splice(removeTask.index, 1); //Todos.splice(removeTask.index - 1, 1)
    console.log(chalk.green(`\n your task at index no ${removeTask.index} is removed from list\n`));
};
// function to update task
let updatedTask = async () => {
    await viewTask();
    let updatedTask = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.red("Enter the index number of task you want to update"),
        },
        {
            name: "new task",
            type: "input",
            message: chalk.red("Now Enter the new task"),
        },
    ]);
    Todos[updatedTask.index] = updatedTask.newtask; //Todos[updatedTask.index -1] = updatedTask.newtask
    console.log(chalk.green(`\n your task at index no ${updatedTask.index} is updated to ${updatedTask.task} successfully \n`));
    //console.log(chalk.green(`\n your task at index no ${updatedTask.index -1} is updated to ${updatedTask.task} successfully \n`))
};
main();
