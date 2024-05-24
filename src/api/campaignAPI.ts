import QuestionSection from "../models/QuestionSection.ts";
import api from "./configs/axiosConfigs.ts";

export const CampaignAPI = {
	get: async function (id: number) {
		const response = await api.request({
			url: `/campaigns/${id}/`,
			method: "GET",
		});

		return response.data;
	},
};
