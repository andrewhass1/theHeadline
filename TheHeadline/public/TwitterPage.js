function update(){
  var userRef = db.collection("users");
  var bio2 = document.getElementById('TwitterUN').value;
  firebase.auth().onAuthStateChanged(function(user){
    if(user) { //After successful login, user will be redirected to home.html
      userRef.where("id", "==", user.uid).limit(1)
      .get()
      .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  userRef.doc(doc.id).update({
                      TwitterUN: document.getElementById("inlineFormInputGroupUsername").value
                  });
                  alert('Twitter Saved!');
                  userRef.where("bio", "==", document.getElementById("inlineFormInputGroupUsername").value).limit(1)
                  .get()
                  .then(function(querySnapshot) {

                    location.href = 'ReviewPage.html';


                  })
                  .catch(function(error) {
                      console.log("Error getting documents: ", error);
                  })
              });


      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

    } else{
      location.replace("HomePage.html")
    }

  });
}
