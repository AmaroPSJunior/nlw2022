import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedback-repository";

export class PrismaFeedbackRepository implements FeedbackRepository {
    async create({ type, comment, screenshot }: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        });
    }

    async findAll() {
        return await prisma.feedback.findMany();
    }
}