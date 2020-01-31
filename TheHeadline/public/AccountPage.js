

function signout() {
    console.log('sign out')
    firebase.auth().signOut().then(function() {
        location.href = 'HomePage.html';
    }).catch(function(error) {
        // An error happened.
    });

}


var name, email, photoUrl, uid, emailVerified;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
      document.getElementById('username').innerText = email;
  } else {
    // No user is signed in.
  }
});
