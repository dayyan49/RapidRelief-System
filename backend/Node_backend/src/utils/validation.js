// 🔹 email validation
export const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
};


// 🔹 password validation
export const isValidPassword = (password) => {
    return password && password.length >= 6;
};


// 🔹 phone validation
export const normalizePhone = (phoneNumber) => {
    return phoneNumber ?.replace(/\D/g, "");
};


// 🔹 severity validation
export const isValidSeverity = (severity) => {
    return (
      severity >= 1 && severity <= 10
    );
};