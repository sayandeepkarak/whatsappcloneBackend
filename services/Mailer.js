import { createTransport } from "nodemailer";
import { EMAIL_SERVICE_KEY, EMAIL_SERVICE_USERNAME } from "../config";

class Mailer {
  constructor() {
    this.maileTransporter = createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_SERVICE_USERNAME,
        pass: EMAIL_SERVICE_KEY,
      },
    });
  }

  sendMail(address, subject, message, callback) {
    const options = {
      from: EMAIL_SERVICE_USERNAME,
      to: address,
      subject: subject,
      text: message,
    };
    return this.maileTransporter.sendMail(options, (error, info) =>
      callback(error, info)
    );
  }
}

export default Mailer;
