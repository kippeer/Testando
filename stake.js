const axios = require('axios');
const cheerio = require('cheerio');

async function extrairDadosTabela() {
    try {
        const response = await axios.get('https://stake.com/pt/casino/home');
        const html = response.data;
        const $ = cheerio.load(html);

        // Selecionar todas as linhas da tabela com o atributo data-test-id
        const linhas = $('td');

        // Iterar sobre cada linha e extrair os dados de interesse
        linhas.each((index, elemento) => {
            const betIndex = $(elemento).attr('data-bet-index');
            const nomeBotao = $(elemento).find('td:first-child button span').text();
            const nomeDiv = $(elemento).find('td:nth-child(2) button').text();
            const hora = $(elemento).find('td:nth-child(3)').text();
            const valor = $(elemento).find('td:nth-child(4) .content span:nth-child(1)').text();
            const multiplicador = $(elemento).find('td:nth-child(5)').text();
            const premio = $(elemento).find('td:nth-child(6) .content span:nth-child(1)').text();

            // Imprimir os dados da linha no console
            console.log(`Bet Index: ${betIndex}`);
            console.log(`Nome do Botão: ${nomeBotao}`);
            console.log(`Nome da Div: ${nomeDiv}`);
            console.log(`Hora: ${hora}`);
            console.log(`Valor: ${valor}`);
            console.log(`Multiplicador: ${multiplicador}`);
            console.log(`Prêmio: ${premio}`);
            console.log('---');
        });
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

extrairDadosTabela();
