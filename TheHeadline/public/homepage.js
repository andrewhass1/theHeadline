
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
            document.getElementById('aText').innerText = "At Team Headline, we are eager to spread your voice. We designed The Headline so that writers will feel like they have a serious platform to share their ideas. And readers will hear what serious writers have to say. This is a non addictive Social Media. \n \n Most websites are not built as a tool to help people, but instead are built like a drug so that people keep checking and companies keep making money. The more eyeballs a site can attract, the more money they will make. Social media are built to be addictive and impossible to refuse. Not here. The Headline was built as a place on the internet where people can go and read articles on a serious website, but then feel comfortable leaving the site and not craving coming back for more five minutes later. Readers will feel comfortable putting their phone away, and knowing what they missed will be there waiting when they return. \n \n The Headline is a writer's dream. Writers on our site know that they will have an audience who actually reads what they write and will not just get scrolled over. Here people will focus on your ideas, and your ideas only. For just one dollar per post, writers will gain access to an invested audience who cares about substantive content. Nowhere else on the internet is content featured like it is featured here. Every post is up for two minutes on the homepage. During this time there will be no other post shown. This gives writers a fast track to sharing their ideas as quickly and as broadly as possible. It is like giving a campaign speech on the internet where everyone is forced to listen to what you have to say. \n \nUsers don't have to rush to read articles on The Headline. One of our favorite features is the Archive section. The Archives stores the past 50 posts which allows readers to take their time with each article. Instead of rushing a reader, they are able to digest fully what a writer believes before moving on to the next post. The Archives also enables readers to leave the site and return later in the day and know that they will not have missed anything. At The Headline we believe in the power of simplicity.  One writer. One idea. \n \n One Headline."
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
                            localStorage.setItem("author", doc.data().username);
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
        },120750);
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
