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
        //setup the broweser with certain configurations
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
            
            //load the page, and check to see if it has loaded
            await loadUrl(page, config.baseUrl);
            await page.waitForSelector(flightPage.FLIGHTS_BODY);

            const url = await page.url();
            const title = await page.title();
            
            //Checks the URL and title to see if it matches the website
            expect(url).to.contain("google.com/flights");
            expect(title).to.contains("Flights");
        })

        
        it("Enter Original City", async () => {
            //enter the name or the IATA code of the starting city
            await click(page, flightPage.ORIGINALCITY);
            await typeText(page, "YYZ", flightPage.ORIGINALCITY_INPUT);
            await page.waitFor(500);    //unsure why, but without this, the input won't get added
            await pressKey(page, "Enter");

            await waitForText(page, "YYZ", flightPage.ORIGINALCITY_IATACODE);
        })

        it("Enter Destination", async () => {
            
            //enter the name or the IATA code of the ending city
            await page.waitFor(500);    
            await click(page, flightPage.DESTINATIONCITY);
            await typeText(page, "YWG", flightPage.DESTINATIONCITY_INPUT);
            await page.waitFor(500);    
            await pressKey(page, "Enter");

            await waitForText(page, "YWG", flightPage.DESTINATIONCITY_IATACODE);
        })

        it("Select path of flight", async () => {
            await page.waitFor(500);
            //clicks on the dropbox for the type of flights and selects One way
            await click(page, flightPage.FLIGHTPATHBOX);
            await shouldExist(page, flightPage.FLIGHTPATH_MENU);
            await shouldExist(page, flightPage.FLIGHTPATH_ONE);
            await page.waitFor(500);
            await click(page, flightPage.FLIGHTPATH_ONE);

            await waitForText(page, "One-way", flightPage.FLIGHTPATHBOX);
        })

        it("Select number of passengers", async () => {
            //opens the Passenger dropbox and checks to see if the menu is visible
            await click(page, flightPage.PASSENGERBOX);
            await shouldExist(page, flightPage.PASSENGERMENU);

            //add one more adult
            await page.waitFor(500);
            await click(page, flightPage.PASS_ADULT_INC);
            await click(page, flightPage.PASSENGER_DONE);

            //Text in the dropbox will be updated
            await waitForText(page, "2 passengers", flightPage.PASSENGERBOX);
        })

        it("Select Coach class", async () => {
            await page.waitFor(500);
            //opens the seating dropbox and checks to see if the menu is visible
            await click(page, flightPage.SEATINGBOX);
            await shouldExist(page, flightPage.SEATINGMENU);
            //Premium Economy will be selected
            await page.waitFor(500);
            await click(page, flightPage.SEAT_PREM_ECONOMY);

            await waitForText(page, "Premium Economy", flightPage.SEATINGBOX);

        })

        it("Set departure date for one way", async () => {
            //opens the Calender dialog
            await click (page, flightPage.CALENDER_DEPARTDATE_ONEWAY);
            await shouldExist(page, flightPage.CALENDER_DIALOG);

            await page.waitFor(500);
            //For this, the value being created is the date 6 months from now in the form yyyy-mm-dd
            let depart = utils.getDateSixMonthsLater();
            //adds the date to the input block
            await typeText(page, depart, flightPage.CALENDER_DEPARTDATE_ONEWAY_INPUT);
            await pressKey(page, "Enter");

            //click done to close the dialog. Once cloded, the list of flights will load
            await click(page, flightPage.CALENDER_DONE);
            await page.waitFor(3000);
        })

        it("Results of flights", async () => {
            
            //check to see if the list has loaded
            await shouldExist (page, flightPage.RESULTS_BODY);
            
            //clicks on the button to expand to list of results to display all the flights
            await click(page, flightPage.RESULTS_DISPLAY_MORE);
            await shouldExist(page, flightPage.RESULTS_HIDE_MORE);
            //grabs the number of flights, and the information of the best flight path
            let result = await getCount(page, flightPage.RESULTS_FLIGHTS);
            let bestFlight = await getText(page, flightPage.RESULTS_BEST_ROUTE);
            //print out the results in the console
            console.log("There are " + result + " flights, The best flight suggested is:\n" + bestFlight);
            //error handing testing
            process.on('unhandledRejection', error => {
                // Will print "unhandledRejection err is not defined"
                console.log('unhandledRejection', error.message);
                });

        })
    })


    describe("First Class flight of 2 adults and 2 children from Calgary to Kahului, Maui", () => {
        it("Load website", async () => {
            //reload the page
            await loadUrl(page, config.baseUrl);
            await page.waitForSelector(flightPage.FLIGHTS_BODY);

            const url = await page.url();
            const title = await page.title();
            //Checks the URL and title to see if it matches the website
            expect(url).to.contain("google.com/flights");
            expect(title).to.contains("Flights");
        })

        
        it("Enter Original City", async () => {
            //enter the name or the IATA code of the starting city
            await click(page, flightPage.ORIGINALCITY);
            await typeText(page, "YYC", flightPage.ORIGINALCITY_INPUT);
            await page.waitFor(500);    //unsure why, but without this, the input won't get added
            await pressKey(page, "Enter");

            await waitForText(page, "YYC", flightPage.ORIGINALCITY_IATACODE);
        })

        it("Enter Destination", async () => {
            //enter the name or the IATA code of the ending city
            await page.waitFor(500);    
            await click(page, flightPage.DESTINATIONCITY);
            await typeText(page, "OGG", flightPage.DESTINATIONCITY_INPUT);
            await page.waitFor(500);    
            await pressKey(page, "Enter");

            await waitForText(page, "OGG", flightPage.DESTINATIONCITY_IATACODE);
        })

        it("Select path of flight", async () => {
            await page.waitFor(500);

            //since the default selected path is Round trip, we are just checking to see if it's still says round trip
            await waitForText(page, "Round trip", flightPage.FLIGHTPATHBOX);
        })

        it("Select number of passengers", async () => {
            await click(page, flightPage.PASSENGERBOX);
            await shouldExist(page, flightPage.PASSENGERMENU);

            //addding one adult and two children
            await page.waitFor(500);
            await click(page, flightPage.PASS_ADULT_INC);
            await click(page, flightPage.PASS_CHILD_INC);
            await click(page, flightPage.PASS_CHILD_INC);
            await click(page, flightPage.PASSENGER_DONE);

            await waitForText(page, "4 passengers", flightPage.PASSENGERBOX);
        })

        it("Select First class", async () => {
            await page.waitFor(500);
            //opens the seating dropbox and checks to see if the menu is visible
            await click(page, flightPage.SEATINGBOX);
            await shouldExist(page, flightPage.SEATINGMENU);
            //Selecting First Class for the seatings
            await page.waitFor(500);
            await click(page, flightPage.SEAT_FIRSTCLASS);

            await waitForText(page, "First Class", flightPage.SEATINGBOX);

        })

        it("Set departure date for one way", async () => {
            //opens the Calender dialog
            await click (page, flightPage.CALENDER_DEPARTDATE);
            await shouldExist(page, flightPage.CALENDER_DIALOG);
            
            await page.waitFor(500);
            //For this, the value being created is the date 6 months from now in the form yyyy-mm-dd, and the returnig date
            //is 14 days after the initial depart date.
            let depart = utils.getDateSixMonthsLater();
            let returning = utils.getReturningDate();
            await typeText(page, depart, flightPage.CALENDER_DEPARTDATE_INPUT);
            //I used the tab key to switch to the next input, as selecting the other input was causing issues
            await pressKey(page, "Tab");
            
            //await click(page.flightPage.CALENDER_RETURNDATE_INPUT);
            await typeText(page, returning, flightPage.CALENDER_RETURNDATE_INPUT);
            await pressKey(page, "Enter");
            await click(page, flightPage.CALENDER_DONE);
            await page.waitFor(3000);
        })

        it("Results of flights", async () => {
            //the flight results should be loaded
            await shouldExist (page, flightPage.RESULTS_BODY);
            //clicks on the button to expand to list of results to display all the flights
            await click(page, flightPage.RESULTS_DISPLAY_MORE);
            await shouldExist(page, flightPage.RESULTS_HIDE_MORE);
            //grabs the number of flights, and the information of the best flight path
            let result = await getCount(page, flightPage.RESULTS_FLIGHTS);
            let bestFlight = await getText(page, flightPage.RESULTS_BEST_ROUTE);
            //print out the results in the console
            console.log("There are " + result + " departing flights, The best flight suggested is:\n" + bestFlight);

            //click on the initial flights to access the returning flights
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
