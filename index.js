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
    switch (command) {
      case 'exit':
        process.exit(0);
        break;

      case 'show': {
        const list = commentsList.list;
        const output = new Output(list);
        output.show();
        break;
      }

      case 'important': {
        const importantList = commentsList.getImportant();
        const output = new Output(importantList);
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
