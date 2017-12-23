/**
 * Created by sahil on 12/21/2017.
 */
function openNav() {
    document.getElementById("sidemenu").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("sidemenu").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

function openframe(file) {
    var doc = document.getElementById("showframe");
    doc.src = file;
    doc.style.width = "75%";
    doc.style.height = "700px"

}


function closeframe() {
    var doc = document.getElementById("showframe");
    doc.src = "vegitable.html";
    doc.style.width = "0";
    doc.style.height = "0"
}