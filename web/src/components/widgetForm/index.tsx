import { CloseButton } from "../CloseButton";

import bugImgUrl from "../../assests/Bug.svg"
import ideaImgUrl from "../../assests/Idea.svg"
import othersImgUrl from "../../assests/Thought.svg"
import { useState } from "react";
import { FeedbackTyepStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccess } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImgUrl,
            alt: "igamen de um inseto"
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImgUrl,
            alt: "igamen de uma lamapda"
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: othersImgUrl,
            alt: "igamen de um balao de pensamento "
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)


    function handleRestartFeedback() {
        setFeedbackType(null)
        setFeedbackSent(false)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-full">

            {feedbackSent ? (
                <FeedbackSuccess onFeedbackRestart={handleRestartFeedback} />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTyepStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep feedbackType={feedbackType} onFeedbackRestart={handleRestartFeedback} onFeedbackSent={() => setFeedbackSent(true)} />
                    )
                    }
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito por renato <a className="underline underline-offset-2" target="_blank" href="https://github.com/renatobh83">GitHub</a>
            </footer>
        </div>
    )
}