const testData = [
  ['  !  ', '  user  ', '  date        ', '  comment                ', '  fileName  '],
  ['-----', '--------', '--------------', '-------------------------', '------------'],
  ['     ', '  digi  ', '  2016-04-08  ', '  добавить writeLine!!!  ', '  index.js  '],
];

class Output {
  constructor(list = []) {
    this.list = list;
    this.cellsMaxLength = [1, 10, 10, 50, 15];
    this.cellsMinLength = [0, 0, 0, 0, 0];
  }

  show() {
    const data = this.createData(this.list);
    console.log(this.formatedOutput(data));
  }

  formatedOutput(data) {
    return data.reduce((acc, row) => {
      return `${acc}
${row.join('|')}`;
    }, ``);
  }

  createData(list) {
    let listing = this.createListing(list);
    const header = this.createHeader(listing);
    const separator = [this.createSeparator(header.join('|').length, '-')];
    listing = this.createListing(list);

    return listing.length > 0
      ? [ header, separator, ...listing, separator ]
      : [ header, separator, ...listing ];
  }

  createListing(list) {
    return list.reduce((acc, comment) => {
      const row = this.createRow(comment);
      return [...acc, row];
    }, []);
  }

  createHeader(list) {
    this.computedCellsLength(list);

    return [
      this.createCell('!', 0),
      this.createCell('user', 1),
      this.createCell('date', 2),
      this.createCell('comment', 3),
      this.createCell('fileName', 4),
    ]
  }

  computedCellsLength(list) {
    let cellsLength = this.cellsMinLength;

    list.forEach((row) => {
      cellsLength = row.map((cell, i) => {
        const valueLength = cell.length - 4;
        return valueLength > cellsLength[i] ? valueLength : cellsLength[i];
      });
    });

    this.cellsMinLength = cellsLength;
  }

  createSeparator(length, symbol) {
    let result = '';

    for(let i = 0; i < length; i++) {
      result += symbol;
    }

    return result;
  }

  createRow(commentData) {
    return [
      this.createCell(commentData.isImportant ? '!' : ' ', 0),
      this.createCell(commentData.user, 1),
      this.createCell(commentData.date, 2),
      this.createCell(commentData.text, 3),
      this.createCell(commentData.fileName, 4),
    ];
  }

  createCell(value, index) {
    const maxLength = this.cellsMaxLength[index];
    const minLength = this.cellsMinLength[index];
    const isCrop = value.length > maxLength;
    const isSpace = value.length < minLength;
    const compValue = isCrop ? `${value.substring(0, maxLength - 3)}...` : value;
    const resultValue = isSpace ? `${compValue}${this.createSeparator(minLength - value.length, ' ')}` : compValue;

    return `  ${resultValue}  `;
  }
}

module.exports = Output;

