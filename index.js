const browserObject = require('./src/browser');
const scraperController = require('./src/controllers/pageController')

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

//Pass the browser instance to the scrape controller
scraperController(browserInstance);

