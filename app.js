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
var firstTrain = "";
var nextArrival = "";
// var startDate = moment(nextArrival).format("MM DD YYY");
var frequency = "";
const now = moment().format("HH:mm:ss");

//othet vars

var firstTrain = "";
var frequency = "";
var nextTrain = "";
var nextTrainFormatted = "";
var minutesAway = "";
var firstTimeConverted = "";
var currentTime = "";
var diffTime = "";
var tRemainder = "";
var minutesTillTrain = "";
var keyHolder = "";
var getKey = "";

//var duration = startDate.toNow(); 

$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    // getting data
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm");  //$("#firstTrain-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // clearing input fields (not working)

    // $("#trainName-input").text("");
    // $("#destination-input").html("");
    // $("#firstTrain-input").html("");  //$("#firstTrain-input").val().trim();
    // $("#frequency-input").html("");

    // new calc idea 

    firstTrain = $('#firstTrain-input').val().trim();
    frequency = $('#frequency-input').val().trim();
    firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    currentTime = moment();
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    tRemainder = diffTime % frequency;
    minutesTillTrain = frequency - tRemainder;
    nextTrain = moment().add(minutesTillTrain, "minutes");
    nextTrainFormatted = moment(nextTrain).format("hh:mm");

    console.log("new calcs: nextTrainFormatted = " + nextTrainFormatted);
    console.log("new calcs: minsTillTrain = " + minutesTillTrain);



    // input new values into database

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextTrainFormatted: nextTrainFormatted,
        minutesTillTrain: minutesTillTrain

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



    var dbtrainName = (childSnapshot.val().trainName);
    var dbdestination = (childSnapshot.val().destination);
    var dbfirstTrain = (childSnapshot.val().firstTrain);
    var dbfrequency = (childSnapshot.val().frequency);
    var dbnextTrain = (childSnapshot.val().nextTrainFormatted);
    var dbminTillTrain = (childSnapshot.val().minutesTillTrain);



    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().nextTrainFormatted);
    console.log(childSnapshot.val().minutesTillTrain);



    // add the data to the table with id=trainData

    $("#trainData").append(
        "<tr><td>" + childSnapshot.val().trainName +
        "</td><td>" + childSnapshot.val().destination +
        "</td><td>" + childSnapshot.val().frequency +
        "</td><td>" + childSnapshot.val().nextTrainFormatted +
        "</td><td>" + childSnapshot.val().minutesTillTrain + "</td></tr>");



    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);


});