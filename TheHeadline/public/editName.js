var bio1 = localStorage.getItem('name');
document.getElementById('name').innerText = bio1;
var db = firebase.firestore();
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    location.replace('singInPage.html')
  }
});


function update(){
  var userRef = db.collection("users");
  var name2 = document.getElementById('name').value;
  localStorage.setItem("name", name2);
  firebase.auth().onAuthStateChanged(function(user){
    if(user) { //After successful login, user will be redirected to home.html
      userRef.where("id", "==", user.uid).limit(1)
  .get()
  .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              userRef.doc(doc.id).update({
                  username: name2
              });
              alert('Username Updated!');
              userRef.where("username", "==", name2).limit(1)
              .get()
              .then(function(querySnapshot) {
            
                location.href = 'MyAcoountPage.html';
                      
                      
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