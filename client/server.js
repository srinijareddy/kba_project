const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const { clientApplication } = require("./scripts/client");

app.post("/createProduct", function (req, res) {
  let Client = new clientApplication();

  Client.generatedAndSubmitTxn(
    req.body.role,
    "Admin",
    "autochannel",
    "chainCode",
    "ProductContract",
    "createProduct",
    req.body.productId,
    req.body.productType,
    req.body.productName,
    req.body.price,
    req.body.quantity,
    req.body.dom
  )
    .then((message) => {
      res
        .status(200)
        .send({ error: false, message: `Added product ${req.body.productId}` });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/transferProduct", function (req, res) {
  let Client = new clientApplication();

  Client.generatedAndSubmitTxn(
    req.body.role,
    "Admin",
    "autochannel",
    "chainCode",
    "ProductContract",
    "transferProduct",
    req.body.productId,
    req.body.newOwner
  )
    .then((message) => {
      res.status(200).send({
        error: false,
        message: `Transfered product ${req.body.productId} to ${req.body.newOwner}`,
      });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/deleteProduct", function (req, res) {
  let Client = new clientApplication();

  Client.generatedAndSubmitTxn(
    req.body.role,
    "Admin",
    "autochannel",
    "chainCode",
    "ProductContract",
    "deleteProduct",
    req.body.productId
  )
    .then((message) => {
      res.status(200).send({
        error: false,
        message: `Deleted product ${req.body.productId}`,
      });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/readProduct", function (req, res) {
  let Client = new clientApplication();
  Client.generatedAndEvaluateTxn(
    req.body.role,
    "Admin",
    "autochannel",
    "chainCode",
    "ProductContract",
    "readProduct",
    req.body.productId
  )
    .then((response) => {
      res.status(200).send({ error: false, message: response.toString() });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.get("/queryAllProducts", function (req, res) {
  let Client = new clientApplication();
  Client.generatedAndEvaluateTxn(
    "manufacturer",
    "Admin",
    "autochannel",
    "chainCode",
    "ProductContract",
    "queryAllProducts"
  )
    .then((response) => {
      res.status(200).send({ error: false, message: response.toString() });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/getProductHistory", function (req, res) {
  let Client = new clientApplication();
  Client.generatedAndEvaluateTxn(
    req.body.role,
    "Admin",
    "autochannel",
    "chainCode",
    "ProductContract",
    "getProductHistory",
    req.body.productId
  )
    .then((response) => {
      res.status(200).send({ error: false, message: response.toString() });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/createOrder", function (req, res) {
  let Client = new clientApplication();
  if(req.body.role === "customer"){

  const transientData = {
    productType: Buffer.from(req.body.productType),
    productName: Buffer.from(req.body.productName),
    quantity: Buffer.from(req.body.quantity),
  };
  console.log("lol", transientData);

  Client.generatedAndSubmitPDC(
    req.body.role,
    "Admin",
    "autochannel",
    "chainCode",
    "OrderContract",
    "createOrder",
    req.body.orderId,
    transientData
  )
    .then((message) => {
      res
        .status(200)
        .send({ error: false, message: `Created order ${req.body.orderId}` });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
    }
    else{
    res.send("The MSP cannot create the order")
    }
});

app.post("/readOrder", async function (req, res) {
  let Client = new clientApplication();
  Client.generatedAndEvaluateTxn(
    req.body.role,
    "Admin",
    "autochannel",
    "chainCode",
    "OrderContract",
    "readOrder",
    req.body.orderId
  )
    .then((response) => {
      res.status(200).send({ error: false, message: response.toString() });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/approveOrder", function (req, res) {
  let Client = new clientApplication();
  if(req.body.role === "retailer"){
  Client.generatedAndSubmitTxn(
    req.body.role,
    "Admin",
    "autochannel",
    "chainCode",
    "OrderContract",
    "approveOrder",
    req.body.orderId
  )
    .then((message) => {
      res.status(200).send({
        error: false,
        message: `approved order ${req.body.orderId}`,
      });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
    }
     else{
    res.send("The MSP cannot approve the order")
    }
});
app.post("/deleteOrder", function (req, res) {
  let Client = new clientApplication();
  if(req.body.role === "customer"){
  Client.generatedAndSubmitTxn(
    req.body.role,
    "Admin",
    "autochannel",
    "chainCode",
    "OrderContract",
    "deleteOrder",
    req.body.orderId
  )
    .then((message) => {
      res.status(200).send({
        error: false,
        message: `Deleted order ${req.body.orderId}`,
      });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
    }
     else{
    res.send("The MSP cannot delete the order")
    }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
