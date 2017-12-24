/**
 * Created by sahil on 12/21/2017.
 */

/* please follow these rule :
    space between function definition and function heading:1
    space between blocks :2
 */
// inintalize the firebase

var config = {
    apiKey: "AIzaSyDfbAuLxfhUnOePgElBTgCOx0mMNZ60UbY",
    authDomain: "vegitadel.firebaseapp.com",
    databaseURL: "https://vegitadel.firebaseio.com",
    projectId: "vegitadel",
    storageBucket: "vegitadel.appspot.com",
    messagingSenderId: "744766186673",
};

firebase.initializeApp(config);


/*
this is for login stuff most important do not add to unless you are suhail
touch and it will break
 */


function register() {

    const txtemail = document.getElementById('email');
    const txtpasswd =document.getElementById('psw');
    const txtpasswd_re = document.getElementById('pswr');
    const email = txtemail.value;
    const pass = txtpasswd.value;
    const pass_re = txtpasswd_re.value;


    //sign_in
    if (pass_re === pass && email && pass != "") {
        firebase.auth().createUserWithEmailAndPassword(email, pass).then(function () {
            adduser()
        }).catch(function (error) {
            var errorcode = error.code;
            var errormessage = error.message;
            console.log(errormessage);
        });

    }


    else {
        console.log("Please fill the form properly");
    }
}



function loginto() {

    const usernam = document.getElementById('uname').value;
    const email = document.getElementById('em').value;
    const password = document.getElementById('psw').value;
    //log_in
    console.log(email + " " + password);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
    });
}


function signout() {

    firebase.auth().signOut().then(function () {

        console.log("user signed out");
    }).catch(function (error) {
        console.log("some error occured during sign out");

    });
}


firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user.email + " is logged In");

    }
    else {
        // User is signed out.
        console.log("User is  logged out ");
    }

});








/* this is for writing data do not mix and match



 */
function writeUserData(name,username,email) {

    console.log(name)
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/'+userId).update({
        email: email,
        name:name,
        username:username
    }).then(function () {
        window.parent.location.href = "index.html"
    });
}



function adduser() {


    var name =document.getElementById('name').value;
    var uname= document.getElementById('uname').value;
    var mob = document.getElementById('mob').value;

    writeUserData(name,uname,mob);

}


function writevegitables(name, quantity, price, date, image) {

    username = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + username + "/products/" + name).update({
        quantity: quantity,
        price: price,
        date: date
    });

    filestorage.ref('users/' + username + "/products/" + name + "/" + image.name).put(image)
}


function submitveg() {

    var form = document.forms[0];

    var photos = document.getElementById("photo");
    var photo = photos.files[0];
    var name = form["veg"].value;
    var quantity = form["qty"].value;
    var price = form["price"].value;
    var date = form["date"].value;
    writevegitables(name, quantity, price, date, photo);

}


/*
this is for reading data , do not mx and match
 */
/* read functions go here



--- the exclusion zone
 read functions below
 do not mix and match
 i repeat do not-----

 */

/*
the read functions are multithreaded if you want to do anything
you have to do things inside the snapshot or the child function
 */

function readUsernames() {
    var rootref = firebase.database().ref();
    var userref = rootref.child("users");
    userref.once("value",function(snapshot){
        /*
        do things for entire user set
         */


        /*
         this function iterates over the entire user base for each user
         */
        snapshot.forEach(function(child) {
            /*
             do things for each individual users
             */
            readUserData(child.key)

        });
    });
}


function readUserData(userId) {

    var prodref = firebase.database().ref('/users/'+userId);
    var itemref = prodref.child("products");
    itemref.once('value').then(function(snapshot) {
        /*
         do things for entire product base inside a user
         */

        /*
        this function iterates over the enter product base for each product
         */
        snapshot.forEach(function (child) {
            /*
             do things for a single product base inside a user
             */
            var values= child.val();
            changetest(child.key,values.price,values.quantity,values.date);


        });
    });
}

/*
function changetest(names,prices,quantity,dates) {
/*
this is the function used to change the data on the frame of the buyer website
 */
/*    var name = document.getElementById("name");
    var price = document.getElementById("price");
    var qua = document.getElementById("quantity");
    var date = document.getElementById("date");

    name.innerHTML = names;
    price.innerHTML = prices;
    qua.innerHTML = quantity;
    date.innerHTML = dates;
}
*/

function changetest(names,prices,quantity,dates) {
    var mc = document.getElementById("main-content");
    var name = document.createElement("LABEL");
    var price = document.createElement("LABEL");
    var qua = document.createElement("LABEL");
    var date = document.createElement("LABEL");

    name.innerHTML = "name: "+names+"<br>";
    price.innerHTML = "price: "+prices+"<br>";
    qua.innerHTML = "quantity: "+quantity+"<br>";
    date.innerHTML = "date: "+dates+"<br><br>";

    mc.appendChild(name);
    mc.appendChild(price);
    mc.appendChild(qua);
    mc.appendChild(date);

}
