export const REGEX = {
    NUMBER_ONLY: /^[0-9]([.,][0-9])?$/,
    DIGIT_ONLY: /^[0-9]+$/,
    FORMAT_NUMBER: /(\d)(?=(\d{3})+(?!\d))/g,
    FORMAT_EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
export const TOAST_ENUM = {
    DURATION: 1500,
};
export const POSITION = {
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right",
    TOP_CENTER: "top-center",
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right",
    BOTTOM_CENTER: "bottom-center",
};

export const DEFAULT_PASSWORD = "newpassword";

export const ROLES = {
    STUDENT: 1,
    TEACHER: 2,
    MANAGER: 3,
    ADMIN: 4,
};

export const ROLES_MESSAGE = {
    NO_PERMISSION: "NO_PERMISSION",
    UNAUTHORIZED: "Unauthorized",
};