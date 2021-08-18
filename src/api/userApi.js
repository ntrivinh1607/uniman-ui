import axiosClient from './axiosClient';
const userApi = {
    signin: (user) => {
        const url = "auth/signin";
        return axiosClient.post(url, user);
    },
    signup: (user) => {
        const url = "auth/signup";
        return axiosClient.post(url, user);
    },
    getAll: function () {
        const url = `users`;
        return axiosClient.get(url);
    },
    getById: function (id) {
        const url = `users/${id}`;
        return axiosClient.get(url);
    },
    post: function (body) {
        const url = `users`;
        return axiosClient.post(url, body);
    },
    putById: function (id, body) {
        const url = `users/${id}`;
        return axiosClient.put(url, body);

    },
    deleteById: function (id) {
        const url = `users/${id}`;
        return axiosClient.delete(url);
    },
}
export default userApi;