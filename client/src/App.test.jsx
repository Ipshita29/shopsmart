import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

describe('PetKit Now Frontend', () => {
    // Task 5: Check initial title
    it('should render the PetKit Now header', () => {
        render(<App />);
        expect(screen.getByText(/PetKit Now/i)).toBeDefined();
        expect(screen.getByText(/Premium Supplies/i)).toBeDefined();
    });

    // Task 6/9: Unit test for Cart (Mocking API)
    it('should add to cart when the Add button is clicked', async () => {
        // Mock product data for the test
        const mockProducts = [{ id: 1, name: 'Test Food', price: 10.00, description: 'Yummy' }];
        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve(mockProducts),
        });

        render(<App />);
        
        // Wait for the mock product to appear
        const addBtn = await waitFor(() => screen.getByText(/\+ Add/i));
        fireEvent.click(addBtn);

        // Check if cart counter updated
        expect(screen.getByText(/Cart \(1\)/i)).toBeDefined();
    });
});
