import axios from "axios";
import queryString from "query-string";
import constantConfig from "../constants/config";
import { RoutesString } from "../pages/routesString";
import { ROLES_MESSAGE } from "../constants/constants";

const axiosClient = axios.create({
    baseURL: constantConfig.API.INDEX,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    (config) => {
        if (config.url === RoutesString.SIGNIN) {
            return config;
        }
        if (localStorage.getItem("token")) {
            const accessToken = JSON.parse(localStorage.getItem("token"))
                .accessToken;
            if (accessToken !== null) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

const handleRefreshToken = async (refreshToken) => {
    try {
        const response = await axiosClient.post(RoutesString.REFRESHTOKEN, {
            refreshToken,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async (error) => {
        if (
            // (error?.response?.data?.message === ROLES_MESSAGE.NO_PERMISSION ||
            //     error?.response?.data?.message === "AUTHORIZATION_ERROR") &&
            error.response.status === 403
        ) {
            return (window.location.href = RoutesString.ACCESS_DENIED);
        } else if (
            // error?.response?.data?.message === ROLES_MESSAGE.UNAUTHORIZED &&
            error?.response?.data?.status === 401
        ) {
            try {
                const { refreshToken = "" } = JSON.parse(
                    localStorage.getItem("token")
                );
                // not have refreshtoken yet, so cannot use code below...
                // const response = await handleRefreshToken(refreshToken);
                // localStorage.setItem(
                //     "token",
                //     JSON.stringify({
                //         refreshToken: response.refreshToken,
                //         accessToken: response.token,
                //     })
                // );
                // error.response.config.headers[
                //     `Authorization`
                //     ] = `Bearer ${response.token}`;
                return axios(error?.response?.config);

            } catch (error) {
                localStorage.clear();
                alert('TOKEN_INVALID');
                return (window.location.href = RoutesString.SIGNIN);
            }
        } else {
            return Promise.reject(error);
        }
    }
);

export default axiosClient;