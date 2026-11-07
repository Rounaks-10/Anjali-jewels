import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmailOtp = async (email, name, otp) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.BUSINESS_EMAIL,
        name: "Anjali Jewels",
      },
      to: [{ email }],
      subject: "Verify Your Email Address",
      htmlContent: `
      <div style="font-family:Arial;padding:20px">
        <h2>Email Verification</h2>

        <p>Hello ${name},</p>

        <p>Your OTP for email verification is:</p>

        <div style="
          font-size:32px;
          font-weight:bold;
          letter-spacing:8px;
          margin:20px 0;
          color:#8a4a2f;
        ">
          ${otp}
        </div>

        <p>This OTP is valid for 10 minutes.</p>

        <p>
          Regards,<br/>
          Anjali Jewels
        </p>
      </div>
      `,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
