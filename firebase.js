/**
 * Created by sahil on 12/21/2017.
 */
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDfbAuLxfhUnOePgElBTgCOx0mMNZ60UbY",
    authDomain: "vegitadel.firebaseapp.com",
    databaseURL: "https://vegitadel.firebaseio.com",
    projectId: "vegitadel",
    storageBucket: "vegitadel.appspot.com",
    messagingSenderId: "744766186673"
};
firebase.initializeApp(config);

function writeUserData(userId, email, password) {
    firebase.database().ref('users/'+userId).update({
        email: email,
        password:password,
        products:"na"
    });
    document.cookie = userId
}


read_data = 0
function readUserData(userId) {
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        username = (snapshot.val() && snapshot.val().email) || 'Anonymous';
        var doc = document.getElementById("sahil");
        doc.innerHTML = username;
        read_data = 1

    });
}

function login() {
    var form= document.forms[0];

    var name =form["uname"].value;
    var password= form["psw"].value;
    var email = form["email"].value;

    writeUserData(name,email,password);
    closeframe();
}

function writevegitables(name,quantity,price,date) {
    usernames = document.cookie.split(";");
    username = usernames[0]

    firebase.database().ref('users/'+username+"/products/"+name).update({
        quantity: quantity,
        price:price,
        date:date})

}

function submitveg() {
    var form= document.forms[0];

    var name =form["veg"].value;
    var quantity= form["qty"].value;
    var price = form["price"].value;
    var date = form["date"].value;
    writevegitables(name,quantity,price,date)
    closeframe();
}