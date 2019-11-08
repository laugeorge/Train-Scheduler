// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAIrs8bpw6Ehnjr84TY9dceCzX6lZ8vkcY",
  authDomain: "train-schedule-a19b8.firebaseapp.com",
  databaseURL: "https://train-schedule-a19b8.firebaseio.com",
  projectId: "train-schedule-a19b8",
  storageBucket: "train-schedule-a19b8.appspot.com",
  messagingSenderId: "366629594775",
  appId: "1:366629594775:web:087c6d878fdfbf17"
};
  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding new train schedule
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var empTrainName = $("#train-name-input").val().trim();
    var empRole = $("#destination-input").val().trim();
    var empStart = moment($("#trainTime-input").val().trim(), "X").format("HH:mm");
    var empRate = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      trainName: empTrainName,
      destination: empRole,
      trainTime: empStart,
      frequency: empRate
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency);
  
    alert("Train schedule successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#trainTime-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var empTrainName = childSnapshot.val().trainName;
    var empRole = childSnapshot.val().destination;
    var empStart = childSnapshot.val().trainTime;
    var empRate = childSnapshot.val().frequency;
  
    // Train Info
    console.log(empTrainName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);
  

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Prettify the train start
    var empStartPretty = moment.unix(empStart).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empAway = moment().diff(moment(empStart, "X"), "months");
    console.log("Minutes Till Train: " + empAway);
  
    // Calculate the total billed rate
    //var empBilled = empMonths * empRate;
    //console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(empTrainName),
      $("<td>").text(empRole),
      $("<td>").text(empStartPretty),
      $("<td>").text(empAway),
      $("<td>").text(empRate),
      //$("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  