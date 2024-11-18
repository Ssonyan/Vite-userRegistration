export const validateName = (name) => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\-' ]+$/;
    return nameRegex.test(name);
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePostalCode = (postalCode) => {
    const postalCodeRegex = /^(0[1-9]|[1-9]\d)\d{3}$/;
    return postalCodeRegex.test(postalCode);
};

export const calculateAge = (birthdate) => {
    const today = new Date();
    const birthdateObj = new Date(birthdate);
    let age = today.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = today.getMonth() - birthdateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
        age--;
    }
    return age;
};

export const isAdult = (birthdate) => {
    return calculateAge(birthdate) >= 18;
};