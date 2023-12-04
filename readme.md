## Trabalho I - Estrutura de Dados III

## A Canção de Vecna

*O problema*
	A cidade de Hawkings está pavorosa!!! Antigos acontecimentos assustadores estão retornando, sequestros, desaparecimentos e crianças voando por aí. Vecna está mais forte do que nunca e a mente de todos está em perigo. Diante das ameaças, Eleven e sua turminha do barulho estão empenhadas na luta direta com Vecna, agentes do governo e, é claro, os russos! 
	Durante a batalha, eles descobriram que a única forma de imunidade aos poderes do Vecna é estar concentrado em algo que lhe é marcante, principalmente se for sua música favorita. Sabendo disso, a turma da Eleven fez um plano: enquanto eles estão envolvidos com os problemas maiores, como por exemplo manter o Vecna e o governo ocupados, uma equipe, no caso você e sua turma, devem ir à dimensão do upside-down para ajudá-los. A missão seria simples, se não fosse o mundo invertido. Explica-se: Dustin teve a ideia e coletou todas as vossas músicas favoritas e deixou em seu computador, de modo que pudesse ser acessado no mundo invertido, na casa de Vecna. A ideia seria chegar com a equipe a este computador, acessar as músicas e reproduzi-las simultaneamente. Assim, todos ficariam imunes ao Vecna; e esse ficaria vulnerável, pois o efeito das músicas iria enfraquecê-lo, dando tempo para Eleven ter uma vantagem. O problema é que ao chegar lá, descobriu-se que o mundo invertido provocou um embaralhamento das músicas. Não se sabe exatamente porquê, se foi efeito da natureza do ambiente, do próprio Vecna, ou se foram os russos…
	Os arquivos de cada música ficaram irreconhecíveis! Foram criadas músicas invertidas, distorcidas e que ao invés de ajudar, acabaram dando força ao Vecna. Vocês devem imaginar que o primeiro grupo que chegou lá para reproduzir as músicas na primeira tentativa não teve um final muito feliz (RIP), mas ao menos conseguiram obter informações importantes sobre como os arquivos estão. Assim, ao chegar lá, vocês terão uma vantagem importante para conseguir recuperar as músicas e conseguir reproduzi-las para que o plano dê certo.

> A missão!

Vocês devem chegar ao local onde estão os arquivos, carregar os arquivos, recuperá-los e aí então encontrar a música correta para que seja reproduzida. São 13 arquivos, cada um com a música de um de vocês escondida e embaralhada entre canções falsas. Este embaralhamento está feito da seguinte forma: as linhas de notas de cada música estão misturadas entre si. Entre todas as músicas há somente uma verdadeira. Então a solução para o problema é ordenar essas linhas de notas, primeiro para saber quais são de cada música (cada arquivo) e qual a ordem das notas dentro desses arquivos. Assim, ao reproduzir cada música, ficará claro qual é a música verdadeira, pois será a única com uma melodia clara e organizada. Todas as outras estão propositalmente caóticas.
Adicional ao problema, está a questão de que o tempo no mundo invertido, com o Vecna como ameaça, é precioso! Então essa operação de ordenação deve ser feita no menor tempo possível!!! 
Portanto, a missão de vocês é construir um algoritmo de ordenação com a menor complexidade de tempo e espaço possível, utilizando de técnicas e algoritmos conhecidos, adaptados para essa realidade. A execução deve ser a mais rápida possível. 
Cada um de vocês deve escolher um arquivo diferente para ser descoberto, chegando no momento adequado, executar a música correta a tempo, descobrindo de quem é a música. Portanto, a missão é muito importante. 
O futuro de Hawkins e da humanidade está em suas mãos. Bora derrotar o Vecna com a Computação!

EXTRA (+1): Descobriu-se que o computador no upside-down tem sérias dificuldades em processar operações de comparação (<=, <, e >, >=), chegando até a não funcionar os programas que usam muito deste artifício. Portanto, o algoritmo de ordenação a ser utilizado não pode utilizar comparações!!!
2. Como o arquivo foi encontrado
	A principal suspeita de que houve interferência humana no embaralhamento das músicas é que os arquivos encontrados estavam no formato JSON! O que foi uma sorte, pois assim é possível identificar cada linha de notas de cada música para que seja possível fazer a ordenação. Além disso, dois arquivos de cada música idênticos foram recuperados: um com o vetor de todos os dados JSON e outro com os mesmos dados, porém separados por quebra de linha. 
	Cada arquivo contém os objetos no seguinte formato JSON:
    {
    arq: inteiro,
    ordem: inteiro,
    notas: string
    }

Exemplo: {"arq":49,"ordem":15083,"notas":"G,,,2 z6| \\"}

A chave arq contém a informação de qual arquivo pertence as notas; ordem indica qual a linha dentro do arquivo que as notas deveriam estar; e notas indica quais as notas da música que deveriam ser a linha do arquivo.
O formato das notas está em ABC, um formato de música muito popular no upside-down (é tipo o mp3 deles), que pode ser convertido para tocar no nosso mundo pelo aplicativo abc2midi, disponível no linux por apt-get ou aqui para windows. No linux, basta executar abc2midi arq.abc -o saida.mabc2midiidi para fazer a conversão e poder tocar o midi.
