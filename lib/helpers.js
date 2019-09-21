/*
* helpers.js
* Helper functions used to help write the main script
*/

module.exports = {
    //Click on the given selector
    click: async function(page, selector) {
        try {
            await page.waitForSelector(selector);
            await page.click(selector);
        } catch (error) {
            throw new  Error("Unable to click on item: " + selector);
        }
    },

    //Add text to the selector
    typeText: async function(page, text, selector){
        try {
            await page.waitForSelector(selector);
            await page.type(selector, text);
        } catch (error) {
            throw new Error("Unable to type text into selector: " + selector);
        }
    },

    //Load the given url to the page
    loadUrl: async function (page, url) {
        await page.goto(url, {waitUntil: "networkidle0" });
    },

    //Receives the text in a selector
    getText: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            const text = await page.$eval(selector, e => e.innerText);
            return text;
        } catch (error) {
            throw new Error ("Cannot get text from selector: " + selector); 
        }
    },

    //returns the number of instances of the selector
    getCount: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            const count = await page.$$eval(selector, items => items.length);
            return count;
        } catch (error) {
            throw new Error ("Cannot get count of selector: " + selector);
        }
    },

    //Finds the given text in the selector
    waitForText: async function(page, text, selector){
        try {
            await page.waitForSelector(selector);
            await page.waitForFunction((selector, text) =>
                document.querySelector(selector).innerText.includes(text),
                {},
                selector,
                text            
            );
        } catch (error) {
            throw new Error("Text " + text + " is not found for selector " + selector);
        }
    },

    //activates a key used while in the page
    pressKey: async function(page, key) {
        try {
            await page.keyboard.press(key);
        } catch (error) {
            throw new Error("Could not press key: " + key + " on the keyboard");
        }
    },

    //checks to see that a selector is visible
    shouldExist: async function (page, selector) {
        try {
            await page.waitForSelector(selector, {visible: true});
        } catch (error) {
            throw new Error("Selector " + selector + " does not exist.");
        }
    },
}
