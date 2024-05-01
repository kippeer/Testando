const axios = require('axios');
const cheerio = require('cheerio');

async function extrairManchetes() {
    try {
        const response = await axios.get('https://g1.globo.com/globonews/');
        const html = response.data;
        const $ = cheerio.load(html);

        // Selecionar apenas os elementos <a> com a classe feed-post-link
        const manchetes = $('a.feed-post-link').map((i, el) => $(el).text()).get();

        console.log('Manchetes:');
        manchetes.forEach((manchete, index) => {
            console.log(`${index + 1}. ${manchete}`);
        });
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

extrairManchetes();
