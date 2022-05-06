import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../Feedbacks-repository";

export class PrismaFeedbackRepository implements FeedbacksRepository {

    async create({ comment, type, screenshot }: FeedbackCreateData) {

        await prisma.feedback.create({
            data: {
                comment,
                type,
                screenshot
            }
        })
    };
}