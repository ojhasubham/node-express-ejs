const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "subham.works001@gmail.com",
    pass: "subhamworks@123",
  },
});

exports.sentMailToUser = (email, position,url) => {
  const mailOptions = {
    from: "subham.works001@gmail.com",
    to: email,
    subject: "Email For Successfully Register",
    html: `<h3> Thank You For The Registration </h3><br><h3>Your Position Is ${position}</h3><br><spam>Your Sharing Url is </spam><a href=${url}>${url}</a>`,

  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return { message: "email was sent" };
    }
  });
};
exports.sentMailToOldUser = (email, positionData) => {
  const mailOptions = {
    from: "subham.works001@gmail.com",
    to: email,
    subject: "Your New Position Is Set",
    html: `<h3> Your Old Position Is ${positionData.oldPositon}</h3><br><h3>Your New Position Is ${positionData.newPosition}</h3>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return { message: "email was sent" };
    }
  });
};
