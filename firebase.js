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
filestorage = firebase.storage();

function writeUserData(userId, email, password) {
    firebase.database().ref('users/'+userId).update({
        email: email,
        password:password,
    });
    document.cookie = userId
}



function login() {
    var form= document.forms[0];

    var name =form["uname"].value;
    var password= form["psw"].value;
    var email = form["email"].value;

    writeUserData(name,email,password);
    closeframe();
}

function writevegitables(name,quantity,price,date,image) {
    usernames = document.cookie.split(";");
    username = usernames[0]

    firebase.database().ref('users/'+username+"/products/"+name).update({
        quantity: quantity,
        price:price,
        date:date})

    filestorage.ref('users/'+username+"/products/"+name+"/"+image.name).put(image)
}



function submitveg() {
    var form= document.forms[0];

    var photos = document.getElementById("photo");
    var photo = photos.files[0];
    var name =form["veg"].value;
    var quantity= form["qty"].value;
    var price = form["price"].value;
    var date = form["date"].value;
    writevegitables(name,quantity,price,date,photo);
    closeframe();
}




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
            alert(child.val().quantity)

        });
    });
}


function changetest(names,prices,quantity,dates) {
/*
this is the function used to change the data on the frame of the buyer website
 */
    var name = document.getElementById("name");
    var price = document.getElementById("price");
    var qua = document.getElementById("quantity");
    var date = document.getElementById("date");

    name.innerHTML = names;
    price.innerHTML = prices;
    qua.innerHTML = quantity;
    date.innerHTML = dates;
}

