import { MailAdapter } from "../Providers/mail.provider"
import { FeedbacksRepository } from "../repositories/Feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
}
export class SubmitFeedbackUseCase {


    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }

    async execute({ comment, type, screenshot }: SubmitFeedbackUseCaseRequest) {
        
        
        if(screenshot && !screenshot.startsWith("data:image/png;base64")){
            throw new Error("Invalid screenshot format")
        }
        
        if(!type) {
            throw new Error("Type is required")
        }
        
        if(!comment) {
            throw new Error("Comment is required")
        }
        await this.feedbackRepository.create({
            comment,
            type,
            screenshot
        })
        await this.mailAdapter.sendMail({
            subject: "Novo feeback",
            body:[
                `<div>`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"> ` : ``,
                `</div>`,
            ].join('\n')

        })
    }
}