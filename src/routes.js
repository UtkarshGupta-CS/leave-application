const User = require("./models/UserSchema");
const Leave = require("./models/LeaveSchema");

module.exports = router => {
  router.post("/", (req, res) => {
    let user = new User();
    console.log(req.body);

    if (
      req.body.firstName === null ||
      req.body.firstName === "" ||
      req.body.lastName === null ||
      req.body.lastName === "" ||
      req.body.role === null ||
      req.body.role === "" ||
      req.body.username === null ||
      req.body.username === "" ||
      req.body.email === null ||
      req.body.email === ""
    ) {
      res.json({
        success: false,
        message:
          "Ensure that username,email, firstName, lastName, role are provided"
      });
    } else {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.role = req.body.role;
      user.username = req.body.username;
      user.email = req.body.email;

      user.save(err => {
        if (err) {
          res.json({
            success: false,
            message: "Username or email already exist"
          });
        } else {
          res.json({ success: true, message: "User Created" });
        }
      });
    }
  });

  router.post("/leave", (req, res) => {
    let leave = new Leave();
    console.log(req.body);

    if (
      req.body.startDate === null ||
      req.body.startDate === "" ||
      req.body.endDate === null ||
      req.body.endDate === "" ||
      req.body.reason === null ||
      req.body.reason === "" ||
      req.body.leaveType === null ||
      req.body.leaveType === ""
    ) {
      res.json({
        success: false,
        message: "Ensure startDate, endDate, reason, leaveType are provided"
      });
    } else {
      leave.startDate = req.body.startDate;
      leave.endDate = req.body.endDate;
      leave.reason = req.body.reason;
      leave.leaveType = req.body.leaveType;

      leave.save(err => {
        if (!err) {
          res.json({ success: true, message: "Leave Added" });
        }else {
          res.json(err)
        }
      });
    }
  });

  router.get('/all', (req, res) => {
    console.log(req.body);
    let leave = new Leave();

    res.render(leave.find())
  })
};
