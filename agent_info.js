const si = require('systeminformation');

module.exports.getinfo = async function(){
    var result = {};
    result.hardware = await si.system();
    result.cpu = await si.cpu();
    result.memory = await si.mem();
    result.os = await si.osInfo();
    return result;
}