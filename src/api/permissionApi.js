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
        return axiosClient.post(url, JSON.stringify(body));
    },
    putById: function (id, body) {
        const url = `permissions/${id}`;
        return axiosClient.put(url, JSON.stringify(body));

    },
    deleteById: function (id) {
        const url = `permissions/${id}`;
        return axiosClient.delete(url);

    },
}
export default permissionApi;