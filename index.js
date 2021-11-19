const puppteer = require('puppeteer');
const cors = require('cors')({origin: true});
const cheerio = require('cheerio');
const getUrls = require('get-urls');
const fetch = require('node-fetch');

puppteer.launch({ headless: true, args: ['--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] })
.then(async browser => {
    const page = await browser.newPage();
    await page.goto("https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966965+4294815592&myStore=false")
    // await page.screenshot({ path: 'example.png' });
    // await page.pdf({ path: 'example.pdf', format: 'a4' });
    await page.waitForSelector('body');

    let listItems = await page.evaluate(() => {

    });

    console.log(listItems)
    await browser.close();
})
.catch((error) => {
    console.error(error.message);
})