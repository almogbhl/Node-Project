/* author: Ajar <ajar@artizan.io> (https://artizan.io) */
const clc     = require('cli-color');
const fs      = require('fs');

const log = (color, colored_msg , uncolored_msg)=>  {
    console.log(clc[color+'Bright'](colored_msg),uncolored_msg ? uncolored_msg : '');
}

log('magenta','start code...');;

fs.writeFileSync('./files/newFile.txt','Some fresh new content here...');

log('yellow','Some other code...');
