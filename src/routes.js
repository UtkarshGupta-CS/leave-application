"use strict";

const User = require("./models/UserSchema");
const Leave = require("./models/LeaveSchema");

module.exports = router => {
  let ses;

  /**
   * Note: Session Starts from "/" route
   */

  router.post("/login", (req, res) => {
    ses = req.session;

    ses.username = req.body.username;
    res.send(ses);
  });

  /**
   * Note: Session detroyed from "/logout" route
   */

  router.get("/logout", (req, res) => {
    req.session.destroy(err => {
      if (err) console.log(err);
      else res.send("session detroyed");
    });
  });

  /**
   * Note: To create new user
   */
  router.post("/user", (req, res) => {

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
      User.findOne({ username: req.body.username }).then(user => {
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

  /**
   * Note: To create new Leave Request
  */

  router.post("/leave", (req, res) => {
    let leave = new Leave();

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

      let leaveEntry = new Leave({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        reason: req.body.reason,
        leaveType: req.body.leaveType,
        requestedBy: ses.username,
        requestedAt: new Date(),
        approvalStatus: "Not Approved"
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

  /**
   * Note: To see all of the leave request according to user 'Role'
   */

  router.get("/all", (req, res) => {
    ses = req.session;

    const username = ses.username;

    User.findOne({ username: username }).then(user => {
      console.log(user);
      if (user && user.role === "Manager") {
        Leave.find().then(leave => {
          res.json(leave);
        });
      } else if (user && user.role === "Employee") {
        Leave.find({ requestedBy: username }).then(leave => {
          res.json(leave);
        });
      } else {
        res.send("username does not exist");
      }
    });
  });

  /**
   * Note: To Approve or Reject outstanding leave request
   */

  router.put("/approving", (req, res) => {
    ses = req.session;

    const username = ses.username;

    User.findOne({ username: username }).then(user => {
      console.log(user);
      if (user && user.role === "Manager") {
        Leave.updateOne(
          { _id: req.body.id },
          {
            approvalStatus: req.body.approvalStatus,
            approvedAt: new Date()
          },
          { upsert: true }
        )
          .then(() => {
            res.send("approved");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        res.send("bad request");
      }
    });
  });
};
