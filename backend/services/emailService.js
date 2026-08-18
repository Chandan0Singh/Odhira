const { BrevoClient } = require("@getbrevo/brevo");

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendVerificationEmail = async (email, name, verificationUrl) => {
  try {
    const response = await client.transactionalEmails.sendTransacEmail({
      sender: {
        name: "Odhira",
        email: process.env.BREVO_SENDER_EMAIL,
      },

      to: [
        {
          email,
          name,
        },
      ],

      subject: "Verify your Odhira account",

      htmlContent: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Welcome to Odhira, ${name}!</h2>

          <p>
            Thank you for creating an account with us.
          </p>

          <p>
            Please verify your email address by clicking the button below.
          </p>

          <a
            href="${verificationUrl}"
            style="
              display:inline-block;
              padding:12px 24px;
              background:#5E6B58;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Verify My Email
          </a>

          <p style="margin-top:20px;">
            This verification link will expire in 24 hours.
          </p>
        </div>
      `,
    });

    console.log("Verification email sent:", response);

    return response;
  } catch (error) {
    console.error(
      "Brevo email error:",
      error?.response?.body || error?.message || error
    );

    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
};