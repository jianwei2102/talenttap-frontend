import QuestionSection from "../models/QuestionSection.ts";
import api from "./configs/axiosConfigs.ts";

export const TechnicalAssessmentAPI = {
	get: async function (id: number) {
		const response = await api.request({
			url: `/skillAssessments/${id}/questions/`,
			method: "GET",
		});

		return response.data;
	},

	post: async function (skillAssessmentId, questions: QuestionSection[]) {
		const response = await api.request({
			url: `/skillAssessmentAnswers/bulk/`,
			method: "POST",
			data: { skillAssessmentId, questions },
		});

		return response.data;
    },
};
