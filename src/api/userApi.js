import axiosClient from './axiosClient';
import {toast} from "react-toastify";
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
        try{
            const url = `users`;
            return axiosClient.get(url);
        } catch(err){
            toast.error("ERROR: Can't fetch data");
            return null;
        }
    },
    getById: function (id) {
        const url = `users/${id}`;
        return axiosClient.get(url);
    },
    post: function (body) {
        try{
            const url = `users`;
            return axiosClient.post(url, JSON.stringify(body));
        } catch(err){
            toast.error(err);
            return null;
        }
    },
    putById: function (id, body) {
            const url = `users/${id}`;
            return axiosClient.put(url, JSON.stringify(body));

    },
    deleteById: function (id) {
        try{
            const url = `users/${id}`;
            return axiosClient.delete(url);
        } catch(err){
            toast.error(err);
            return null;
        }
    },
}
export default userApi;