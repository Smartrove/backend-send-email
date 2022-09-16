const { application } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const port = 5000;

//Innit project

const app = express();

// View engine set up

app.engine(
  "handlebars",
  exphbs.engine({
    layoutsDir: "views/", // directory to handlebars files
    defaultLayout: null,
    extname: "handlebars",
  })
);

app.set("view engine", "handlebars");
app.set("views", "views");

//Body Parser MiddleWare.............
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// hard coded json object...............

//Homepage route..........................
app.get("/", (req, res) => res.render("contacts"));

//Post route
app.post("/send", (req, res) => {
  // console.log(req.body);
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
  <li>name : ${req.body.name}</li>
  <li>company : ${req.body.company}</li>
  <li>email : ${req.body.email}</li>
  <li>phone : ${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "olaokunolalekan@gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "wasiuolalekan20@yahoo.com", // generated ethereal user
      pass: "Abuaishah@1995", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"NodeMailer Contact  👻" <wasiuolalekan20@yahoo.com>', // sender address
    to: "muhammedghazalisalimah@gmail.com, arowolozurdick@gmail.com, olaokunolalekan@gmail.com", // list of receivers
    subject: "Hello Love ❤🧡❤", // Subject line
    text: "I love you so much", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.render("contacts", { msg: `message has been delivered successfully` });
});
// set static folder..............
app.use(express.static(path.join(__dirname, "public")));

//Innit middleware
//app.use(express.json());

//Setting up my server

app.listen(port, () => {
  console.log(`server is started on port ${port}`);
});
