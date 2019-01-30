var config = {
    apiKey: "AIzaSyDSvQ9uB7u_nsedH9XrJEZ0J0AokSdK_vk",
    authDomain: "jacob-s-click-project.firebaseapp.com",
    databaseURL: "https://jacob-s-click-project.firebaseio.com",
    projectId: "jacob-s-click-project",
    storageBucket: "jacob-s-click-project.appspot.com",
    messagingSenderId: "219576647734"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
});

database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

    // full list of items to the well
    $("#table-body").append("<tr> <th scope = 'row'> " +
        childSnapshot.val().trainName +
        " </th> <td> " + childSnapshot.val().destination +
        " </td> <td> " + childSnapshot.val().frequency +
        " </td> <td> " + (moment().diff(moment(childSnapshot.val().startDate), 'months')) +
        " </td> <td> " + childSnapshot.val().monthlyRate +
        " </td> <td> " + (moment().diff(moment(childSnapshot.val().startDate), 'months') * childSnapshot.val().monthlyRate) +
        " </td> </tr>");

    // Handle the errors 
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

/* $("#submit").on("click", function() {
    console.log("Hello");
}) */