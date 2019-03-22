// time sheet code

// Initialize Firebase

 
 var config = {
    apiKey: "AIzaSyCGn5PNcva89JLPpbViC3shzeub11Cu9TQ",
    authDomain: "train-time-hustle.firebaseapp.com",
    databaseURL: "https://train-time-hustle.firebaseio.com",
    projectId: "train-time-hustle",
    storageBucket: "train-time-hustle.appspot.com",
    messagingSenderId: "381614028293"
  };
  firebase.initializeApp(config);



var database = firebase.database();


var trainName = "";
var destination = "";
var nextArrival = "";
var startDate = moment(nextArrival).format("MM DD YYY");
var frequency;
const now = moment().format("MM/DD/YYYY");

//var duration = startDate.toNow(); 

$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    // getting data
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var nextArrival = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // input new values into database



    database.ref().push({
        trainName: trainName,
        destination: destination,
        nextArrival: nextArrival,
        frequency: frequency

    });
     // another way to do this would be to create a var that represents the object of employee data
     
                        //  var newEmp = {
                        //      trainName: trainName,
                        //      destination: destination,
                        //      nextArrival: nextArrival,
                        //      frequency: frequency

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




    var dbtrainName = (childSnapshot.val().trainName);
    var dbdestination = (childSnapshot.val().destination);
    var dbnextArrival = (childSnapshot.val().nextArrival);
    var dbfrequency = (childSnapshot.val().frequency);
    
    var duration = moment().diff(dbnextArrival, "months");
    var totalBilled = duration * dbfrequency;

    var totalBilledCurrency = "$" + Number(totalBilled).toLocaleString('en');


    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().nextArrival);
    console.log(childSnapshot.val().frequency);

    console.log("StartDate = " + startDate);
    console.log("dbnextArrival = " + dbnextArrival);
    console.log("frequency = " + childSnapshot.val().frequency);
    console.log("Duration = " + duration);
    console.log("Now = " + now);
    console.log("Total Billed = " + totalBilled);
    console.log("Total Billed Currency Format = $" + totalBilledCurrency);


        



    // add the data to the table with id= emplData

    $("#trainData").append(
        "<tr><td>" + childSnapshot.val().trainName + 
        "</td><td>" + childSnapshot.val().destination + 
        "</td><td>" + childSnapshot.val().nextArrival + 
        "</td><td>" + duration + 
        "</td><td>" + childSnapshot.val().frequency + "</td></tr>");

// make calculations and put them into variables to use in the table



    
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);


});