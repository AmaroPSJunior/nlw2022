import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { GetFeedbackUseCase } from './use-cases/get-feedback-use-case';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const router = express.Router();

const prismaFeedbackRepository = new PrismaFeedbackRepository()
const nodemailerMailAdapter = new NodemailerMailAdapter()

router.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot 
    })
    
    return res.status(201).send();
})

router.get('/feedbacks', async (req, res) => {
    const getFeedbackUseCase = new GetFeedbackUseCase(prismaFeedbackRepository)
    const feedback = await getFeedbackUseCase.execute();
    
    return res.status(200).json({ data: feedback });
})