import { sendEmail } from '../../infrastructure/email/mailer';
import { SendEmailRequest } from '../dtos/send-email/SendEmailRequest';

export class SendNotificationUseCase {
  async execute(dto: SendEmailRequest): Promise<void> {
    await sendEmail(dto);
  }
}