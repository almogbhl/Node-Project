/* author: Ajar <ajar@artizan.io> (https://artizan.io) */
const clc     = require('cli-color');
const fs      = require('fs');

const log = (color, colored_msg , uncolored_msg)=>  {
    console.log(clc[color+'Bright'](colored_msg),uncolored_msg ? uncolored_msg : '');
}

log('magenta','start code...');

fs.writeFile('./files/newFile.txt','Some really fresh new content here...', (err)=> {
      if(err)
          log('red','Error writing the file:',err.message);
      else
          log('green','File written successfully!');
});

log('yellow','Some other code...');
