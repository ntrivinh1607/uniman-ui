export const isNotNull = (value) => {
    if (
        !value ||
        (typeof value === "string" && value?.toLocaleLowerCase() === "null")
    ) {
        return false;
    }
    return value;
};

export const formatTimestamp = (data) => {
    let d = new Date(data);
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0].replace(/:/g, ":");
    return `${date} ${time}`;
};

export const validatePassword = (pwd) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
    if (pattern.test(pwd)) {
        return true;
    }
    return false;
}

export const isErrors = (error) => {
    // eslint-disable-next-line
    console.log("🚀 ~ file: utils.js ~ line 28 ~ isErrors ~ error", error)
    if ( typeof(error) === "undefined" || error === null ) {
        return false;
    }
    if(typeof error === 'object'){
        if(Object.keys(error).length){
            return true;
        }
    }
    return false;

}