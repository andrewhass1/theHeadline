var bio1 = localStorage.getItem('bio');
document.getElementById('bio').innerText = bio1;
var db = firebase.firestore();


function update(){
  var userRef = db.collection("users");
  var bio2 = document.getElementById('bio').value;
  firebase.auth().onAuthStateChanged(function(user){
    if(user) { //After successful login, user will be redirected to home.html
      userRef.where("id", "==", user.email).limit(1)
  .get()
  .then(function(querySnapshot) {

          querySnapshot.forEach(function(doc) {
              userRef.doc(doc.id).update({
                  bio: bio2
              });

          });

  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
    } else{
      location.replace("singInPage.html")
    }
  });
}