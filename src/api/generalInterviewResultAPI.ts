import QuestionSection from "../models/QuestionSection.ts";
import api from "./configs/axiosConfigs.ts";

export const GeneralInterviewResultAPI = {
	get: async function (id: number, candidateId: number) {
		const response = await api.request({
			url: `/generalInterviews/${id}/answers/${candidateId}/`,
			method: "GET",
		});

		return response.data;
	},
};
