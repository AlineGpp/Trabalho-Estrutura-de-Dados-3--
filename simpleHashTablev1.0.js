const fs = require('fs');

class HashTable {
  constructor() {
    this.table = {};
  }

  insert(key, value) {
    if (!this.table[key]) {
      this.table[key] = [];
    }
    this.table[key].push(value);
  }

  search(key) {
    return this.table[key] || [];
  }
}

// Função para ler o arquivo .abc
function readABCFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n');
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error.message);
    return [];
  }
}

// Função para criar a tabela hash e procurar uma letra
function findLetterInABCFile(filePath, targetLetter) {
  const hashTable = new HashTable();
  const lines = readABCFile(filePath);

  lines.forEach((line, index) => {
    for (let i = 0; i < line.length; i++) {
      const currentLetter = line[i].toLowerCase();

      // Se a letra for a procurada, armazene a linha na tabela hash
      if (currentLetter === targetLetter.toLowerCase()) {
        hashTable.insert(targetLetter, index + 1); // Adicione 1 para converter para base 1
      }
    }
  });

  const result = hashTable.search(targetLetter);

  if (result.length > 0) {
    console.log(`A letra '${targetLetter}' foi encontrada nas linhas: ${result.join(', ')}`);
  } else {
    console.log(`A letra '${targetLetter}' não foi encontrada no arquivo.`);
  }
}

// Substitua 'caminho/do/arquivo.abc' pelo caminho do seu arquivo .abc
const filePath = './mids/94.abc';
const targetLetter = 'D'; // Letra que você está procurando

findLetterInABCFile(filePath, targetLetter);
