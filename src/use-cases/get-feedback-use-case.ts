import { FeedbackRepository } from "../repositories/feedback-repository";

export class GetFeedbackUseCase {
    constructor ( 
        private feedbackRepository: FeedbackRepository,
    ) {}

    async execute() {
        return await this.feedbackRepository.findAll();
    }
}