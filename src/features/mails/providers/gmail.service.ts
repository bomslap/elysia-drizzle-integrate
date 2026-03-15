import { MailService } from "../mails.provider";

class GmailService extends MailService {
  constructor(user: string, pass: string) {
    super(
      {
        service: "gmail",
        auth: { user, pass },
      },
      user,
    );
  }
}

export default GmailService;
