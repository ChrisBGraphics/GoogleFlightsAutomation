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
This holds helper functions that are used in main to make writing code easier and more cleaner.

utils.js
This holds functions that can generate values for testing purposes.

How to build and run:
To build this project, create a folder/directory for where you want this project. Once created, go into the folder.
In the terminal, enter 'npm init' to create a package.json file. follow the steps and enter any information it asks for.
You can just hit enter for most of them if you don't want to add information for package name, version, description, entry
point, test command, git repository, keywords, author, license. At the end, it will ask if the information is okay. Type 'yes'
and press enter.

Next is to install the packages you want to use. For me, I used Puppeteer, Mocha, and Chai. to install the packages, enter the
following in the terminal:

npm i puppeteer mocha chai --save

after installing the packages, you should have in your directory "node_modules", "package-lock.json", and "package.json". You can
insert my .js files to start using them.

In order to run the script, go into the package.json file and next to test:, under script: replace the original value. On Windows, I
use "mocha --timeout=30000 tests". Now when I want to run the code, I got to the terminal and in the prodject directory, I enter
"npm run test". This will run the browser and start the automation

Notes: While I have noticed some issues that could be updated and improved on, I do not have the time to update it right now, I do not have to time at this moment, due to other commitments beyond my control. apologies if my codes appears to be rushed.


