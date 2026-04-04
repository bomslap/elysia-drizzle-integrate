import { MailService } from "../mails.provider";

// class GmailService extends MailService {
//   constructor(user: string, pass: string) {
//     super(
//       {
//         service: "gmail",
//         auth: { user, pass },
//       },
//       user,
//     );
//   }
// }

class GmailService extends MailService {
  constructor(
    clientId: string,
    clientSecret: string,
    refreshToken: string,
    gmail: string,
  ) {
    super(
      {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: gmail,
          clientId,
          clientSecret,
          refreshToken,
        },
      },
      gmail,
    );
  }
}

export default GmailService;
