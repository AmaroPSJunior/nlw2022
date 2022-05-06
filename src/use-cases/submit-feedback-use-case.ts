import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedback-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor ( 
        private feedbackRepository: FeedbackRepository,
        private mailAdapter: MailAdapter,
    ) {}

    async execute({ type, comment, screenshot }: SubmitFeedbackUseCaseRequest) {
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot, 
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `   <p>Tipo do feedback: ${type}</p>`,
                `   <p>Comentario: ${comment}</p>`,
                `</div>`,
            ].join('\n')
        })
    }
}