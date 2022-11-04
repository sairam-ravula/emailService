const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const constants = require("../utils/constants");

async function createUser(req, res) {
  const user = await User.findOne({ name: req.body.name });
  if (user) {
    console.log("User already exists!!!");
    return res.status(401).send({
      message: "User already exists!!!",
      success: false,
    });
  } else {
    if (req.body.name && req.body.email) {
      var userObj = {
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
      };
      try {
        let notificationObj = {
          subject: "User Account creation",
          content: `Hello ${userObj.name}, Your account has been created!!!`,
          recepientEmails: userObj.email,
        };
        const userCreated = await User.create(userObj);
        try {
          const NotificationCreated = await Notification.create(
            notificationObj
          );
          return res.status(200).send({
            message: `${userObj.name} has been created!!!`,
            success: true,
          });
        } catch (err1) {
          console.log("Error in sending the email!!!", err1);
          return;
        }
      } catch (err) {
        console.log("Error in adding the user ", err);
        return res.status(500).send({
          message: "Some internal server error in adding the user!!!",
          success: false,
        });
      }
    } else {
      return res.status(401).send({
        message: "Some fields are missing!!!",
        success: false,
      });
    }
  }
}

async function updateUser(req, res) {
  const data = req.body;
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  if (user) {
    if (data.gender) user.gender = data.gender;
    if (data.email) user.gender = data.email;
    await user.save();
    let notificationObj = {
      subject: "User Account Updation",
      content: `Hello ${user.name}, Your account has been updated!!!`,
      recepientEmails: user.email,
    };
    var NotificationCreated = await Notification.create(notificationObj);
    return res.status(200).send({
      message: `Hello ${user.name}, Your account has been successfully updated`,
      success: true,
    });
  } else {
    return res.status(404).send({
      message: "No user is found",
      success: false,
    });
  }
}

async function deleteUser(req, res) {
  const data = req.body;
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  if (user) {
    await User.deleteOne({ _id: userId });
    let notificationObj = {
      subject: "User Account Deletion",
      content: `Hello ${user.name}, Your account has been deleted!!!`,
      recepientEmails: user.email,
    };
    var NotificationCreated = await Notification.create(notificationObj);
    return res.status(200).send({
      message: `Hello ${user.name}, Your account has been successfully deleted`,
      success: true,
    });
  } else {
    return res.status(404).send({
      message: "No user is found",
      success: false,
    });
  }
}

async function getUserbyID(req, res) {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  if (user) {
    return res.status(200).send({
      message: "User has been fetched successfully!!!",
      success: true,
      userResponse: user,
    });
  } else {
    return res.status(404).send({
      message: "No user is found",
      success: false,
    });
  }
}

async function getAllUsers(req, res) {
  const users = await User.find({});
  if (users) {
    return res.status(200).send({
      message: "User has been fetched successfully!!!",
      success: true,
      userResponse: users,
    });
  } else {
    return res.status(404).send({
      message: "No user is found",
      success: false,
    });
  }
}

async function getNotifications(req, res) {
  const notifications = await Notification.find({
    sentStatus: constants.unsent,
  });

  if (notifications) {
    return res.status(200).send({
      message:
        "Notifications that are unsent have been fetched successfully!!!",
      success: true,
      Response: notifications,
    });
  } else {
    return res.status(404).send({
      message: "All unsent Notifications are available!!!",
      success: false,
    });
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserbyID,
  getNotifications,
};
