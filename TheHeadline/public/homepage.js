
function signout(){
    firebase.auth().signOut().then(function() {
        location.href = 'HomePage.html';
    }).catch(function(error) {
      // An error happened.
    });
  }
var db = firebase.firestore();
var postRef = db.collection("posts");
var stDocRef = postRef.where("status", "==", "NOTPOSTED").orderBy("time", "asc").limit(1);

postRef.where("status", "==", "NOTPOSTED").orderBy("time", "asc").limit(1)
    .get()
    .then(function(querySnapshot) {
        localStorage.setItem("control", '1null123');
        if (querySnapshot.empty) {
            document.getElementById('aTitle').innerText = "Post something, it will appear right here. Its time for people to hear your voice."
            document.getElementById('aText').innerText = "We beleive that what you say matter and should be heard. If you have something to share post it and it will appear right here immidetly for the world to see! Right now all the post have been shown. If you would like to see more content, tell your friends or write your own. Write something that matters to you. Share your thoughts, your beliefs, or your ideas. Share some news, tell a short story, or write about yourself. \n \n About The Headline. Write about the things you love. It can be anything, a story, an idea, a belief. All that matter is you are passionate about it. Let the world hear your voice. Your post will be on the front page for 5 mins. Everyone will read what you have to say - Finally. All you have to do is pay $1. Nobody likes paying so go into your couch cushion or laundry machine and find a dollar, then post."
            document.getElementById('postDetailText').innerText = "A Peak inside the mind of Team Headline"
            document.getElementById('author').innerText = "Written By: " + "Team Headline" + "\n" + "Bio: " + "Small team based in Boston trying to help people share their stories, beleifs and ideas. Welcome to a place on the internet where your voice is heard.";

        } else {
            querySnapshot.forEach(function(doc) {
                document.getElementById('aText').innerText = doc.data().content;
                document.getElementById('aTitle').innerText = doc.data().title;


                var author = doc.data().user;

                postRef.doc(doc.id).update({
                    status: "POSTED"
                });

                var userRef = db.collection("users");

                userRef.where("id", "==", doc.data().user)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            document.getElementById('postDetailText').innerText = "A Peak inside the mind of " + doc.data().username;
                            document.getElementById('author').innerText = "Written By: " + doc.data().username + "\n" + "Bio: " + doc.data().bio;
                            document.getElementById("twitterbutton").href = "https://twitter.com/intent/tweet?screen_name=" + doc.data().username + "&ref_src=twsrc%5Etfw";

                        });

                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });





            });
        }

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });





    function navButton() {
        firebase.auth().onAuthStateChanged(function(user){
            if (user) {
                location.href = 'MyAcoountPage.html';
            } else {
                location.href = 'singInPage.html';

            }
          });

    }

    function create() {
        firebase.auth().onAuthStateChanged(function(user){
            if (user) {
                location.href = 'PostPage.html';
            } else {
                location.href = 'singInPage.html';

            }
          });

    }

    function getStarted(){
        location.href = 'GetStarted.html';
    }

    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          document.getElementById('navitem1').textContent = 'My Account';

        } else{
            var getStarted = document.getElementById("getStarted");
            getStarted.style.display = "block";
            console.log('not logged in');


        }
      });
