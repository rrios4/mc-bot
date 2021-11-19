const scraperObject = {
    url: 'https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966965+4294815592&myStore=false',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to  ${this.url}...`);
        await page.goto(this.url)
        //Wait for the DOM to be rendered
        await page.waitForSelector('body');
        //Get the link to all products
        let urls = await page.$$eval('article ul > li', links => {
            return links
        }) 
        console.log(urls);
    }
}

module.exports = scraperObject;