const fs = require('fs');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const path = require('path');
var inputData = [];

midsDirectory = './mids/sort';

const start_at = new Date();
console.log('Hora de inicio: ' + start_at);

// Função para processar cada objeto JSON lido do arquivo, colocando-o em um vetor
async function processJsonObject(jsonObj) {
//console.log(jsonObj);
inputData.push(jsonObj);

}

// Caminho do arquivo JSON de origem
const filePath = './songs2JSONvector.txt';

// Cria um fluxo de leitura para o arquivo
const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

// Cria um pipeline de fluxo com StreamArray
const jsonStream = readStream.pipe(parser()).pipe(streamArray());

// Lê e processa cada objeto JSON do array
jsonStream.on('data', ({ key, value }) => {
processJsonObject(value);
});

// Captura erros no fluxo de leitura
readStream.on('error', (error) => {
console.error(`Erro ao ler o arquivo: ${error.message}`);
});

// Captura erros no fluxo JSON
jsonStream.on('error', (error) => {
console.error(`Erro ao analisar o JSON: ${error.message}`);
});

function mostraVetor(){
inputData.forEach(e => {
console.log(e);
console.log('*********');
});
}

// Finaliza o processo ao terminar a leitura
jsonStream.on('end', () => {
console.log('Leitura do arquivo concluída.');
//daqui deve partir o desenvolvimento, pois antes não garante que o arquivo está lido
//mostraVetor();

var dictArqs = new Map();
for (var i = 0; i < inputData.length; i++) {
    if (dictArqs.has(inputData[i].arq)) {
        var lista = dictArqs.get(inputData[i].arq);
        lista.push(inputData[i]);
        dictArqs.set(inputData[i].arq, lista);
    } else {
        var lista = [];
        lista.push(inputData[i]);
        dictArqs.set(inputData[i].arq, lista);
    }
}

// Reordenar usando o sort
dictArqs.forEach((value, key) => {
    value.sort(function (a, b) {
        if (a.ordem < b.ordem) {
            return -1;
        }
        if (a.ordem > b.ordem) {
            return 1;
        }
        return 0;
    });

    var notas = [];
    value.forEach(e => {
        if (e.notas !== undefined && e.notas !== null) {
            notas.push(e.notas);
        }
    });    
    salvarArquivoMid(key, notas);
});

function salvarArquivoMid(nomeArq, notas) {
    if (!existsSync(midsDirectory)) {
        mkdirSync(midsDirectory);
    }
    // salva em uma pasta chamada sort
    nomeArq = midsDirectory + '/' + nomeArq + '.abc';
    var fs = require('fs');
    var stream = fs.createWriteStream(nomeArq);
    stream.once('open', function (fd) {
        notas.forEach(e => {
            stream.write(e+'\n');
        });
        stream.end();
    });
}

function existsSync(filePath) {
    try {
        fs.statSync(filePath);
    } catch (err) {
        if (err.code == 'ENOENT') return false;
    }
    return true;
}

function mkdirSync(dirPath) {
    try {
        fs.mkdirSync(dirPath);
    } catch (err) {
        if (err.code !== 'EXIST') throw err;
    }
}

const end_at = new Date();
console.log('Hora de término: ' + end_at);
console.log('Tempo total: ' + (end_at - start_at) + ' milissegundos');

//main();
});