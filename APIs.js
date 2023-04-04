const express = require("express");
const cors = require("cors");
require("./connection");
const controller = require("./controller");
const app = express();
const port = 2000;
app.use(express.json());
app.use(cors());

app.post("/getUsers", async (req, res) => {
  try {
    let result = await controller.getUsers(req.body);
    let users = { status: "Success", data: result };
    res.send(JSON.stringify(users));
  } catch (err) {
    res.send(err);
  }
});

app.post("/addUser", async (req, res) => {
  try {
    let data = req.body;
    let result = await controller.addUser(data);
    res.send(JSON.stringify(result));
  } catch (err) {
    if (err.code === 11000) {
      res.send("11000");
    } else {
      res.send("500");
    }
  }
});

app.post("/checkUser", async (req, res) => {
  try {
    let result = await controller.checkUser(req.body);
    res.send(JSON.stringify(result));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/updateUser", async (req, res) => {
  let result = await controller.updateUserData(req.body);
  res.send(JSON.stringify(result));
});

app.post("/leaveRecord", async (req, res) => {
  let result = await controller.addLeave(req.body);
  res.send(JSON.stringify(result));
});

app.listen(port);
