import SibApiV3Sdk from "sib-api-v3-sdk";

// Configure Brevo API Key
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Transactional Email API
const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendContactNotification = async ({
  name,
  email,
  phone,
  message,
}) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.BUSINESS_EMAIL,
        name: "Anjali Jewels",
      },
      to: [
        {
          email: process.env.BUSINESS_EMAIL,
        },
      ],
      subject: `New Contact Form Submission from ${name}`,
      htmlContent: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
  } catch (error) {
    console.error("Notification Email Error:", error);
  }
};

export const sendAutoReply = async ({ name, email }) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.BUSINESS_EMAIL,
        name: "Anjali Jewels",
      },
      to: [
        {
          email,
        },
      ],
      subject: "Thank you for contacting Anjali Jewels",
      htmlContent: `
        <h2>Thank You for Contacting Us</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry and our team will get back to you shortly.</p>
        <p>Regards,<br/>Anjali Jewels Team</p>
      `,
    });
  } catch (error) {
    console.error("Auto Reply Email Error:", error);
  }
};