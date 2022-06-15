#!/usr/bin/env node

const fs = require("fs");
const { io } = require("socket.io-client");
try {
    const cypress = require('cypress')

    console.log("Tiny Cypress Remote Runner");
    const socket = io("http://localhost:4500");

    socket.on("connect", () => {
        console.log(socket.id); // "G5p5..."
    });
    
} catch (error) {

    console.log("cypress not installed");
    console.log("Install cypress with: npm install cypress");
    console.log("Then run: npm run cypress:run");
    console.log("Existing ..");
    process.exit(1);


}


// const axios = require("axios")

// var project_path = process.cwd();

// var package_json = require(project_path + "/package.json");

// var cypress_json = null;

// if(fs.existsSync(project_path + "/cypress.json")){
//     cypress_json = fs.readFileSync(project_path + "/cypress.json");
// }else{

// }



//const cypress = require('cypress')



