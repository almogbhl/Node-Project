const Promise = require("bluebird");
const fs = require("fs");

const readdir = Promise.promisify(fs.readdir);
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

let userArray = [];
let dedupe = {};

let start;

readdir("./LEADS")
  .then(files_names => {
      // log start timestamp
    start = +new Date(); 
    // loop over th files with promis.each
    return Promise.each(files_names, file_name => {
        // read each file in the folder with promisfy(node.fs) and return the data from it
      return readFile("./LEADS/" + file_name, "utf-8").then(data => {
          // ${rows} will be the data after spliting by "space"
        const rows = data.split("\r\n");
        // loop over the rows (users)
        // ${singleRow} will be a user
        for (let singleRow of rows) {
            // the user is contain 3 data parts (id, name, email)
            // ${singleRowParts} will be each part of the user
          const singleRowParts = singleRow.split(",");

            // ${user} is an empty object
            // it will contain the 3 data parts separate like this:
            // {
            //  "facebookID": "680642751",
            //  "fullName": "Erdem İyibilgin",
            //  "email": "someUser@facebook.com"
            // }
          const user = {};
          // "facebookID": "680642751"
          user.id = singleRowParts[0];
          // "fullName": "Erdem İyibilgin"
          user.name = singleRowParts[1].substring(
            1,
            singleRowParts[1].length - 1
          );
          // "email": "someUser@facebook.com"
          user.email = singleRowParts[2];

          // if 
          if (!(singleRowParts[0] in dedupe)) {
            dedupe[singleRowParts[0]] = true;
            // push the ${user} to the array
            userArray.push(user);
          }
        }
      });
    });
  })

  .then(() => {
    console.log(userArray.length);
    writeFile("./results.txt", JSON.stringify(userArray, null, 1));
  })
  .then(() => {
    const end = +new Date(); // log end timestamp
    const diff = end - start;

    console.log(`start: ${start}, end: ${end}, diff: ${diff} `);
  })

  .catch(err => {
    console.log(err);
  });
