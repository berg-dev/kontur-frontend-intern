const Comment = require('./Comment');

class List {
  constructor(files) {
    this.list = this.getComments(files);
  }

  getComments(files) {
    const regex = /(\/\/ ?todo[ ]?[:]?[ ]?)(.*)/gi;
    return files.reduce((acc, file) => {
      const commentsInFile = file.content.match(regex);

      if (commentsInFile && commentsInFile.length) {
        const comments = commentsInFile.map(comment => {
          return new Comment(comment, file.fileName);
        });

        return [...acc, ...comments];
      }

      return acc;
    }, []);
  }

  getList(type, params) {
    switch(type) {
      case 'important':
        return this.filterList(comment => comment.isImportant);

      case 'user': {
        return this.filterList((comment) => {
          const commentUser = comment.user.substring(0, params.user.length);
          return params.user.toLowerCase() === commentUser.toLowerCase();
        })
      }

      case 'sort': {
        return this.getSortList(params.sortType);
      }

      default:
        return this.list;
    }
  }

  filterList(f) {
    return this.list.filter((comment) => f(comment));
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