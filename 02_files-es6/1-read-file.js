/* author: Ajar <ajar@artizan.io> (https://artizan.io) */
const clc     = require('cli-color');
const fs      = require('fs');

const log = (color, colored_msg , uncolored_msg)=>  {
    console.log(clc[color+'Bright'](colored_msg),uncolored_msg ? uncolored_msg : '');
}


log('magenta','start code...');

//read a text file with an async callback
fs.readFile('./files/example.txt','utf-8', (err,data) => {
    if(err)
        log('red','Error reading the file:',err.message );
    else
        log('cyan','FIle loaded!, Contents:',data.length);
});

log('yellow','Some other tasks code...');
