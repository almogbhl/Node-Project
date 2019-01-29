/* author: Ajar <ajar@artizan.io> (https://artizan.io) */
const clc     = require('cli-color');
const fs      = require('fs');
//const data    =  require('./files/config.json')

const log = (color, colored_msg , uncolored_msg)=>  {
    console.log(clc[color+'Bright'](colored_msg),uncolored_msg ? uncolored_msg : '');
}

log('magenta','process.cwd()',process.cwd());
log('yellow','__dirname: ',__dirname);
log('green','__filename: ',__filename);

let data = fs.readFileSync('./files/config.json','utf-8');
data = JSON.parse(data);
log('cyan','config file loaded!, version:',data.version);


fs.watchFile('./files/config.json',(current, previous)=>{
    log('magenta','the config file has updated');
    let fileData = fs.readFileSync('./files/config.json')
    let conf = JSON.parse(fileData);
    log('yellow','new version is:', conf.version);
});
