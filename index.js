const {getAllFilePathsWithExtension, readFile, getFileName} = require('./fileSystem');
const {readLine} = require('./console');
const List = require('./src/List');
const Output = require('./src/Output');

app();

function app() {
  const files = getFiles();
  const commentsList = new List(files);

  console.log('Please, write your command!');
  readLine(processCommand(commentsList));
}

function getFiles() {
  const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');

  return filePaths.map(path => ({
    fileName: getFileName(path),
    content: readFile(path),
  }));
}

function processCommand(commentsList) {
  return (command) => {
    switch (true) {
      case /exit/.test(command):
        process.exit(0);
        break;

      case /show/.test(command): {
        const list = commentsList.getList();
        const output = new Output(list);
        output.show();
        break;
      }

      case /important/.test(command): {
        const importantList = commentsList.getImportantList();
        const output = new Output(importantList);
        output.show();
        break;
      }

      case /user/.test(command): {
        const re = /(?:user )(.*)/g;
        const match = re.exec(command);
        const userName = match[1];
        const listByUser = commentsList.getListByUser(userName);
        const output = new Output(listByUser);
        output.show();
        break;
      }

      default:
        console.log('wrong command');
        break;
    }
  }
}

// TODO you can do it!
// TODO test
