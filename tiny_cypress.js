#!/usr/bin/env node

const fs = require("fs");
const { io } = require("socket.io-client");
const agent_info = require("./agent_info");
var status = {}
status.agent_status = "connected";
status.agent_running = "stopped";

async function start() {
    try {
        const cypress = require('cypress');
        var project_path = process.cwd();
        var package_json = require(project_path + "/package.json");
        var cypress_json = null
        if(fs.existsSync(project_path + "/cypress.config.js")){
            cypress_json = require(project_path + "/cypress.config.js");
        }else{
            console.log(" Cypress config not found");
            console.log("Please configure  Cypress in cypress.config.js");
            process.exit(1);
        }

        if(cypress_json == null){
            console.log(" Cypress config not found");
            console.log("Please configure  Cypress in cypress.config.js");
            process.exit(1);
        }
       

        if (package_json.tiny_cypress) {
            console.log("Tiny Cypress Remote Runner");
            const socket = io(package_json.tiny_cypress.server_url);

            socket.on("connect", async function () {
                console.log("Connected to Tiny Cypress Server");
                var res = await agent_info.getinfo();
                // console.log("-------------Hardware-----------");
                // console.table(res.hardware);
                // console.log("-------------CPU----------------");
                // console.table(res.cpu);
                // console.log("-------------Memory-------------");
                // console.table(res.memory);
                // console.log("-------------OS-----------------");
                // console.table(res.os);

                var d = {
                    project_id: package_json.tiny_cypress.project_id,
                    system_info: res,
                    status: status,
                    agent_name: package_json.tiny_cypress.agent_name
                }
                console.log("Project ID ", d)
                socket.emit("join_agent", d);
            });

            //var res = await agent_info.getinfo();
            // var d = {
            //     agent_id: socket.id,
            //     project_id: package_json.tiny_cypress.project_id,
            //     system_info: res,
            //     status: status,
            //     agent_name: package_json.tiny_cypress.agent_name
            // };
            // socket.emit("agent_info_recv", d);

            socket.on("agent_start", async function (data) {
                
                if(package_json.tiny_cypress.agent_name == data.agents){
                    console.log("Agent Start Requested");
                    if(status.agent_running == "stopped"){
                        status.agent_running = "started";
                        console.log("Agent Started");
                        cypress.run(cypress_json)
                        .then(result => {
                            var res = {
                                result : result,
                                status: "finished",
                            }
                            console.log("Cypress Run Result",res);
                            status.agent_running = "stopped";
                            socket.emit("agent_result", res);
                        })
                        .catch(err => {
                            console.error(err.message)
                            var res = {
                                result : err,
                                status: "err",
                            }
                            console.log("Cypress Run Result",res);
                            status.agent_running = "stopped";
                            socket.emit("agent_result", res);
                        })
                    }else{
                        console.log("Agent Already Running");
                    }
                }
  
            });
            socket.on("agent_info_send", async function () {
                console.log("Agent Info Sent");
                var res = await agent_info.getinfo();
                var d = {
                    agent_id: socket.id,
                    project_id: package_json.tiny_cypress.project_id,
                    system_info: res,
                    status: status,
                    agent_name: package_json.tiny_cypress.agent_name
                };
                socket.emit("agent_info_recv", d);
            });

            socket.on("agent_status_send", function (data) {
                socket.emit("agent_status_recv", status);
            });




        } else {
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
}

start()


// const axios = require("axios")

// var project_path = process.cwd();

// var package_json = require(project_path + "/package.json");

// var cypress_json = null;

// if(fs.existsSync(project_path + "/cypress.json")){
//     cypress_json = fs.readFileSync(project_path + "/cypress.json");
// }else{

// }



//const cypress = require('cypress')



