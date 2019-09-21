const puppeteer = require('puppeteer');
const expect = require('chai').expect;

//Helper functions
const config = require("..\\lib\\config");
const click = require("..\\lib\\helpers").click;
const typeText = require("..\\lib\\helpers").typeText;
const loadUrl = require("..\\lib\\helpers").loadUrl;
const waitForText = require("..\\lib\\helpers").waitForText;
const pressKey = require("..\\lib\\helpers").pressKey;
const shouldExist = require("..\\lib\\helpers").shouldExist;
const getText = require("..\\lib\\helpers").getText;
const getCount = require("..\\lib\\helpers").getCount;

//utilities
const utils = require("..\\lib\\utils");

//Pages
const flightPage = require("..\\page-objects\\flight-page");


describe("Google flight automation", () => {
    let browser;
    let page;

    before(async function() {
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devTools: config.isDevtools,
            timeout: config.launchTimeout
        })
        page = await browser.newPage();
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
    })

    after(async function() {
        await browser.close();
    })

    describe("Premium Flight, one-way with two passengers from YYZ to YWG", () => {
        it("Load the webpage", async () => {
            await loadUrl(page, config.baseUrl);
            await page.waitForSelector(flightPage.FLIGHTS_BODY);

            const url = await page.url();
            const title = await page.title();

            expect(url).to.contain("google.com/flights");
            expect(title).to.contains("Flights");
        })

        
        it("Enter Original City", async () => {
            await click(page, flightPage.ORIGINALCITY);
            await typeText(page, "YYZ", flightPage.ORIGINALCITY_INPUT);
            await page.waitFor(500);    //unsure why, but without this, the input won't get added
            await pressKey(page, "Enter");

            await waitForText(page, "YYZ", flightPage.ORIGINALCITY_IATACODE);
        })

        it("Enter Destination", async () => {
            await page.waitFor(500);    
            await click(page, flightPage.DESTINATIONCITY);
            await typeText(page, "YWG", flightPage.DESTINATIONCITY_INPUT);
            await page.waitFor(500);    
            await pressKey(page, "Enter");

            await waitForText(page, "YWG", flightPage.DESTINATIONCITY_IATACODE);
        })

        it("Select path of flight", async () => {
            await page.waitFor(500);
            await click(page, flightPage.FLIGHTPATHBOX);
            await shouldExist(page, flightPage.FLIGHTPATH_MENU);
            await shouldExist(page, flightPage.FLIGHTPATH_ONE);
            await page.waitFor(500);
            await click(page, flightPage.FLIGHTPATH_ONE);

            await waitForText(page, "One-way", flightPage.FLIGHTPATHBOX);
        })

        it("Select number of passengers", async () => {
            await click(page, flightPage.PASSENGERBOX);
            await shouldExist(page, flightPage.PASSENGERMENU);

            //add one more adult
            await page.waitFor(500);
            await click(page, flightPage.PASS_ADULT_INC);
            await click(page, flightPage.PASSENGER_DONE);

            await waitForText(page, "2 passengers", flightPage.PASSENGERBOX);
        })

        it("Select Coach class", async () => {
            await page.waitFor(500);
            await click(page, flightPage.SEATINGBOX);
            await shouldExist(page, flightPage.SEATINGMENU);

            await page.waitFor(500);
            await click(page, flightPage.SEAT_PREM_ECONOMY);

            await waitForText(page, "Premium Economy", flightPage.SEATINGBOX);

        })

        it("Set departure date for one way", async () => {
            await click (page, flightPage.CALENDER_DEPARTDATE_ONEWAY);
            await shouldExist(page, flightPage.CALENDER_DIALOG);

            await page.waitFor(500);
            let depart = utils.getDateSixMonthsLater();
            await typeText(page, depart, flightPage.CALENDER_DEPARTDATE_ONEWAY_INPUT);
            await pressKey(page, "Enter");

            await click(page, flightPage.CALENDER_DONE);
            await page.waitFor(3000);
        })

        it("Results of flights", async () => {
            await shouldExist (page, flightPage.RESULTS_BODY);

            await click(page, flightPage.RESULTS_DISPLAY_MORE);
            await shouldExist(page, flightPage.RESULTS_HIDE_MORE);
            let result = await getCount(page, flightPage.RESULTS_FLIGHTS);
            let bestFlight = await getText(page, flightPage.RESULTS_BEST_ROUTE);

            console.log("There are " + result + " flights, The best flight suggested is:\n" + bestFlight);

            process.on('unhandledRejection', error => {
                // Will print "unhandledRejection err is not defined"
                console.log('unhandledRejection', error.message);
                });

        })
    })


    describe("First Class flight of 2 adults and 2 children from Calgary to Kahului, Maui", () => {
        it("Load website", async () => {
            await loadUrl(page, config.baseUrl);
            await page.waitForSelector(flightPage.FLIGHTS_BODY);

            const url = await page.url();
            const title = await page.title();

            expect(url).to.contain("google.com/flights");
            expect(title).to.contains("Flights");
        })

        
        it("Enter Original City", async () => {
            await click(page, flightPage.ORIGINALCITY);
            await typeText(page, "YYC", flightPage.ORIGINALCITY_INPUT);
            await page.waitFor(500);    //unsure why, but without this, the input won't get added
            await pressKey(page, "Enter");

            await waitForText(page, "YYC", flightPage.ORIGINALCITY_IATACODE);
        })

        it("Enter Destination", async () => {
            await page.waitFor(500);    
            await click(page, flightPage.DESTINATIONCITY);
            await typeText(page, "OGG", flightPage.DESTINATIONCITY_INPUT);
            await page.waitFor(500);    
            await pressKey(page, "Enter");

            await waitForText(page, "OGG", flightPage.DESTINATIONCITY_IATACODE);
        })

        it("Select path of flight", async () => {
            await page.waitFor(500);
            //await click(page, flightPage.FLIGHTPATHBOX);
            //await shouldExist(page, flightPage.FLIGHTPATH_MENU);
            //await shouldExist(page, flightPage.FLIGHTPATH_ROUND);
            //await page.waitFor(500);
            //await click(page, flightPage.FLIGHTPATH_ROUND);

            await waitForText(page, "Round trip", flightPage.FLIGHTPATHBOX);
        })

        it("Select number of passengers", async () => {
            await click(page, flightPage.PASSENGERBOX);
            await shouldExist(page, flightPage.PASSENGERMENU);

            //add one more adult
            await page.waitFor(500);
            await click(page, flightPage.PASS_ADULT_INC);
            await click(page, flightPage.PASS_CHILD_INC);
            await click(page, flightPage.PASS_CHILD_INC);
            await click(page, flightPage.PASSENGER_DONE);

            await waitForText(page, "4 passengers", flightPage.PASSENGERBOX);
        })

        it("Select First class", async () => {
            await page.waitFor(500);
            await click(page, flightPage.SEATINGBOX);
            await shouldExist(page, flightPage.SEATINGMENU);

            await page.waitFor(500);
            await click(page, flightPage.SEAT_FIRSTCLASS);

            await waitForText(page, "First Class", flightPage.SEATINGBOX);

        })

        it("Set departure date for one way", async () => {
            await click (page, flightPage.CALENDER_DEPARTDATE);
            await shouldExist(page, flightPage.CALENDER_DIALOG);

            await page.waitFor(500);
            let depart = utils.getDateSixMonthsLater();
            let returning = utils.getReturningDate();
            await typeText(page, depart, flightPage.CALENDER_DEPARTDATE_INPUT);
            await pressKey(page, "Tab");

            //await click(page.flightPage.CALENDER_RETURNDATE_INPUT);
            await typeText(page, returning, flightPage.CALENDER_RETURNDATE_INPUT);
            await pressKey(page, "Enter");
            await click(page, flightPage.CALENDER_DONE);
            await page.waitFor(3000);
        })

        it("Results of flights", async () => {
            await shouldExist (page, flightPage.RESULTS_BODY);

            await click(page, flightPage.RESULTS_DISPLAY_MORE);
            await shouldExist(page, flightPage.RESULTS_HIDE_MORE);
            let result = await getCount(page, flightPage.RESULTS_FLIGHTS);
            let bestFlight = await getText(page, flightPage.RESULTS_BEST_ROUTE);

            console.log("There are " + result + " departing flights, The best flight suggested is:\n" + bestFlight);


            await click(page, flightPage.RESULTS_BEST);
            await shouldExist(page, flightPage.RESULTS_HIDE_MORE);
            await page.waitFor(5000);
            let resultReturn = await getCount(page, flightPage.RESULTS_FLIGHTS);
            let bestFlightReturn = await getText(page, flightPage.RESULTS_BESTRETURN_ROUTE);

            console.log("There are " + resultReturn + " returning flights, The best flight suggested is:\n" + bestFlightReturn);

            process.on('unhandledRejection', error => {
                // Will print "unhandledRejection err is not defined"
                console.log('unhandledRejection', error.message);
                });

        }) 
    })
})