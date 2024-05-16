import QuestionSection from "../models/QuestionSection.ts";
import api from "./configs/axiosConfigs.ts";

export const TechnicalAssessmentResultAPI = {
	get: async function (id: number) {
		const response = await api.request({
			url: `/skillAssessments/${id}/questions/`,
			method: "GET",
		});

		return response.data;
	},
};
