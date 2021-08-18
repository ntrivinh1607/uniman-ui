import axiosClient from './axiosClient';
const permissionApi = {
    getAll: function () {
        const url = `permissions`;
        return axiosClient.get(url);
    },
    getById: function (id) {
        const url = `permissions/${id}`;
        return axiosClient.get(url);
    },
    post: function (body) {
        const url = `permissions`;
        return axiosClient.post(url, body);
    },
    putById: function (id, body) {
        const url = `permissions/${id}`;
        return axiosClient.put(url, body);

    },
    deleteById: function (id) {
        const url = `permissions/${id}`;
        return axiosClient.delete(url);

    },
}
export default permissionApi;