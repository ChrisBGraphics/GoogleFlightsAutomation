module.exports = {
    getDateSixMonthsLater: function(){  //Returns the date in the form of yyyy-mm-dd
        let date = new Date();
        date.setMonth(date.getMonth()+6);
        return date.toISOString().split("T")[0];
    },

    getCurrentDate: function(){   //Returns the date in the form of yyyy-mm-dd
        return new Date().toISOString().split("T")[0];
    },

    getReturningDate: function(){   //for testing, just making this return the date in 14 days
        let date = new Date();
        date.setMonth(date.getMonth()+6, date.getDate()+14);
        return date.toISOString().split("T")[0];
    }
}