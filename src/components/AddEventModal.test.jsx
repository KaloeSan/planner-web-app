import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddEventModal from './AddEventModal';
import AppContext from '../context/AppContext';
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('react-toastify');
jest.mock('../config/firebase', () => ({
  db: {}
}));

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(() => Promise.resolve()),
  collection: jest.fn(),
  Timestamp: {
    fromDate: jest.fn(),
    now: jest.fn()
  }
}));

describe('AddEventModal Component', () => {
  const mockCloseAddEventModal = jest.fn();
  const defaultContextValue = {
    user: { uid: 'testUser' },
    showAddEventModal: true,
    closeAddEventModal: mockCloseAddEventModal,
    selectedSlot: {
      start: new Date('2024-01-01T10:00:00'),
      end: new Date('2024-01-01T11:00:00')
    }
  };

  const renderWithContext = (component) => {
    return render(
      <AppContext.Provider value={defaultContextValue}>
        {component}
      </AppContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when showAddEventModal is true', () => {
    renderWithContext(<AddEventModal />);
    expect(screen.getByRole('heading', { name: /add event/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Event Title')).toBeInTheDocument();
  });

  it('hides the modal when showAddEventModal is false', () => {
    render(
      <AppContext.Provider value={{...defaultContextValue, showAddEventModal: false}}>
        <AddEventModal />
      </AppContext.Provider>
    );
    expect(screen.queryByRole('heading', { name: /add event/i })).not.toBeInTheDocument();
  });

  it('handles form input changes', () => {
    renderWithContext(<AddEventModal />);
    const titleInput = screen.getByPlaceholderText('Event Title');
    
    fireEvent.change(titleInput, { target: { value: 'Test Event' } });
    expect(titleInput).toHaveValue('Test Event');
  });

  it('shows error when submitting empty form', () => {
    renderWithContext(<AddEventModal />);
    const submitButton = screen.getByRole('button', { name: /add event/i });
    
    fireEvent.click(submitButton);
    expect(toast.error).toHaveBeenCalledWith('Event title is required');
  });

  it('handles all-day event submission', async () => {
    const { addDoc } = require('firebase/firestore');
    addDoc.mockResolvedValueOnce({});
    
    renderWithContext(<AddEventModal />);
    
    // Fill in title
    fireEvent.change(screen.getByPlaceholderText('Event Title'), {
      target: { value: 'All Day Event' }
    });
    
    // Check all-day box
    const allDayCheckbox = screen.getByRole('checkbox', { name: /all day/i });
    fireEvent.click(allDayCheckbox);
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /add event/i }));
    
    await Promise.resolve();
    
    expect(addDoc).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Event added successfully');
  });

  it('closes modal when close button is clicked', () => {
    renderWithContext(<AddEventModal />);
    const closeButton = screen.getByRole('button', { name: '' });
    
    fireEvent.click(closeButton);
    expect(mockCloseAddEventModal).toHaveBeenCalled();
  });
});