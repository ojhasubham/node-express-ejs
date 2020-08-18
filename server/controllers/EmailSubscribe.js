const UserData = require("../models/EmailScheema");
const uniqid = require("uniqid");

const email = require("../services/email");
exports.create_email_subscribe = async (req, res) => {
  const checkPosition = await UserData.find({}).catch((err) =>
    console.log(err)
  );
  let data;
  const emailExist = await UserData.find({ Email: req.body.email });

  if (emailExist.length > 0) {
    return res.json({ status: false, message: "User Already Exist" });
  }

  if (checkPosition.length === 0) {
    data = {
      Email: req.body.email,
      Position: 1,
      Code: uniqid(),
    };
  } else {
    checkPosition.map((item, index) => {
      if (index === checkPosition.length - 1) {
        data = {
          Email: req.body.email,
          Position: parseInt(item.Position) + 1,
          Code: uniqid(),
        };
      }
      return;
    });
  }
  UserData.create(data)
    .then((resData) => {
      email.SentMailToUser(
        data.Email,
        data.Position,
        (mailSuccess = (isSent) =>
          isSent
            ? res
                .status(200)
                .json({
                  status: true,
                  message: "Your Subscribe Email Sent",
                  data: data,
                })
            : res.status(500).json({ message: "Something Went to wrong" }))
      );
    })
    .catch((err) => console.log(err));
};

exports.userDetail = async (req, res) => {};
