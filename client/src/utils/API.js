import axios from "axios";

export default {
    signUp: async function (userdata) {
        const data = await axios.post("/api/signup", userdata);
        return data;
    },

    logIn: async function (userdata) {
        const { status } = await axios.post("/api/login", userdata);
        return status;
    },

    logOut: async function () {
        await axios.get('api/logout');
        return console.log("Logged Out!");
    },

    checkAuth: async function () {
        const { data } = await axios.get("api/checkAuthentication");

        return data;
    },

    // API call to publish a new survey, it creates the survey with Uuid, then creates all questions related to Uuid,
    // And finally creates all answers as related to QuestionId
    publish: async function (user, survey, questions, answers) {
        await axios.post("/api/create-survey", { user, survey, questions, answers });

        return console.log("Survey Published!");
    },

    // API call to return all information about any survey based on that surveys Uuid
    // Return data[0] returns a JSON object, as data is naturally a single JSON object inside an array ex. [{}]
    getSurveyById: async function (uuid) {
        const { data } = await axios.get(`/api/get-survey/${uuid}`);

        return data[0];
    },

    // API call to return all surveys created by a specific user based on userId, returns full survey information
    // Returns full data variable because it is a multi-item array ex. [{}, {}, {}]
    getUserSurveys: async function () {
        const { data } = await axios.get("/api/get-user-surveys");

        return data;
    },

    // Return all surveys marked as public, removing all marked as private
    getPublicSurveys: async function () {
        const { data } = await axios.get("/api/get-public-surveys");

        return data;
    },

    // API call to return the results of a survey, returning survey name, all questions prompts with associated answers,
    // All answers have associated answer counts.  Once again data is naturally a single JSON object inside an array
    getAnswerCounts: async function (uuid) {
        const { data } = await axios.get(`/api/get-answer-count/${uuid}`);

        return data[0];
    },

    // API call to submit taken survey responses.  Takes an array of answer IDs, ex. [1, 3, 6], and increments the count
    // In the associated answer
    submitResults: async function (answerArr) {
        await axios.put("/api/increment-answers", answerArr);

        return console.log("Answers Submitted!");
    },

    //api call to delete survey
    deleteSurvey: async function (uuid) {
        await axios.delete(`api/delete/${uuid}`);

        return window.location.reload(false);
    },

    // Remove user by id
    deleteUser: async function () {
        await axios.delete(`api/deleteUser`);

        return console.log("User deleted!");
    }
};
