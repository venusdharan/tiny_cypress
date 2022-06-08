var api = require("./api")
module.exports.init = async function (on, config, settings) {
    if (!settings) throw new Error('Settings not found');
    api.init(settings.token, settings.baseUrl);
    on('after:run',async (results) => {
        await api.AfterRun(results);
    })

    on('after:screenshot', async (details) => {
        await api.AfterScreenshot(details);
    })

    on('after:spec', async(spec, results) => {
        var data = {
            
        }
        if(results){
            data.results = results;
        }
        if(spec){
            data.spec= spec;
        }
        await api.AfterSpec(data);
    })

    // on('before:browser:launch', async (browser = {}, launchOptions) => {
    //     var data = {
    //         browser : browser,
    //         launchOptions : launchOptions
    //     }
    //     await api.BeforeBrowserLaunch(data);
    // })

    on('before:run', async (details) => {
        await api.BeforeRun(details);
    })

    on('before:spec', async (spec) => {
        data = {
            spec : spec,
          
        }
        
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