function register() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email.length < 4) {
        alert('Please enter a valid email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password longer than 4 character.');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    });

    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            var loadingCover = document.getElementById("whiteout");
            loadingCover.style.display = "flex";
            var db = firebase.firestore();
            var usersName = document.getElementById('name').value;
            db.collection("users").add({
                username: usersName,
                id: user.uid,
                bio: "I am new to headline and want to share my beliefs, stories, and ideas.",
                twitterUN: "Handle"

            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                location.href = 'HomePage.html';

            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

        } else{
            console.log('not logged in');
        }
      });
}
