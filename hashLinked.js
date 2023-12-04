const fs = require('fs');
const crypto = require('crypto');

class Node {
  constructor(letter, line) {
    this.letter = letter;
    this.lines = [line];
    this.count = 1;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(letter, line) {
    let current = this.head;

    if (!current) {
      this.head = new Node(letter, line);
      return;
    }

    while (current.next) {
      if (current.letter === letter) {
        current.lines.push(line);
        current.count++;
        return;
      }
      current = current.next;
    }

    if (current.letter === letter) {
      current.lines.push(line);
      current.count++;
    } else {
      current.next = new Node(letter, line);
    }
  }
}

class HashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size);
  }

  hash(key) {
    const hash = crypto.createHash('md5').update(key).digest('hex');
    return parseInt(hash, 16) % this.size;
  }

  insert(letter, line) {
    const index = this.hash(letter);

    if (!this.table[index]) {
      this.table[index] = new LinkedList();
    }

    this.table[index].insert(letter, line);
  }

  findNoteInLine(note, targetLine) {
    const index = this.hash(note);

    if (!this.table[index]) {
      return false; // A lista encadeada correspondente está vazia, a nota não está presente
    }

    let current = this.table[index].head;

    while (current) {
      if (current.letter === note && current.lines.includes(targetLine)) {
        return true; // Encontrou a nota na linha específica
      }

      current = current.next;
    }

    return false; // A nota não foi encontrada na linha específica
  }

  printTable() {
    for (let i = 0; i < this.size; i++) {
      if (this.table[i]) {
        let current = this.table[i].head;

        while (current) {
          console.log(`Letter: ${current.letter}, Lines: ${current.lines}, Count: ${current.count}`);
          current = current.next;
        }
      }
    }
  }
}

function processFile(fileName) {
  const hashTable = new HashTable(10);

  const data = fs.readFileSync(fileName, 'utf-8');
  const lines = data.split('\n');

  lines.forEach((line, lineNumber) => {
    for (const letter of line) {
      // Considering only letters from A to G
      if (letter >= 'A' && letter <= 'G') {
        hashTable.insert(letter, lineNumber + 1);
      }
    }
  });

  return hashTable;
}

// Example usage
const fileName = "./mids/94.abc"; // Change to your file name
const resultTable = processFile(fileName);

console.log('Hash Table:');
resultTable.printTable();

// Example usage to check if note 'C' is in line 3
const noteToFind = 'C';
const lineToCheck = 5;
const isNoteInLine = resultTable.findNoteInLine(noteToFind, lineToCheck);

console.log(`Is ${noteToFind} in line ${lineToCheck}? ${isNoteInLine}`);
