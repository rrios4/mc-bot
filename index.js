const browserObject = require('./src/browser');
const scraperController = require('./src/controllers/pageController')

// //Start the browser and create a browser instance
// let browserInstance = browserObject.startBrowser();

// //Pass the browser instance to the scrape controller
// scraperController(browserInstance);

//Timer function to scrape web page under a certain time interval
function intervalFunc(){
    //Start the browser and create a browser instance
    let browserInstance = browserObject.startBrowser();

    //Pass the browser instance to the scrape controller
    scraperController(browserInstance);
}

//Infinite loop of 30 second interval
setInterval(intervalFunc,30000)