const axios = require('axios')
const pageScraper = require('../pageScraper');
const { DateTime } = require('luxon');
require('dotenv').config()

async function scrapeAll(browserInstance) {
    let browser;
    let discordWebhookURL = process.env.DISCORD_WEBHOOK_URL
    let date = DateTime.now().setZone("America/Chicago")
    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms))
    try{
        browser = await browserInstance;
        let products = await pageScraper.scraper(browser);

        for(i=0;i < products.length; i++){
            if(products[i].stock === 'SOLD OUT at Houston Store'){
                console.log(`${date.year}-${date.month}-${date.day}T${date.hour}:${date.minute}:${date.second}.${date.millisecond}Z`,'OUT OF STOCK!!',`${products[i].title}`)
                
            } else {
                console.log('IN STOCK!!',`${products[i].title}`)
                let discordWebhookRequest = await axios.post(discordWebhookURL,{
                    "type": 1,
                    "id": "915333342663176242",
                    "name": "Microcenter-Bot",
                    "avatar": "453d59015f6cf10fd9e49efc8f95f88c",
                    "channel_id": "914248773805420574",
                    "guild_id": "191414835588759552",
                    "application_id": null,
                    "token": "a0NoKND2VM2PTzEd2RSc6T8TufNb9IzIwUV6FzKlU4t7gYQu1Ec0jalvrbYD89R9tJuj",
                      "embeds": [{
                        "title": "IN STOCK",
                        "url": products[i].url,
                        "image": {
                            "url": products[i].imgURL
                        },
                        "footer": {
                            "text": `${date.year}-${date.month}-${date.day} ${date.hour}:${date.minute}:${date.second}`,
                            "icon_url": "https://icons.iconarchive.com/icons/flat-icons.com/flat/512/Clock-icon.png"
                        },
                        "fields": [{
                            "name": "Title",
                            "value": products[i].title
                        },
                        {
                            "name": "URL",
                            "value": products[i].productURL
                        },
                        {
                            "name": "SKU",
                            "value": products[i].sku,
                            "inline": true
                        },
                        {
                            "name": "Price",
                            "value": products[i].price,
                            "inline": true
                        },
                        {
                            "name": "Availability",
                            "value": products[i].availability,
                            "inline": true
                        },
                        {
                            "name": "Stock Status",
                            "value": products[i].stock,
                            "inline": true
                        }]
                      }]
            })
            .then((res) => {

            })
            .catch(err => {
                console.log(err.message)
            })
            }
            await timer(300);
        }
        browser.close()
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err)
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)