import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn()
describe("Create a new Feedback", () => {
    const submitFeedback = new SubmitFeedbackUseCase(
        { create: createFeedbackSpy },
        { sendMail: sendMailSpy }
    )


    it("Should be able to create new feedback", async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example",
            screenshot: "data:image/png:base64sdasdateste.jpg"
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })
    it("Should not able to create new feedback withou type", async () => {

        await expect(submitFeedback.execute({
            type: "",
            comment: "Example",
            screenshot: "data:image/png:base64sdasdateste.jpg"
        })).rejects.toThrow()
    })
    it("Should not able to create new feedback withou comment", async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png:base64sdasdateste.jpg"
        })).rejects.toThrow()
    })

    it("Should not able to create new feedback with an invalid screenshot ", async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example",
            screenshot: "test.jpg"
        })).rejects.toThrow()
    })
})