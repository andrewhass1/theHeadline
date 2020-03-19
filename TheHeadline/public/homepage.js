
function signout(){
    firebase.auth().signOut().then(function() {
        location.href = 'HomePage.html';
    }).catch(function(error) {
      // An error happened.
    });
  }
var db = firebase.firestore();
localStorage.setItem("control", '1null123');
var postRef = db.collection("posts");
var stDocRef = postRef.where("status", "==", "NOTPOSTED").orderBy("time", "asc").limit(1);
postRef.where("status", "==", "NOTPOSTED").orderBy("time", "asc").limit(1)
    .get()
    .then(function(querySnapshot) {

        if (querySnapshot.empty) {
            document.getElementById('aTitle').innerText = "Post something, it will appear right here. It's time for people to hear your voice."
            document.getElementById('aText').innerText = "We believe that what you say matters and should be heard. If you have something to share, post it and it will appear right here for the world to see! Right now all the posts have been shown. If you would like to see more content, tell your friends or write your own. Write something that matters to you. Share your thoughts, your beliefs, or your ideas. Share some news, tell a short story, or write about yourself. \n \n About The Headline. Write about the things you love. It can be anything, a story, an idea, a belief. All that matters is you are passionate about it. Let the world hear your voice. Your post will be on the front page for 5 mins. Everyone will read what you have to say - Finally. All you have to do is pay $1. Nobody likes paying so go into your couch cushion or laundry machine and find a dollar, then post."
            document.getElementById('postDetailText').innerText = "A Peak inside the mind of Team Headline"
            document.getElementById('author').innerText = "Written By: " + "Team Headline" + "\n" + "Bio: " + "Small team based in Boston trying to help people share their stories, beliefs and ideas. Welcome to a place on the internet where your voice is heard.";
            document.getElementById("twitterbutton").innerHTML = "Tweet to @theHeadline"
        } else {
            querySnapshot.forEach(function(doc) {
                document.getElementById('aText').innerText = doc.data().content;
                document.getElementById('aTitle').innerText = doc.data().title;
                localStorage.setItem("doc", doc.id);
                localStorage.setItem("id", doc.data().title);
                var author = doc.data().user;

                var userRef = db.collection("users");

                userRef.where("id", "==", doc.data().user)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            document.getElementById('postDetailText').innerText = "A Peak inside the mind of " + doc.data().username;
                            document.getElementById('author').innerText = "Written By: " + doc.data().username + "\n" + "Bio: " + doc.data().bio;
                            console.log("https://twitter.com/intent/tweet?screen_name=" + doc.data().twitterUN + "&ref_src=twsrc%5Etfw");
                            if (doc.data().twitterUN == "") {
                                document.getElementById("messageAuthorText").innerHTML = "This author has no twitter linked. Still want to chat? Tweet at Team Headline."
                                document.getElementById("twitterbutton").innerHTML = "Tweet to @theHeadline"
                            } else {
                                document.getElementById("messageAuthorText").innerHTML = "Have thoughts? Share your opinion and ideas with the author."
                                document.getElementById("twitterbutton").href = "https://twitter.com/intent/tweet?screen_name=" + doc.data().twitterUN + "&ref_src=twsrc%5Etfw";
                                document.getElementById("twitterbutton").innerHTML = "Tweet to @" + doc.data().twitterUN;
                            }

                        });

                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });


                    setTimeout(function () {
                        var id1 = localStorage.getItem("doc");
                        localStorage.setItem("doc", doc.id)
                        postRef.where("id", "==", id1).where("status", "==", "NOTPOSTED").limit(1)
                        .get()
                        .then(function(querySnapshot) {
                            if (querySnapshot.empty) {
                                console.log("post");
                                location.replace("HomePage.html");
                            } else {
                                console.log("no post")
                        postRef.doc(doc.id).update({
                            status: "POSTED"
                        })


                        document.getElementById('postdone').style.display = "block";


                }
            }
            ).catch(function(error) {
                console.log("Error getting documents: ", error);
            })
        },10750);
    })
}
    })

    function nextPost() {
        location.replace("HomePage.html");
    }

    function continueReading() {
        location.replace("ArchiveText.html");
    }

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



        postRef.where("status", "==", "LETTER").orderBy("time", "asc").limit(1)
        .get()
        .then(function(querySnapshot) {
        localStorage.setItem("control", '1null123');
            if (querySnapshot.empty) {
                document.getElementById('letterbody1').innerText = "Our articles are written by passionate people who want to have their voice heard. Enjoy what people have to say. Discover articles that people write. They know that what they say will be heard, so they put their heart into every post."
                document.getElementById('letterbody2').innerText = "Come back here to read our editor picks. Our editors will write about their favorite post. They change their pick every other day. Enjoy.";

            } else {
                querySnapshot.forEach(function(doc) {
                    document.getElementById('letterbody1').innerText = doc.data().title;
                    document.getElementById('letterbody2').innerText = doc.data().content;

                });
            }

        })
        .catch(function(error) {
        console.log("Error getting documents: ", error);
        });
