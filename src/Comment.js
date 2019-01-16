class Comment {
  constructor(comment, fileName) {
    this.fileName = fileName;
    this.execData(comment);
  }

  execData(string) {
    const re = /(?:\/\/ ?[tT][oO][dD][oO][ ]?[:]?[ ]?)(?:(.*);[ ]?(.*);[ ]?)?(.*)/g;
    const [, user = '', date = '', text = ''] = re.exec(string);

    this.user = user;
    this.date = date;
    this.text = text;
    this.isImportant = this.text.indexOf('!') >= 0;
    this.importantWeight = this.text.split('').filter(char => char === '!').length;
  }
}

module.exports = Comment;