var api = require("./api")
const path = require("path");
const fs = require("fs");
const Confirm = require('prompt-confirm');
module.exports.init = async function (on, config, settings) {
    console.log("tiny_cypress init");
    var project_path = process.cwd();
    var package_json = require(project_path + "/package.json");
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
        console.log("Tiny Cypress config not found");
        console.log("Please configure Tiny Cypress in package.json");
        process.exit(1);
    }
    //if (!settings) throw new Error('Settings not found');
    api.init(package_json.tiny_cypress.token,package_json.tiny_cypress.baseUrl);

    const prompt = new Confirm({
        name: 'sync_mode', 
        message: 'Old Tests are found. Do you want to sync with server? or Clear old tests?',
    });
   var ans = await prompt.ask();
   console.log(ans);

    if(fs.existsSync(project_path + "tiny_cypress/test.json")){
       
    }

    on('after:run',async (results) => {
        results.project_id = package_json.tiny_cypress.project_id;
        results.agent_name = package_json.tiny_cypress.agent_name;
        await api.AfterRun(results);
    })

    // on('after:screenshot', async (details) => {
    //     details.project_id = settings.project_id;
    //     await api.AfterScreenshot(details);
    // })

    on('after:spec', async(spec, results) => {
        var data = {
            
        }
        if(results){
            data.results = results;
        }
        if(spec){
            data.spec= spec;
        }
        data.project_id = package_json.tiny_cypress.project_id;
        data.agent_name = package_json.tiny_cypress.agent_name;
        await api.AfterSpec(data);
    })

    // on('before:browser:launch', async (browser = {}, launchOptions) => {
    //     var data = {
    //         browser : browser,
    //         launchOptions : launchOptions
    //     }
    //     data.project_id = settings.project_id;
    //     await api.BeforeBrowserLaunch(data);
    // })

    on('before:run', async (details) => {
        try {
            details.project_id = package_json.tiny_cypress.project_id;
            details.agent_name = package_json.tiny_cypress.agent_name;
            var d = await api.BeforeRun(details);
            console.log(d)
        } catch (error) {
            console.log(error);
        }
    })

    on('before:spec', async (spec) => {
        data = {
            spec : spec,
          
        }
        data.project_id = package_json.tiny_cypress.project_id;
        data.agent_name = package_json.tiny_cypress.agent_name;
        await api.BeforeSpec(data);
    })

    // on('file:preprocessor', async (file) => {
    //     await api.FilePreprocessor(file)
    // })

    // on('task', async (task) => {
    //     // ...
    // })
}

var on = null;
var config = null;
var settings = null;


