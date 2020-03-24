
// Add your credentials:
// Add your client ID and secret
var CLIENT =
  'AeS3Ae0i5WXnmcvMR24V95n4OVKAY_5q9idrJFZN9rkkyTlxCiuR1uez3AoliaCYwqS1C-BNFIRnsWfN';
var SECRET =
  'ELW4d9K-qqSLyNcgfvLz6NRPxaJRnr5_fZyH63n5krrNCIUrboJaoCZUH86D3EJkDMq-OoHLO8sJaxOz';
  var PAYPAL_ORDER_API = 'https://api.paypal.com/v2/checkout/orders/';
express()
  // Set up the payment:
  // 1. Set up a URL to handle requests from the PayPal button
  .post('/my-api/create-payment/', function(req, res)
  {
    // 2. Call /v1/payments/payment to set up the payment
    request.post(PAYPAL_API + '/v1/payments/payment',
    {
      auth:
      {
        user: CLIENT,
        pass: SECRET
      },
      body:
      {
        intent: 'sale',
        payer:
        {
          payment_method: 'paypal'
        },
        transactions: [
        {
          amount:
          {
            total: '1.00',
            currency: 'USD'
          }
        }],
        redirect_urls:
        {
          return_url: 'https://the-headline.com/HomePage.html',
          cancel_url: 'https://the-headline.com/HomePage.html'
        }
      },
      json: true
    }, function(err, response)
    {
      if (err)
      {
        console.error(err);
        return res.sendStatus(500);
      }
      // 3. Return the payment ID to the client
      res.json(
      {
        id: response.body.id
      });
    });
  })
  // Execute the payment:
  // 1. Set up a URL to handle requests from the PayPal button.
  .post('/my-api/execute-payment/', function(req, res)
  {
    // 2. Get the payment ID and the payer ID from the request body.
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
      '/execute',
      {
        auth:
        {
          user: CLIENT,
          pass: SECRET
        },
        body:
        {
          payer_id: payerID,
          transactions: [
          {
            amount:
            {
              total: '1.00',
              currency: 'USD'
            }
          }]
        },
        json: true
      },
      function(err, response)
      {
        if (err)
        {
          console.error(err);
          return res.sendStatus(500);
        }
        // 4. Return a success response to the client
        res.json(
        {
          status: 'success'
        });
      });
  }).listen(5000, function()
  {
    console.log('Server listening at http://localhost:5000/');
  });
// Run `node ./server.js` in your terminal