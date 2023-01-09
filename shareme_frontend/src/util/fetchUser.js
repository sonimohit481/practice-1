
// because we are many times getting the user from local storage
export const fetchUser = () => {
    const userInfo =
        localStorage.getItem("user") !== undefined
            ? JSON.parse(localStorage.getItem("user"))
            : localStorage.clear();
    return userInfo;
}
