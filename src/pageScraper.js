const scraperObject = {
    url: 'https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966965+4294815592&myStore=false',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to  ${this.url}...`);
        await page.goto(this.url)
    }
}

module.exports = scraperObject;