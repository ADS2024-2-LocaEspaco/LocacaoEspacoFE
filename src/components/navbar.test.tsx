// Navbar.test.tsx
import React from 'react';

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';

import Navbar from './navbar';

// Mock do hook useRouter
jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

describe('Navbar component', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn()
        })
    })

    test('renders Menu component', () => {
        render(<Navbar />)

        // Verifica se o Menu está presente na renderização
        const logo = screen.getByTestId('logo-icon')
        const searchInput = screen.getByRole('textbox')
        const searchButton = screen.getByTestId('search-icon')

        expect(logo).toBeInTheDocument()
        expect(searchInput).toBeInTheDocument()
        expect(searchButton).toBeInTheDocument()
    })

    test('opens and closes MobileMenuNavbar when mobile menu is toggled', () => {
        render(<Navbar />)

        // Verifica se MobileMenuNavbar não está presente inicialmente
        expect(screen.queryByText('Home')).not.toBeInTheDocument() 

        // Simula a abertura do menu móvel
        fireEvent.click(screen.getByAltText('Botão do menu'))

        // Verifica se o MobileMenuNavbar está presente após abrir o menu
        expect(screen.getByText('Home')).toBeInTheDocument()
    })
})
