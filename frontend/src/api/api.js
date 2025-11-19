import axiosApi from "./axios";

class Api {

    async getArticoli() {
        try {
            const response = await axiosApi.get('/api/articoli/all')
            console.log('Risposta articoli: ' + response.data)
            return response.data;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getOrdini() {
        try {
            const response = await axiosApi.get('/api/ordini/all')
            console.log('Risposta ordini: ' + response.data)
            return response.data
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async getTariffeCorrieri() {
        try {
            const response = await axiosApi.get('/api/tariffecorrieri/all')
            console.log('Risposta tariffe corrieri: ' + response.data)
            return response.data
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async addTariffaCorriere(payload) {
        try {
            const response = await axiosApi.post("/api/tariffecorrieri/add", payload)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getVoci() {
        try {
            const response = await axiosApi.get('/api/voci/all')
            console.log('Risposta voci: ' + response.data)
            return response.data
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
}

const api = new Api();
export default api;