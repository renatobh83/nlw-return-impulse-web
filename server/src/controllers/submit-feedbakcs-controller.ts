import { Request, Response } from "express";
import { NodemailerMailAdapter } from "../Providers/nodemailer/nodemailer-mail-provider";
import { PrismaFeedbackRepository } from "../repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "../use-cases/submit-feedback-use-case";

export class SubmitFeedbackController {

   async handle(request: Request, response: Response): Promise<Response> {
        const { comment, screenshot, type } = request.body
        try {
            const nodemailerMailAdapter = new NodemailerMailAdapter()
            const prismaFeedbackRepository = new PrismaFeedbackRepository()
            const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerMailAdapter)

            await submitFeedbackUseCase.execute({
                comment, type, screenshot
            })
            return response.status(201).send()
        } catch (error) {
            console.log(error)
            return response.status(404).send()
        }

    }
}