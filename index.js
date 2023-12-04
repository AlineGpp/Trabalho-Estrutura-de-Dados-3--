const fs = require('fs');
//precisa usar um objeto com contruttor , quais são os atributos necessarios para criar objeto? 
const hashMusicas = [];

const readFile = file => new Promise((resolve, reject) => {
    fs.readFile(file, (err, contents) => {
        if (err) {
            reject(err);
        } else {
            resolve(contents);
        }
    });
});

// Função de hash simples para gerar chaves únicas
const hashCode = str => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }
    return hash;
};

const isLetter = char => {
    return /^[a-zA-Z]$/.test(char) && char === 'A' || char === 'B' || char === 'C' || char === 'D' || char === 'E' || char === 'F' || char === 'G';
};

const ler = filename => {
    return readFile(filename).then(contents => {
        const conteudoString = String(contents);

        for (let i = 0; i < conteudoString.length; i++) {
            const char = conteudoString[i];

            // Verificando se é uma letra antes de inserir no hash
            if (isLetter(char)) {
                const chave = hashCode(char);
                hashMusicas[chave] = char;
            }
        }

        console.log('hashMusicas dentro de ler:', hashMusicas);

        // Retornando o hashMusicas para que a promessa possa ser resolvida com o conteúdo
        return hashMusicas;

    }).catch(err => {
        console.error('Erro ao ler o arquivo:', err);
    });
};

// Função de busca usando hash
const buscarLetra = letra => {
    const chave = hashCode(letra);

    if (hashMusicas[chave] === letra) {
        console.log(`Letra encontrada para '${letra}': ${hashMusicas[chave]} no indice ${chave}`);
    } else {
        console.log(`Letra para '${letra}' não encontrada.`);
    }
};

// Chamando a função ler e utilizando a promessa resultante
ler('./mids/5.abc').then(() => {
    // Chamando a função de busca
    buscarLetra('A');
    buscarLetra('Z');
});
