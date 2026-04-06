import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

describe('PetKit Now Frontend', () => {
    // Task 5: Check initial title
    it('should render the PetKit Now header', () => {
        render(<App />);
        // Using getAllByText since "Premium Supplies" appears in both header and loading state
        expect(screen.getByText(/PetKit Now/i)).toBeDefined();
        const subtext = screen.getAllByText(/Premium Supplies/i);
        expect(subtext.length).toBeGreaterThan(0);
    });

    // Task 6/9: Unit test for Cart (Mocking API)
    it('should add to cart when the Add button is clicked', async () => {
        // Mock product data for the test
        const mockProducts = [{ id: 1, name: 'Test Food', price: 10.00, description: 'Yummy' }];
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockProducts),
        });

        render(<App />);
        
        // Wait for the mock product to appear and remove the loading state
        const addBtn = await waitFor(() => screen.getByRole('button', { name: /\+ Add/i }));
        fireEvent.click(addBtn);

        // Check if cart counter updated
        expect(screen.getByText(/Cart \(1\)/i)).toBeDefined();
    });
});
