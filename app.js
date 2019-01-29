const Promise = require("bluebird");
const fs = require("fs");
const fetch = require("isomorphic-fetch");
const readdir = Promise.promisify(fs.readdir);
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

let userArray = [];
let dedupe = {};
let start;

async function getUsers() {
  try {
    start = +new Date();

    const read_files = await readdir("./LEADS");
    const files_promises = read_files.map(file => {
      return readFile("./LEADS/" + file, "utf-8");
    });

    const files_data = await Promise.each(files_promises, function(file_data) {
      const rows = file_data.split("\r\n");

      for (let singleRow of rows) {
        const [ id , name , email ] = singleRow.split(",");
        const user = {
          id,
          name = name.substring(1, name.length - 1),
          email
        };
        
        if (!(id in dedupe)) {
          dedupe[id] = true;
          userArray.push(user);
        }
      }

    });

    const write_json = writeFile(
      "./results_2.txt",
      JSON.stringify(userArray, null, 1)
    );
    console.log(userArray.length);

    const end = +new Date(); // log end timestamp
    const diff = end - start;

    console.log(`start: ${start}, end: ${end}, diff: ${diff} `);

  } catch (err) {
    console.log(err);
  }
}

getUsers();
