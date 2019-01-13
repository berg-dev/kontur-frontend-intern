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

  getImportant() {
    return this.list.reduce((acc, comment) => {
      if (comment.isImportant) {
        return [...acc, comment];
      }

      return acc;
    }, []);
  }
}

module.exports = List;