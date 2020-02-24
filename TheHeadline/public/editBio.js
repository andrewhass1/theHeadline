var bio1 = localStorage.getItem('bio');
document.getElementById('bio').innerText = bio1;
var db = firebase.firestore();



function update(){
  var userRef = db.collection("users");
  var bio2 = document.getElementById('bio').value;
  localStorage.setItem("bio", bio2);
  firebase.auth().onAuthStateChanged(function(user){
    if(user) { //After successful login, user will be redirected to home.html
      userRef.where("id", "==", user.uid).limit(1)
  .get()
  .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              userRef.doc(doc.id).update({
                  bio: bio2
              });
              alert('Bio Updated!');
              userRef.where("bio", "==", bio2).limit(1)
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