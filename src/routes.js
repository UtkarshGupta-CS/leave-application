const User = require("./models/UserSchema");
const Leave = require("./models/LeaveSchema");

module.exports = router => {
  let ses;

  router.post("/", (req, res) => {
    ses = req.session;

    ses.username = req.body.username;
    res.send(ses);
  });

  router.get("/crap", (req, res) => {
    ses = req.session;

    res.send(ses);
  });

  router.post("/user", (req, res) => {
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
      User.findOne({ firstName: req.body.firstName }).then(user => {
        if (!user) {
          let userEntry = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            username: req.body.username,
            email: req.body.email
          });

          userEntry.save(err => {
            if (!err) {
              res.json({ success: true, message: "User Created" });
            }
          });
        } else {
          res.json({
            success: false,
            message: "Username or email already exist"
          });
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
      ses = req.session;
      console.log(ses)
      let leaveEntry = new Leave({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        reason: req.body.reason,
        leaveType: req.body.leaveType,
        requestedBy: ses.username
      });

      leaveEntry.save(err => {
        if (!err) {
          res.json({ success: true, message: "Leave Added" });
        } else {
          res.json(err);
        }
      });
    }
  });

  router.get("/all", (req, res) => {
    console.log(req.body);

    Leave.find().then(leave => {
      res.json(leave);
    });
  });
};
