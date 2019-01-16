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
  const output = new Output();

  return (command) => {
    const [ name, arg] = command.split(' ');

    switch (name) {
      case 'exit': {
        process.exit(0);
        break;
      }

      case 'show': {
        const list = commentsList.getList();
        output.updateData(list);
        output.print();
        break;
      }

      case 'important': {
        const list = commentsList.getList('important');
        output.updateData(list);
        output.print();
        break;
      }

      case 'user': {
        if(!arg) {
          console.log('Error: name required');
          break;
        }

        const list = commentsList.getList('user', { user: arg });
        output.updateData(list);
        output.print();
        break;
      }

      case 'sort': {
        if(!arg) {
          console.log('Error: type required');
          break;
        }

        if(arg !== 'importance' && arg !== 'user' && arg !== 'date') {
          console.log('Error: Wrong type');
          break;
        }

        const list = commentsList.getList('sort', { sortType: arg });
        output.updateData(list);
        output.print();
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