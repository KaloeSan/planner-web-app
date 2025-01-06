import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteEventModal from './DeleteEventModal';
import AppContext from '../context/AppContext';
import { toast } from 'react-toastify';

jest.mock('react-toastify');
jest.mock('../config/firebase');

const mockDeleteEvent = jest.fn();
const mockCloseDeleteEventModal = jest.fn();

const renderWithContext = (component) => {
  return render(
    <AppContext.Provider 
      value={{
        showDeleteEventModal: true,
        closeDeleteEventModal: mockCloseDeleteEventModal,
        selectedEvent: { id: '1' }
      }}
    >
      {component}
    </AppContext.Provider>
  );
};

describe('DeleteEventModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the DeleteEventModal', () => {
    renderWithContext(<DeleteEventModal />);
    expect(screen.getByText('Delete Event')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls handleDeleteEvent on confirm', async () => {
    renderWithContext(<DeleteEventModal />);
    const confirmButton = screen.getByText('Confirm');
    await fireEvent.click(confirmButton);
    expect(toast.success).toHaveBeenCalledWith('Event deleted successfully');
    expect(mockCloseDeleteEventModal).toHaveBeenCalled();
  });

  it('calls closeDeleteEventModal on cancel', () => {
    renderWithContext(<DeleteEventModal />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockCloseDeleteEventModal).toHaveBeenCalled();
  });
});