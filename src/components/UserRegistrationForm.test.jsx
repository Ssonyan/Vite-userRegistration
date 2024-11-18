import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'react-toastify';
import UserRegistrationForm from './UserRegistrationForm';

vi.mock('react-toastify', () => ({
    toast: { success: vi.fn(), error: vi.fn() },
    ToastContainer: () => null
}));

describe('UserRegistrationForm', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('renders all form fields', () => {
        render(<UserRegistrationForm />);
        expect(screen.getByTestId('firstName-input')).toBeInTheDocument();
        expect(screen.getByTestId('lastName-input')).toBeInTheDocument();
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('birthdate-input')).toBeInTheDocument();
        expect(screen.getByTestId('city-input')).toBeInTheDocument();
        expect(screen.getByTestId('postalCode-input')).toBeInTheDocument();
    });

    it('disables submit button initially', () => {
        render(<UserRegistrationForm />);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('enables submit button when all fields are filled', () => {
        render(<UserRegistrationForm />);

        Object.entries({
            'firstName-input': 'Jean',
            'lastName-input': 'Dupont',
            'email-input': 'jean@example.com',
            'birthdate-input': '1990-01-01',
            'city-input': 'Paris',
            'postalCode-input': '75001'
        }).forEach(([testId, value]) => {
            fireEvent.change(screen.getByTestId(testId), {
                target: { value }
            });
        });

        expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('shows validation errors for invalid inputs', async () => {
        render(<UserRegistrationForm />);

        const invalidData = {
            'firstName-input': 'Jean123',
            'lastName-input': 'Dupont@',
            'email-input': 'invalid-email',
            'birthdate-input': '2010-01-01',
            'city-input': 'Paris',
            'postalCode-input': '123'
        };

        Object.entries(invalidData).forEach(([testId, value]) => {
            fireEvent.change(screen.getByTestId(testId), {
                target: { name: testId.split('-')[0], value }
            });
        });

        fireEvent.submit(screen.getByRole('button').closest('form'));

        await screen.findByText('Prénom invalide');
        await screen.findByText('Nom invalide');
        await screen.findByText('Email invalide');
        await screen.findByText('Vous devez être majeur');
        await screen.findByText('Code postal invalide');
        expect(toast.error).toHaveBeenCalled();
    });

    it('saves to localStorage and shows success toast on valid submission', () => {
        render(<UserRegistrationForm />);

        const validData = {
            'firstName-input': 'Jean',
            'lastName-input': 'Dupont',
            'email-input': 'jean@example.com',
            'birthdate-input': '1990-01-01',
            'city-input': 'Paris',
            'postalCode-input': '75001'
        };

        Object.entries(validData).forEach(([testId, value]) => {
            fireEvent.change(screen.getByTestId(testId), {
                target: { name: testId.split('-')[0], value }
            });
        });

        fireEvent.submit(screen.getByRole('button').closest('form'));

        const expectedData = {
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean@example.com',
            birthdate: '1990-01-01',
            city: 'Paris',
            postalCode: '75001'
        };

        expect(JSON.parse(localStorage.getItem('userData'))).toEqual(expectedData);
        expect(toast.success).toHaveBeenCalledWith('Enregistrement réussi !');
    });

    it('handles field changes correctly', () => {
        render(<UserRegistrationForm />);
        const input = screen.getByLabelText(/prénom/i);

        fireEvent.change(input, {
            target: { name: 'firstName', value: 'Test' }
        });

        expect(input.value).toBe('Test');
    });
});