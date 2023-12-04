const fs = require("fs");
const HashTable = require("./HashTable");

const hashTable = new HashTable();
// Função para ler o arquivo .abc
function readABCFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data.split("\n");
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error.message);
    return [];
  }
}

// Função para criar a tabela hash e procurar uma letra
function findLetterInABCFile(filePath) {
  let contLetterA = 0;
  let contLetterB = 0;
  let contLetterC = 0;
  let contLetterD = 0;
  let contLetterE = 0;
  let contLetterF = 0;
  let contLetterG = 0;
 
  const lines = readABCFile(filePath);

  lines.forEach((line, index) => {
    for (let i = 0; i < line.length; i++) {
      const currentLetter = line[i];
     
      // Se a letra for a procurada, armazene a linha na tabela hash
       if (currentLetter === "A") {
        contLetterA++;
        hashTable.set(currentLetter, index + 1); // Adicione 1 para converter para base 1
        }
        if (currentLetter === "B") {
            contLetterB++;
            hashTable.set(currentLetter, index + 1); // Adicione 1 para converter para base 1
        }
        if (currentLetter === "C") {
            contLetterC++;
            hashTable.set(currentLetter, index + 1); // Adicione 1 para converter para base 1
        }
        if (currentLetter === "D") {
            contLetterD++;
            //console.log('contLetterD',contLetterD);
            console.log('index',index+1);
           // console.log(hashTable.size);
            //console.log(hashTable.table);
            //console.log(hashTable);
            hashTable.set(currentLetter, index + 1); // Adicione 1 para converter para base 1
        }
        // if (currentLetter === "E") {
        //     contLetterE++;
        //     hashTable.set(currentLetter, index + 1); // Adicione 1 para converter para base 1
        // }
        // if (currentLetter === "F") {
        //     contLetterF++;
        //     hashTable.set(currentLetter, index + 1); // Adicione 1 para converter para base 1
        // }
        // if (currentLetter === "G") {
        //     contLetterG++;
        //     hashTable.set(currentLetter, index + 1); // Adicione 1 para converter para base 1
        // }

    }
  });

  const result = hashTable.get(targetLetter);

  if (result.length > 0) {
    console.log(
      `A letra '${targetLetter}' foi encontrada nas linhas: ${result.join(
        ", "
      )}`
    );
  } else {
    console.log(`A letra '${targetLetter}' não foi encontrada no arquivo.`);
  }
}

// Substitua 'caminho/do/arquivo.abc' pelo caminho do seu arquivo .abc
const filePath = "./mids/94.abc";
const targetLetter = 'D'; // Letra que você está procurando

findLetterInABCFile(filePath, targetLetter);

 hashTable.display();

 //https://www.freecodecamp.org/portuguese/news/hash-tables-em-javascript-array-associativo-de-hashing-em-js/