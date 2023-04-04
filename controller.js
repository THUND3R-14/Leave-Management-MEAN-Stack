require("./connection");
const SgMail = require("@sendgrid/mail");
const model = require("./schemas");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const API_KEY =
  "";
// const multer = require('multer');
// const path = require('path');
// app.use(express.static('uploads'))
// let storage = multer.diskStorage({
//   destination : 'images/',
//   filename : (req,file,cb)=>{
//     cb(null,file.originalname)
//   }
// })

// let upload = multer({
//   storage : multer.diskStorage({
//     destination : function(req,file,cb)
//     {
//       cb(null,"uploads");
//     },
//     filename : function(req,file,cb)
//     {
//       cb(null,Date.now() + path.extname(file.originalname));
//     },
//   })
// });

const getUsers = async (useremail) => {
  if (
    useremail === undefined ||
    useremail === "" ||
    JSON.stringify(useremail) === "{}"
  ) {
    let users = await model.userCollection.find();
    return users;
  } else {
    let user = await model.userCollection.findOne({ email: useremail.email });
    return user;
  }
};

const addUser = async (data) => {
  let lastid = await model.userCollection.find().sort({ _id: -1 }).limit(1);
  let newid =
    lastid[0]["userid"] === undefined || lastid[0]["userid"] === 0
      ? 1
      : lastid[0]["userid"] + 1;

  let adduser = new model.userCollection({
    userid: newid,
    name: data.fullname,
    email: data.email,
    phone: parseInt(data.phone),
    password: await encryption(data.password),
    joinDate: data.joindate,
  });

  await adduser.save();
  await sendEmail(data);
  return "Success!!";
};

const sendEmail = async (data) => {
  SgMail.setApiKey(API_KEY);
  const message = {
    to: data.email,
    from: "raj@innovatemr.com",
    subject: "About Account Registration",
    html:
      "Hello, " +
      data.fullname +
      "<br>" +
      "Your account has been created successfully." +
      "<br>" +
      "Your account credentials are:" +
      "<br>" +
      "Username : " +
      data.email +
      "<br>" +
      "Password : " +
      data.password +
      "<br>" +
      "<br>" +
      "Please do not share this email with anyone.<br>Thank you!!",
  };
  try {
    await SgMail.send(message);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

const addLeave = async (data) => {
  let res = new model.leaveRecordCollection(data);
  await res.save();
  return "Saved!!";
};

const checkUser = async (data) => {
  user = await model.userCollection.find({ email: data["email"] });
  admin = await model.adminCollection.find({ email: data["email"] });

  if (admin.length != 0) {
    const result = await bcrypt.compare(data["password"], admin[0]["password"]);
    if (result) {
      return "Admin";
    }
  }

  if (user.length != 0) {
    const res = await bcrypt.compare(data["password"], user[0]["password"]);
    if (res) {
      return "User";
    }
  }

  if (admin.length == 0 && user.length == 0) {
    return "Invalid User";
  }
};

const updateUserData = async (updatedata) => {
  let res = await model.userCollection.updateOne(
    { email: updatedata["email"] },
    { $set: updatedata["data"] }
  );
  if (res.acknowledged) {
    return true;
  }
};

const encryption = async (pass) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};

module.exports = { getUsers, addUser, checkUser, updateUserData, addLeave };
