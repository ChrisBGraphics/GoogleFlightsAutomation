Created with Puppeteer, with Mocha and Chai. Developed by Chris Borowski through Visual Studio Code
This simulates accessing the Google Flights page to find flights, using the website google.com/flights

main.js:
The main code of the project. This goes through 2 automation scenarios of searching for flights based
on the variables entered. The first scenario tests out a one-way flight, and the second tests a round
trip.

flight-page.js:
This stores all the selector names to be used. This helps makes the main code cleaner and easier to read.

config.js:
This holds the configurations used to set the properties of the page

helpers.js
This holds helper functions that are used in main to mkae writing code easier and more cleaner.

utils.js
This holds functions that can generate valkues for testing purposes.