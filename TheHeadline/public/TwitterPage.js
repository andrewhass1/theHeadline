var db = firebase.firestore();

function update(){
  firebase.auth().onAuthStateChanged(function(user){
    if(user) { //After successful login, user will be redirected to home.html

        var userRef = db.collection("users");

        userRef.where("id", "==", user.uid)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.data().username);
                    userRef.doc(doc.id).update({
                        twitterUN: document.getElementById("inlineFormInputGroupUsername").value
                    });

                    userRef.where("twitterUN", "==", document.getElementById("inlineFormInputGroupUsername").value)
                    .get()
                    .then(function(querySnapshot) {

                        location.replace("ReviewPage.html");


                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    })

                });

            })

            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });



    } else {
      location.replace("HomePage.html");
    }

  });
}
