#!/usr/bin/env node

const fs = require("fs");
const { io } = require("socket.io-client");
const agent_info = require("./agent_info");
try {
    const cypress = require('cypress');
    var project_path = process.cwd();
    var package_json = require(project_path + "/package.json");

    if(package_json.tiny_cypress){
        console.log("Tiny Cypress Remote Runner");
        const socket = io(package_json.tiny_cypress.server_url);

        socket.on("connect", async function(){
            console.log("Connected to Tiny Cypress Server");
            var res = await agent_info.getinfo();
            console.log("System Info");
            console.table(res);
            
        });

        socket.on("agent_info_send", async function() {
            var res = await agent_info.getinfo();
            socket.emit("agent_info_recv", {
                agent_id: socket.id,
                project_id: package_json.project_id,
                system_info: res
            });
        });



        
    }else{
        console.log("Tiny Cypress config not found");
        console.log("Please configure Tiny Cypress in package.json");
        process.exit(1);
    }

    


    
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



