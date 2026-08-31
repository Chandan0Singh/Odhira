const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendContactMessage = async (req, res) => {
  try {
    const { name, email,  subject, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        message: "Name and message are required",
      });
    }

    const mailOptions = {
      from: `"Nature Explorer Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,

      subject: subject || `New Contact Message from ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto;">
          
          <h2 style="color: #1B5E20;">
            New Contact Form Submission
          </h2>

          <hr />

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email || "Not provided"}</p>

          <p><strong>Subject:</strong> ${subject || "Not provided"}</p>

          <h3>Message</h3>

          <div style="
            background: #f4f1ea;
            padding: 15px;
            border-radius: 8px;
            white-space: pre-line;
          ">
            ${message}
          </div>

          <hr />

          <p style="color: #777;">
            This message was sent from the Nature Explorer contact form.
          </p>

        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact email error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendContactMessage,
  getMessages,
  sendMessage,
};
