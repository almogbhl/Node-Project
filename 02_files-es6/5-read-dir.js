/* author: Ajar <ajar@artizan.io> (https://artizan.io) */
const clc     = require('cli-color');
const fs      = require('fs');

const log = (color, colored_msg , uncolored_msg)=>  {
    console.log(clc[color+'Bright'](colored_msg),uncolored_msg ? uncolored_msg : '');
}

fs.readdir('./files',(err,files)=>{
    if(err)
        log('red','Error:',err.message);
    else
        log('cyan','Contents:',files);
});

log('magenta','do some other stuff meanwhile...');
