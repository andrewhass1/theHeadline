const firebaseConfig = {
    apiKey: "AIzaSyBYcEOx9UUkmT_Xb6oDZ68y2C8W7_Y7hos",
    authDomain: "theheadline-e09dc.firebaseapp.com",
    databaseURL: "https://theheadline-e09dc.firebaseio.com",
    projectId: "theheadline-e09dc",
    storageBucket: "theheadline-e09dc.appspot.com",
    messagingSenderId: "776776851089",
    appId: "1:776776851089:web:5b8f7d3b54e9e44ce92930",
    measurementId: "G-ZH74YM431H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function register() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    });
}
    firebase.auth().onAuthStateChanged(function(user){
        if(user) {
          location.href = 'HomePage.html'; //After successful login, user will be redirected to home.html
        } else{
            console.log('not logged in');
        }
      });