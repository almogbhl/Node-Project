/* author: Ajar <ajar@artizan.io> (https://artizan.io) */
const clc     = require('cli-color');
const fs      = require('fs');

const log = (color, colored_msg , uncolored_msg)=>  {
    console.log(clc[color+'Bright'](colored_msg),uncolored_msg ? uncolored_msg : '');
}
log('magenta','start code...');
try{
    //read a text file synchronously
    let data = fs.readFileSync('./files/configg.json','utf-8');
    data = JSON.parse(data);
    // log('green','config file loaded!, Contents:',data);
    log('cyan','api: ',data.api);
}catch(err){
    log('red','Error reading the file:',err.message );
}

log('yellow','Some other tasks code...');
