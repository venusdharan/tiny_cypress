const axios = require("axios");
var data_base_full = process.argv.slice(2);
var data_base = data_base_full[0];
var server_url = data_base_full[1];
const fs = require("fs");
const fsp = require('fs/promises');
const FormData = require('form-data');

var buff = Buffer.from(data_base, 'base64');
var buff2 = Buffer.from(server_url, 'base64');    

var data = buff.toString('utf-8');

data = JSON.parse(data);
server_url = buff2.toString('utf-8');

async function start(){
    // console.log(data)
    if (data.results) {
        var video = data.results.video;
        if (video) {
            if (fs.existsSync(video)) {
                const media = await fsp.readFile(video);
                const form = new FormData();
                form.append('file', media,'my-whatever-file-name.mp4');
                // console.log(form.getHeaders())
                const response = await axios.post(server_url+'/upload/video', form, {
                    headers: {
                        //...form.getHeaders(),
                       // "Content-Type": "multipart/form-data",
                       // Authentication: 'Bearer ...',
                    },
                });
                console.log(response)
            }
        }
    }
}

start();
