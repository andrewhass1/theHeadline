var db = firebase.firestore();
function title(title){
    location.href = 'HomePage.html';
}   
    db.collection("posts").where("status", "==", "POSTED").orderBy("time", "desc").limit(50)
        .get()
        .then(function(querySnapshot) {
            var content = '';
            var table = document.getElementById('archiveTable')
            querySnapshot.forEach(function(doc) {
                var loadingCover = document.getElementById("whiteout");
                loadingCover.style.display = "none";
                // doc.data() is never undefined for query doc snapshots
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("a");
                td3.style.cursor = "pointer";
                var date = doc.data().time.toDate();
                var year = date.getYear() + 1900;
                var month = date.getMonth() + 1;
                var day = date.getDate();
                td1.textContent = month + '.' + day + '.' +year;
                td3.innerText = doc.data().title;
                var title = doc.data().title;
                td3.onclick = function names() {
                    localStorage.removeItem('id');
                    localStorage.setItem("id", title);
                    location.href = 'ArchiveText.html';
                };
                

                var userRef = db.collection("users");

                userRef.where("id", "==", doc.data().user)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {

                            td2.textContent = doc.data().username;

                        });

                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3)
                table.appendChild(tr);


            });

        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });