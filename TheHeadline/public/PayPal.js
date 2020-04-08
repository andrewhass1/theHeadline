// Note: This code is intended as a *pseudocode* example. Each server platform and programming language has a different way of handling requests, making HTTP API calls, and serving responses to the browser.

// 1. Set up your server to make calls to PayPal
var gateway = braintree.connect({
  accessToken: access_token$production$hfzckvxjc5q429kp$a82e2b1ab984954835e4e57d365dd6c8
});

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

app.post("/checkout", function (req, res) {
  var nonce = req.body.payment_method_nonce;
  // Use payment method nonce here
});

var saleRequest = {
  amount: req.body.amount,
  merchantAccountId: "USD",
  paymentMethodNonce: req.body.nonce,
  orderId: "Mapped to PayPal Invoice Number",
  descriptor: {
    name: "Descriptor displayed in customer CC statements. 22 char max"
  },
  options: {
    paypal: {
      customField: "PayPal custom field",
      description: "Description for PayPal email receipt"
    },
    submitForSettlement: true
  }
};

gateway.transaction.sale(saleRequest, function (err, result) {
  if (err) {
    res.send("<h1>Error:  " + err + "</h1>");
  } else if (result.success) {
    res.send("<h1>Success! Transaction ID: " + result.transaction.id + "</h1>");
    var db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          db.collection("posts").add({
              title: localStorage.getItem('title'),
              content: localStorage.getItem('content'),
              user: user.uid,
              time: firebase.firestore.FieldValue.serverTimestamp(),
              status: "NOTPOSTED",
              id: "blank"
          })
          .then(function(docRef) {
            db.collection("posts").doc(docRef.id).update({
                id: docRef.id
            })
            var postRef = db.collection("posts");
            postRef.where("id", "==", docRef.id).where("status", "==", "NOTPOSTED").limit(1)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                    if (querySnapshot.empty) {
                      db.collection("posts").doc(docRef.id).update({
                    id: docRef.id
                })
                    } else {
                      localStorage.setItem("control", '1null123');
                  location.href = 'TwitterPage.html';
                    }

                });

            })

                  localStorage.setItem("control", '1null123');
                  location.href = 'TwitterPage.html';
            })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
      } else {
        location.replace('singInPage.html');
      }
    });
  } else {
    res.send("<h1>Error:  " + result.message + "</h1>");
  }
});
