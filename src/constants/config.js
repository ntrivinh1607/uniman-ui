require("dotenv").config();
const REACT_APP_API_HOST =
    process.env.REACT_APP_API_HOST || "http://localhost:8080";
const CONFIG = {
    API: {
        INDEX: `${REACT_APP_API_HOST}/api`,
    }
}
export default CONFIG;