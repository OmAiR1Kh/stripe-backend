// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51MxXOGG0f4ZBB4gDa3Z6uxYiOxRul2kBQYaJqNIFhWHTLXfZZrJXIrLj30r8yZ7j5xPvzfGuSrAAUe6CAYhObdQ300y9JUcil7"
);
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/create-checkout-session", async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    status = "Success";
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.json({ error, status });
});

app.listen(4242, () => console.log("Running on port 4242"));
