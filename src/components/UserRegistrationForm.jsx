import {useState} from 'react';
import {validateName, validateEmail, validatePostalCode, isAdult} from '../utils/validation.js';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        city: '',
        postalCode: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!validateName(formData.firstName)) {
            newErrors.firstName = 'Prénom invalide';
        }
        if (!validateName(formData.lastName)) {
            newErrors.lastName = 'Nom invalide';
        }
        if (!validateEmail(formData.email)) {
            newErrors.email = 'Email invalide';
        }
        if (!isAdult(formData.birthdate)) {
            newErrors.birthdate = 'Vous devez être majeur';
        }
        if (!formData.city) {
            newErrors.city = 'Ville requise';
        }
        if (!validatePostalCode(formData.postalCode)) {
            newErrors.postalCode = 'Code postal invalide';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            localStorage.setItem('userData', JSON.stringify(formData));
            toast.success('Enregistrement réussi !');

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                birthdate: '',
                city: '',
                postalCode: ''
            });
        } else {
            toast.error('Veuillez corriger les erreurs du formulaire');
        }
    };

    const isFormValid = Object.values(formData).every(value => value.trim() !== '');

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block mb-2">Prénom</label>
                    <input
                        data-testid="firstName-input"
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="lastName" className="block mb-2">Nom</label>
                    <input
                        data-testid="lastName-input"
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input
                        data-testid="email-input"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="birthdate" className="block mb-2">Date de Naissance</label>
                    <input
                        data-testid="birthdate-input"
                        id="birthdate"
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.birthdate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="city" className="block mb-2">Ville</label>
                    <input
                        data-testid="city-input"
                        id="city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="postalCode" className="block mb-2">Code Postal</label>
                    <input
                        data-testid="postalCode-input"
                        id="postalCode"
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full p-2 ${isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                    Enregistrer
                </button>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default UserRegistrationForm;