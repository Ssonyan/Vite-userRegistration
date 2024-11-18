import {
    validateName,
    validateEmail,
    validatePostalCode,
    calculateAge,
    isAdult
} from './validation.js';
import { describe, test, expect } from 'vitest';


describe('Validation Functions', () => {
    test('validateName handles valid names', () => {
        expect(validateName('Jean-Pierre')).toBeTruthy();
        expect(validateName('Château')).toBeTruthy();
        expect(validateName('Marie Ange')).toBeTruthy();
    });

    test('validateName rejects invalid names', () => {
        expect(validateName('Jean123')).toBeFalsy();
        expect(validateName('Marie@')).toBeFalsy();
    });

    test('validateEmail validates correct emails', () => {
        expect(validateEmail('test@example.com')).toBeTruthy();
        expect(validateEmail('user.name+tag@example.co.uk')).toBeTruthy();
    });

    test('validateEmail rejects invalid emails', () => {
        expect(validateEmail('invalid-email')).toBeFalsy();
        expect(validateEmail('test@')).toBeFalsy();
    });

    test('validatePostalCode works for French postal codes', () => {
        expect(validatePostalCode('75001')).toBeTruthy();
        expect(validatePostalCode('13001')).toBeTruthy();
        expect(validatePostalCode('69001')).toBeTruthy();
    });

    test('calculateAge calculates correct age', () => {
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        expect(calculateAge(eighteenYearsAgo.toISOString().split('T')[0])).toBe(18);
    });

    test('isAdult checks age correctly', () => {
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        const seventeenYearsAgo = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());

        expect(isAdult(eighteenYearsAgo.toISOString().split('T')[0])).toBeTruthy();
        expect(isAdult(seventeenYearsAgo.toISOString().split('T')[0])).toBeFalsy();
    });
});