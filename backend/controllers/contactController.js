import Contact from "../models/contactModel.js";
import {
  sendContactNotification,
  sendAutoReply,
} from "../services/emailService.js";

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    await sendContactNotification(contact);

    await sendAutoReply(contact);

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
