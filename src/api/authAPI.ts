import api from "./configs/axiosConfigs.ts"


export const AuthAPI = {

    login: async function (email: string, password: string) {
        const response = await api.request({
            url: `/auth/token/`,
            method: "POST",
            data: { email, password },
        })

        return response.data
    }, 

    register: async function (email: string, password: string) {
        let location = "Kuala Lumpur";
        let contactNumber = "0123456789";
        let fullname = "John Doe";

        const response = await api.request({
            url: `/auth/register/`,
            method: "POST",
            data: { email, password, location, contactNumber, fullname },
        })

        return response.data
    },

}