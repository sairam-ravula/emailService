const Notification = require("../models/notification.model");
const constants = require("../utils/constants");
const emailTransporter = require("../notifier/emailService");
const cron = require("node-cron");

cron.schedule("*/1 * * * *", async () => {
  /*
   * I need to send the emails.
   * Get the list of all notifications to be sent
   * send email for each notification
   */
  console.log("CRON job started");

  const notifications = await Notification.find({
    sentStatus: constants.unsent,
  });

  notifications.forEach((notification) => {
    const mailData = {
      from: "*****@gmail.com",
      to: notification.recepientEmails,
      subject: notification.subject,
      text: notification.content,
    };

    emailTransporter.sendMail(mailData, async (err, info) => {
      if (err) {
        console.log("Some error happened while sending the mail ", err);
      } else {
        const savedNotification = await Notification.findOne({
          _id: notification._id,
        });
        savedNotification.sentStatus = constants.sent;
        await savedNotification.save();
      }
    });
  });
});
