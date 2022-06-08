#!/usr/bin/env node

const fs = require("fs");
const { io } = require("socket.io-client");
const axios = require("axios")

var project_path = process.cwd();

var package_json = require(project_path + "/package.json");

var cypress_json = null;

if(fs.existsSync(project_path + "/cypress.json")){
    cypress_json = fs.readFileSync(project_path + "/cypress.json");
}else{

}

const socket = io("http://localhost:3500", {
  reconnectionDelayMax: 10000,
});

socket.on("connect", () => {
    console.log(socket.id); // "G5p5..."
});

//const cypress = require('cypress')

console.log(package_json)