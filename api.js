var axios = require("axios");

var token = "";

module.exports.init = async function (token,baseUrl) {
  if (!token) throw new Error("Token not found");
  if (!baseUrl) throw new Error("BaseUrl not found");
  this.token = token;
  this.baseUrl = baseUrl;
  this.axios = axios.create({
    baseURL: this.baseUrl,
    headers: {
      Authorization: "Bearer " + this.token,
    },
  });
  // this.axios.interceptors.response.use(
  //   function (response) {
  //     return response;
  //   },
  //   function (error) {
  //     if (error.response.status === 401) {
  //       console.log("Token expired");
  //       process.exit(1);
  //     }
  //     return Promise.reject(error);
  //   }
  // );
}

module.exports.SubmitALL = async function (data) {
    try {
        var res = await this.axios.post("/submit_all", data);
        return res; 
    } catch (error) {
        console.log(error)
        return false;
    }
    
}

module.exports.BeforeRun = async function (data) {
    try {
        var res = await this.axios.post("/before_run", data);
        return res;
    } catch (error) {
        console.log(error)
        return false;
    }
   
}

module.exports.AfterRun = async function (data) {
    try {
        var res = await this.axios.post("/after_run", data);
        return res;
    } catch (error) {
        console.log(error)
        return false;
    }
  
}

module.exports.BeforeSpec = async function (data) {
    try {
        var res = await this.axios.post("/before_spec", data);
        return res;
    } catch (error) {
        console.log(error);
        return false;
    }
    
}

module.exports.AfterSpec = async function (data) {
    try {
        var res = await this.axios.post("/after_spec", data);
        return res; 
    } catch (error) {
        console.log(error)
        return false;
    }
    
}

module.exports.BeforeBrowserLaunch = async function (data) {
    try {
        var res = await this.axios.post("/before_browser_launch", data);
        return res;
    } catch (error) {
        console.log(error)
        return false;
    }
  
}

module.exports.AfterScreenshot= async function (data) {
    try {
        var res = await this.axios.post("/before_browser_launch", data);
        return res;
    } catch (error) {
        console.log(error)
        return false;
    }
   
}

module.exports.FilePreprocessor= async function (data) {
    try {
        var res = await this.axios.post("/filepreprocessor", data);
        return res;
    } catch (error) {
        console.log(error)
        return false;
    }
    
}

module.exports.Task= async function (data) {
    try {
        var res = await this.axios.post("/task", data);
        return res;  
    } catch (error) {
        console.log(error)
        return false;
    }
    
}
