class Comment {
  constructor(comment, fileName) {
    this.fileName = fileName;
    this.user = '';
    this.date = '';
    this.text = '';
    this.isImportant = false;
    this.importantWeight = 0;
    this.matchData(comment);
  }

  matchData(string) {
    const re = /(?:\/\/ ?[tT][oO][dD][oO][ ]?[:]?[ ]?)(?:(.*);[ ]?(.*);[ ]?)?(.*)/g;
    const match = re.exec(string);

    this.user = match[1] || this.user;
    this.date = match[2] || this.date;
    this.text = match[3] || this.text;
    this.isImportant = this.text.indexOf('!') >= 0;
    this.importantWeight = this.text.split('').filter(char => char === '!').length;
  }
}

module.exports = Comment;