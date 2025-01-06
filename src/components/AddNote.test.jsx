import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddNote from './AddNote';
import AppContext from '../context/AppContext';
import { toast } from 'react-toastify';

jest.mock('react-toastify');

const mockAddNote = jest.fn();

const renderWithContext = (component) => {
    return render(
        <AppContext.Provider value={{ 
            addNote: mockAddNote,
            showAddNoteModal: true,
            closeAddNoteModal: jest.fn()
        }}>
            {component}
        </AppContext.Provider>
    );
};

describe('AddNote Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the AddNote form', () => {
        renderWithContext(<AddNote />);
        expect(screen.getByPlaceholderText('Note Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Note Content')).toBeInTheDocument();
        expect(screen.getByText('Add Note')).toBeInTheDocument();
    });

    it('calls addNote with correct values when form is submitted', async () => {
        renderWithContext(<AddNote />);
        
        const testTitle = 'Test Title';
        const testContent = 'Test Content';
        
        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Note Title'), {
                target: { value: testTitle }
            });
            
            fireEvent.change(screen.getByPlaceholderText('Note Content'), {
                target: { value: testContent }
            });
            
            fireEvent.click(screen.getByText('Add Note'));
        });

        expect(mockAddNote).toHaveBeenCalled();
    });

    it('validates required fields', async () => {
        renderWithContext(<AddNote />);

        await act(async () => {
            fireEvent.click(screen.getByText('Add Note'));
        });

        expect(screen.getByText('Note title is required')).toBeInTheDocument();
        expect(screen.getByText('Note content is required')).toBeInTheDocument();
    });

    it('validates minimum length requirements', async () => {
        renderWithContext(<AddNote />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Note Title'), {
                target: { value: 'A' }
            });

            fireEvent.change(screen.getByPlaceholderText('Note Content'), {
                target: { value: 'ABC' }
            });

            fireEvent.click(screen.getByText('Add Note'));
        });

        expect(screen.getByText('The title must be at least 2 characters in length')).toBeInTheDocument();
        expect(screen.getByText('The note must be at least 4 characters in length')).toBeInTheDocument();
    });

    it('clears form after successful submission', async () => {
        renderWithContext(<AddNote />);
        
        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Note Title'), {
                target: { value: 'Valid Title' }
            });
            
            fireEvent.change(screen.getByPlaceholderText('Note Content'), {
                target: { value: 'Valid Content' }
            });
            
            fireEvent.click(screen.getByText('Add Note'));
        });

        expect(screen.getByPlaceholderText('Note Title')).toHaveValue('');
        expect(screen.getByPlaceholderText('Note Content')).toHaveValue('');
    });
});