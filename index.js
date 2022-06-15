var api = require("./api")
module.exports.init = async function (on, config, settings) {
    if (!settings) throw new Error('Settings not found');
    api.init(settings.token, settings.baseUrl);

    // on('after:run',async (results) => {
    //     results.project_id = settings.project_id;
    //     await api.AfterRun(results);
    // })

    // on('after:screenshot', async (details) => {
    //     details.project_id = settings.project_id;
    //     await api.AfterScreenshot(details);
    // })

    // on('after:spec', async(spec, results) => {
    //     var data = {
            
    //     }
    //     if(results){
    //         data.results = results;
    //     }
    //     if(spec){
    //         data.spec= spec;
    //     }
    //     data.project_id = settings.project_id;
    //     await api.AfterSpec(data);
    // })

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
            details.project_id = settings.project_id;
            var d = await api.BeforeRun(details);
            console.log(d)
        } catch (error) {
            console.log(error);
        }
    })

    // on('before:spec', async (spec) => {
    //     data = {
    //         spec : spec,
          
    //     }
    //     data.project_id = settings.project_id;
    //     await api.BeforeSpec(data);
    // })

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