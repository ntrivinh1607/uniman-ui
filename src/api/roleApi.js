import axiosClient from './axiosClient';
const roleApi = {
    getAll: function () {
        const url = `roles`;
        return axiosClient.get(url);
    },
    getListName: function () {
        const url = `roles/get-all-name`;
        return axiosClient.get(url);
    },
    getById: function (id) {
        const url = `roles/${id}`;
        return axiosClient.get(url);
    },
    post: function (body) {
        const url = `roles`;
        return axiosClient.post(url, JSON.stringify(body));
    },
    putById: function (id, body) {
        const url = `roles/${id}`;
        return axiosClient.put(url, JSON.stringify(body));

    },
    deleteById: function (id) {
        const url = `roles/${id}`;
        return axiosClient.delete(url);

    },
}
export default roleApi;