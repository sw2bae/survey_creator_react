import React from "react";
import { useQuestionContext } from "../utils/CreateQuestionState";
import API from "../utils/API";
import { v4 as uuidv4 } from 'uuid';

function SubmitSurvey({ manipulatePopOut }) {
    const [state] = useQuestionContext();
    const uuid = uuidv4();

    function submitClick(e) {
        e.preventDefault();

        if (state.survey_title && state.questions.length > 0) {
            let answers = [];
            const questions = state.questions.map((questionItem, i) => {
                questionItem.SurveyUuid = uuid;
                questionItem.contents.forEach((answer) => {
                    if (answer) {
                        const item = { answer };
                        item.QuestionId = i;
                        answers.push(item);
                    }
                });
                delete questionItem.id;
                delete questionItem.contents;
                return questionItem;
            });

            API.publish(
                state.user,
                {
                    publicity: state.publicity,
                    survey_name: state.survey_title,
                    uuid: uuid,
                },
                questions,
                answers
            );
            
            window.location.replace("/home");
        } else {
            !state.survey_title ? console.error("Please title the survey!") : console.error("Add at least one question!");
        }
    }

    return (
        <div className="flex">
            <button className="mx-auto p-2 bg-light rounded-full w-40 self-end" onClick={((state.user.rank === "guest") && state.survey_title && state.questions.length > 0) ? manipulatePopOut : submitClick} type="button">Publish Survey</button>
        </div>
    );
}

export default SubmitSurvey;