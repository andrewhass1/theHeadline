
function login() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
    });

    firebase.auth().onAuthStateChanged(function(user){
      if(user) {
        location.href = 'HomePage.html'; //After successful login, user will be redirected to home.html
      } else{

      }
    });
}

function forgot() {
  if(document.getElementById("email").value != '')
{
  var email = document.getElementById("email").value;
  firebase.auth().sendPasswordResetEmail(email);
    }
}
