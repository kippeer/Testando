const axios = require('axios');
const cheerio = require('cheerio');

// URL da página que você deseja fazer o scraping
const url = 'https://www.mercadolivre.com.br/ofertas?deal_ids=MLB1031452-2&container_id=MLB1031452-2#origin=scut&filter_applied=deal_ids&filter_position=5&is_recommended_domain=false';



// Função para fazer a solicitação HTTP e fazer o scraping
async function scrape() {
    try {
        // Fazer solicitação HTTP para obter o conteúdo da página
        const response = await axios.get(url);
        
        // Carregar o conteúdo HTML usando o cheerio
        const $ = cheerio.load(response.data);

        // Extrair informações do produto
        const products = $('.promotion-item').map((index, element) => {
            const title = $(element).find('.promotion-item__title').text().trim();
            const currentPrice = $(element).find('.andes-money-amount__fraction').first().text().trim();
            const previousPrice = $(element).find('.andes-money-amount__fraction').last().text().trim();
            const discount = $(element).find('.promotion-item__discount-text').text().trim();

            return {
                title,
                currentPrice,
                previousPrice,
                discount
            };
        }).get();

        // Exibir informações dos produtos
        console.log('Informações dos produtos:');
        console.log(products);
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

// Chamar a função de scraping
scrape();
