const userData = require("../models/EmailScheema");
const uniqid = require("uniqid");

const email = require("../services/email");
exports.create_email_subscribe = async (req, res) => {
  var token = uniqid();
  var base_url = "http://" + req.headers.host + "/user/" + token;
  console.log(base_url);
  await userData.find({ Email: req.body.email }).then(async (data) => {
    if (data.length > 0) {
      return res.json({ status: false, message: "User Already Exist" });
    } else {
      const checkPosition = await userData
        .find({})
        .catch((err) => console.log(err));
      let data;
      if (checkPosition.length === 0) {
        data = {
          Email: req.body.email,
          Position: 1,
          Code: token,
        };
      } else {
        const maxValue = Math.max(
          ...checkPosition.map((item) => item.Position),
          0
        );
        data = {
          Email: req.body.email,
          Position: parseInt(maxValue) + 1,
          Code: token,
        };
      }
      userData
        .create(data)
        .then((resData) => {
          res.status(200).json({
            status: true,
            message: "Your Subscribe Email Sent",
            data: data,
          });
          email.sentMailToUser(data.Email, data.Position,base_url);
        })
        .catch((err) => console.log(err));
      if (req.body.referralCode) {
        await userData
          .findOne({
            Code: req.body.referralCode,
          })
          .then((data) => {
            if (data) {
              if (data.Position > 1) {
                userData
                  .updateOne(
                    { Code: req.body.referralCode },
                    {
                      $set: {
                        Position: parseInt(data.Position) - 1,
                      },
                    }
                  )
                  .then((res) => {
                    const positionData = {
                      oldPositon: data.Position,
                      newPosition: data.Position - 1,
                    };
                    email.sentMailToOldUser(data.Email, positionData);
                  });
              }
            }
          });
      }
    }
  });
};

exports.findPosition = async (req, res) => {
  await userData
    .findOne({ Email: req.body.email })
    .then((data) => {
      if (data) {
        res.status(200).json({
          status: true,
          message: `Your Position is ${data.Position}`,
          data: data.Position,
        });
      } else {
        res.status(200).json({
          status: false,
          message: `User Doesn't Exist `,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
