const axios = require('axios');
const cheerio = require('cheerio');

async function extrairDados() {
    try {
        const response = await axios.get('https://g1.globo.com/globonews/');
        const html = response.data;
        const $ = cheerio.load(html);

        // Aqui você pode selecionar os elementos do HTML e extrair os dados que deseja
        const titulo = $('h1').text();
        const paragrafos = $('p').map((i, el) => $(el).text()).get();

        console.log('Título:', titulo);
        console.log('Parágrafos:', paragrafos);
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

extrairDados();
