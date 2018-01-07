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
    messagingSenderId: "744766186673"
};

firebase.initializeApp(config);
filestorage = firebase.storage();


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

    
    // sorry for this
    var phoneNumber = getPhoneNumberFromUserInput();
    var appVerifier = window.recaptchaVerifier;

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    }); 


window.recaptchaVerifier.render().then(function(widgetId) {
  grecaptcha.reset(widgetId);
}

var code = getCodeFromUserInput();
confirmationResult.confirm(code).then(function (result) {
  // User signed in successfully.
  var user = result.user;
  // ...
}).catch(function (error) {
  // User couldn't sign in (bad verification code?)
  // ...
});

var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
firebase.auth().signInWithCredential(credential);

    //sign_in
    if (pass_re === pass && email && pass) {
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










/* this is for writing data do not mix and match



 */
function writeUserData(name,username,email) {

    console.log(name);
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
        date: date,
        images:image.name
    });

    filestorage.ref('users/' + username + "/products/" + name + "/" + image.name).put(image).then(function () {
        window.parent.location.href = "index.html"});
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


function addtocart(name,price,quantity,userId) {

    var username = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + username + "/cart/" + name).update({
        quantity: quantity,
        price: price,
        fromuser:userId
    });
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
            var snapval = child.val();
            readUserData(child.key)

        });
    });
}


buyerid  =0;
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

            buyerid+=1;
            var values= child.val();
            var storageref = filestorage.ref('users/' + userId + "/products/" + child.key + "/" + values.images);
            changetest(child.key,values.price,values.quantity,values.date,storageref,buyerid,userId);


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

function changetest(names,prices,quantity,dates,images,id,userId) {

    images.getDownloadURL().then(function(url) {

        var page = document.getElementById("main-content");

        var mc = document.createElement("div");
        mc.id=id+"";
        mc.className = "card";


        var image = document.createElement("img");
        var name = document.createElement("LABEL");
        var price = document.createElement("LABEL");
        var qua = document.createElement("LABEL");
        var date = document.createElement("LABEL");
        var btn = document.createElement("button");

        image.src = url;
        name.innerHTML = "name: "+names+"<br>";
        price.innerHTML = "price: "+prices+"<br>";
        qua.innerHTML = "quantity: "+quantity+"<br>";
        date.innerHTML = "date: "+dates+"<br><br>";
        btn.innerText = "add to cart";
        btn.onclick = function() {cartit(names,prices,quantity,userId)  };

        mc.appendChild(image);
        mc.appendChild(name);
        mc.appendChild(price);
        mc.appendChild(qua);
        mc.appendChild(date);
        mc.appendChild(btn);
        page.appendChild(mc);

});
}

function cartit(name,price,quantity,userId){
    console.log(name,price,quantity,userId);
    addtocart(name,price,quantity,userId);
}



/*
ths is the function to reshow the cart
 */
function addcartdetails() {
    var page = document.getElementById("cart-content");
    var btn = document.createElement("button");
    btn.innerText = "show cart";
    btn.onclick = function() {getusercart()};
    page.appendChild(btn);



}


function getusercart() {
    username = firebase.auth().currentUser.uid;
    console.log(username);

    var cartid = 0;
    var cartref = firebase.database().ref('users/' + username + "/cart/");
    cartref.once("value").then(function (snapshot) {
        snapshot.forEach(function (child) {
            var values = child.val();
            cartid+=1;
            showusercart(child.key,values.price,values.quantity,values.fromuser,cartid)

        })
    })
}


function showusercart(prodname,prices,quantity,imguser,id) {

    var filenameref = firebase.database().ref('users/' + imguser + "/products/" + prodname);
    filenameref.once("value").then(function (snapshot) {
        var val = snapshot.val();

        var storageref = filestorage.ref('users/' + imguser + "/products/" + prodname + "/" + val.images);
        storageref.getDownloadURL().then(function(url) {

            var page = document.getElementById("cart-content");

            var mc = document.createElement("div");
            mc.id=id+"";
            mc.className = "card";


            var image = document.createElement("img");
            var name = document.createElement("LABEL");
            var price = document.createElement("LABEL");
            var qua = document.createElement("LABEL");
            var total = document.createElement("LABEL");

            image.src = url;
            name.innerHTML = "name: "+prodname+"<br>";
            price.innerHTML = "price: "+prices+"<br>";
            qua.innerHTML = "quantity: "+quantity+"<br>";
            total.innerHTML = "total: "+parseFloat(prices)*parseFloat(quantity)+"<br><br>";

            mc.appendChild(image);
            mc.appendChild(name);
            mc.appendChild(price);
            mc.appendChild(qua);
            mc.appendChild(total);
            page.appendChild(mc);

        });
    })
}
