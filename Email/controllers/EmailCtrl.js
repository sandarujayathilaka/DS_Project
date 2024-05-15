const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { EMAIL, PASSWORD } = process.env;
const Mailgen = require("mailgen");

const sendNotificationSpecificUsers = async (req, res) => {
  const { userEmail, invoice, date, price, method, status } = req.body;
  try {
    let config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "EDUFLEX",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: "User",
        intro: "You have a new notification from EDUFLEX",
        table: {
          data: [
            {
              Invoice: invoice,
              Date: date,
              Price: price,
              Method: method,
              Status: status,
            },
          ],
        },
        outro:
          "This is a notification from EDUFLEX. Please login to your account for more details.",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Notification from EDUFLEX",
      html: mail,
    };
    await transporter.sendMail(message);

    // Send success response
    res.status(200).json({ msg: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    // Send error response
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  sendNotificationSpecificUsers
};
