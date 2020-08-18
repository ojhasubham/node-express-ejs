const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "subham.works001@gmail.com",
    pass: "subhamworks@123",
  },
});

exports.SentMailToUser = function (email, position, mailSuccess) {
  const mailOptions = {
    from: "subham.works001@gmail.com",
    to: email,
    subject: "Email For Register",
    html: `<h1>Your Position at ${position}</h1>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      mailSuccess(false);
    } else {
      console.log("Email sent: " + info.response);
      mailSuccess(true);
      return { message: "email was sent" };
    }
  });
};
