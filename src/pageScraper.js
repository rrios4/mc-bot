const scraperObject = {
    url: 'https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966965+4294815592&myStore=false',
    //url: 'https://www.microcenter.com/category/4294966995/all-processors',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to  ${this.url}...`);
        await page.goto(this.url)
        //Wait for the DOM to be rendered
        await page.waitForSelector('#productGrid');
        //Get the link to all products
        let urls = await page.$$eval('article > ul > li', links => {
            links = links.map(el => el.querySelector('h2 > a').href)
            return links;
        }) 
        console.log(urls);

        let prices = await page.$$eval('article > ul > li', prices => {
            prices = prices.map(el => el.querySelector('span[itemprop=price]').textContent)
            return prices;
        }) 
        console.log(prices);

        let imgURLS = await page.$$eval('article > ul > li', urls => {
            urls = urls.map(el => el.querySelector('img').src)
            return urls
        })
        console.log(imgURLS);

        let productTitles = await page.$$eval('article > ul > li', titles => {
            titles = titles.map(el => el.querySelector('h2 > a').textContent)
            return titles
        })
        console.log(productTitles)

        let productSKU = await page.$$eval('article > ul > li', stockStatus => {
            stockStatus = stockStatus.map(el => el.querySelector('p').textContent)
            return stockStatus
        })
        console.log(productSKU)

        let productAvailability = await page.$$eval('article > ul > li', stockStatus => {
            stockStatus = stockStatus.map(el => el.querySelector('.instore.buyingrestriction').textContent)
            return stockStatus
        })
        console.log(productAvailability)

        let productStockStatus = await page.$$eval('article > ul > li', stockStatus => {
            //stockStatus = stockStatus.filter(status => status.querySelector(''))
            stockStatus = stockStatus.map(el => el.querySelector('.stock').textContent);
            return stockStatus
        })
        //console.log(productStockStatus[0].replace('\n',''))

        // let buttonInfo = await page.$$eval('article > ul > li', productButtonInfo => {
        //     productButtonInfo = productButtonInfo.map(el => el.querySelector('input[aria-label="Add SKU#301259 to cart"]'))
        //     return productButtonInfo
        // })
        // console.log(buttonInfo);
    }
}

module.exports = scraperObject;