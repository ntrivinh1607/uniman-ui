import { BehaviorSubject } from "rxjs";
import userApi from "../api/userApi";
const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem("curUser"))
);
const signin = async (user) => {
    const response = await userApi.signin(user);
    console.log(response)
    if (response.token) {
        localStorage.setItem(
            "token",
            JSON.stringify({
                refreshToken: response.refreshToken,
                accessToken: response.token,
            })
        );
        const curUser = { id: response.id, username: response.username, role: response.role }
        localStorage.setItem("curUser", JSON.stringify(curUser));
        currentUserSubject.next(curUser);
    }
    return response;
};

function signout() {
    // remove user from local storage to log user out
    localStorage.removeItem("curUser");
    localStorage.removeItem("token");
    currentUserSubject.next(null);
}
const changeCurrentUser = (curUser) => {
    currentUserSubject.next(curUser);
};
const authenticationService = {
    signin,
    signout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    },
    changeCurrentUser,
};

export default authenticationService;