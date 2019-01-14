const Comment = require('./Comment');

class List {
  constructor(files = []) {
    this.collection = this.createCommentsCollection(files);
    this.list = this.createCommentsList(this.collection);
  }

  createCommentsCollection(files = []) {
    return files.reduce((acc, file) => {
      const comments = file.content.match(/(\/\/ ?[tT][oO][dD][oO][ |:]).*/g);

      if(!comments.length) return acc;

      return [...acc, {fileName: file.fileName, comments}];
    }, []);
  }

  createCommentsList(collection = []) {
    return collection.reduce((acc, file) => {
      if(!file.comments.length) {
        return acc;
      }

      return [...acc, ...file.comments.map(comment => new Comment(comment, file.fileName))];
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

  getSortList(type) {
    const compareFunctions = {
      importance: (a, b) => b.importantWeight - a.importantWeight,
      user: (a, b) => {
        const nameA = a.user.toLowerCase().trim();
        const nameB = b.user.toLowerCase().trim();

        if (nameB.length === 0) return -1;
        if (nameA.length === 0) return 1;
        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;

        return 0;
      },
      date: (a, b) => {
        if (b.date.length === 0) return -1;
        if (a.date.length === 0) return 1;

        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
      }
    };


    return this.list.sort(compareFunctions[type]);
  }
}

module.exports = List;