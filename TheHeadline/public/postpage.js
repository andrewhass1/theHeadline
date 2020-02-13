function publish() {
    if(document.getElementById("title").value == '' || document.getElementById("content").value == '')
    {
        var alert = document.getElementById("theAlert");
        alert.style.display = "block";
    }
    else
    {
        var db = firebase.firestore();
        var theTitle = document.getElementById('title').value;
        var theContent = document.getElementById('content').value;
        localStorage.setItem("title", theTitle);
        localStorage.setItem("content", theContent);
        location.href = 'PayPalPage.html';
    }

}
