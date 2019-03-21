// time sheet code

// Initialize Firebase

var config = {
    apiKey: "AIzaSyCLNsc9QlcDepWJZhINZzPZFg2b9fW9MZY",
    authDomain: "gtbc-timesheet.firebaseapp.com",
    databaseURL: "https://gtbc-timesheet.firebaseio.com",
    projectId: "gtbc-timesheet",
    storageBucket: "gtbc-timesheet.appspot.com",
    messagingSenderId: "972378214317"
  };

  firebase.initializeApp(config);



var database = firebase.database();


var trainName = "";
var role = "";
var start = "";
var startDate = moment(start).format("MM DD YYY");
var rate;
const now = moment().format("MM/DD/YYYY");

//var duration = startDate.toNow(); 

$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    // getting data
    var name = $("#name-input").val().trim();
    var role = $("#role-input").val().trim();
    var start = $("#time-input").val().trim();
    var rate = $("#rate-input").val().trim();

    // input new values into database



    database.ref().push({
        name: name,
        role: role,
        start: start,
        rate: rate

    });
     // another way to do this would be to create a var that represents the object of employee data
     
                        //  var newEmp = {
                        //      name: name,
                        //      role: role,
                        //      start: start,
                        //      rate: rate

                        //  };
                        //  database.ref().push(newEmp);
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function (childSnapshot) {

    //  var duration = moment(startDate).subtract(now); // produces NaN
    //  var duration = moment(startDate).fromNow(); // produces Invalid Date
    //  var duration = moment(start).toNow();  // produces Invalid Date
    //  var duration = moment(start).fromNow(); // produces Invalid Date
    //  var duration = moment(start).subtract();  // produces NaN
    //  var duration = startDate - now; // produces NaN
    //  var duration = moment('start').fromNow(true); // produces Invalid Date
    //  var duration = moment(startDate).subtract(); // produces NaN
    //  var duration = moment(startDate).subtract(3/20/2019); // produces NaN
    //  var duration = moment(3/20/2019).subtract(5/6/1987); // produces 0
    //  var duration = moment(5/12/1987).subtract(3/20/2019); //produces 0 
    // var duration = moment().diff("05/06/1987", "months"); // WORKING Thanks Hanna




    var dbName = (childSnapshot.val().name);
    var dbRole = (childSnapshot.val().role);
    var dbStart = (childSnapshot.val().start);
    var dbRate = (childSnapshot.val().rate);
    
    var duration = moment().diff(dbStart, "months");
    var totalBilled = duration * dbRate;

    var totalBilledCurrency = "$" + Number(totalBilled).toLocaleString('en');


    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().start);
    console.log(childSnapshot.val().rate);

    console.log("StartDate = " + startDate);
    console.log("dbStart = " + dbStart);
    console.log("Rate = " + childSnapshot.val().rate);
    console.log("Duration = " + duration);
    console.log("Now = " + now);
    console.log("Total Billed = " + totalBilled);
    console.log("Total Billed Currency Format = $" + totalBilledCurrency);


        



    // add the data to the table with id= emplData

    $("#emplData").append(
        "<tr><td>" + childSnapshot.val().name + 
        "</td><td>" + childSnapshot.val().role + 
        "</td><td>" + childSnapshot.val().start + 
        "</td><td>" + duration + 
        "</td><td>" + childSnapshot.val().rate + 
        "</td><td>" + totalBilledCurrency + "</td></tr>");

// make calculations and put them into variables to use in the table



    
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);


});