const Comment = require('./Comment');

class List {
  constructor(files) {
    const comments = this.createCommentsCollection(files);
    this.list = this.createCommentsList(comments);
  }

  createCommentsList(collection) {
    return collection.reduce((acc, file) => {
      return [...acc, ...file.comments.map(comment => new Comment(comment, file.fileName))];
    }, []);
  }

  createCommentsCollection(files) {
    return files.reduce((acc, file) => {
      const comments = file.content.match(/(\/\/ ?[tT][oO][dD][oO][ |:]).*/g);

      return [...acc, {fileName: file.fileName, comments}];
    }, []);
  }

  getImportantList() {
    return this.filterList((comment) => {
      return comment.isImportant;
    });
  }

  getList() {
    return this.list;
  }

  getListByUser(commandUser) {
    return this.filterList((comment) => {
      const commentUser = comment.user.substring(0, commandUser.length);
      return commandUser.toLowerCase() === commentUser.toLowerCase();
    })
  }

  filterList(cb) {
    return this.list.filter((comment) => cb(comment));
  }
}

module.exports = List;