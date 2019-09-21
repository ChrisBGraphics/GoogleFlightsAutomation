/*
* utils.js
* utility functions that generate data to use for testing. In this case, the functions generate dates in the
* form of yyyy-mm-dd
*/

module.exports = {
    getDateSixMonthsLater: function(){  //Returns the date 6 months from now in the form of yyyy-mm-dd
        let date = new Date();
        date.setMonth(date.getMonth()+6);
        return date.toISOString().split("T")[0];
    },

    getCurrentDate: function(){   //Returns the current date in the form of yyyy-mm-dd
        return new Date().toISOString().split("T")[0];
    },

    getReturningDate: function(){   //Returns the date 6 months and 14 days from now in the form of yyyy-mm-dd. Mainly for testing purposes
        let date = new Date();
        date.setMonth(date.getMonth()+6, date.getDate()+14);
        return date.toISOString().split("T")[0];
    }
}
