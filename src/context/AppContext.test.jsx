import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppContext from './AppContext';
import { toast } from 'react-toastify';

jest.mock('react-toastify');

const renderWithContext = (component, contextValue) => {
  return render(
    <AppContext.Provider value={contextValue}>
      {component}
    </AppContext.Provider>
  );
};

describe('AppContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles search functionality', () => {
    const mockSetQuery = jest.fn();
    const TestComponent = () => {
      const context = useContext(AppContext);
      return (
        <input
          type="text"
          onChange={(e) => context.setSearchQuery(e.target.value)}
          placeholder="Search"
        />
      );
    };

    renderWithContext(<TestComponent />, { setSearchQuery: mockSetQuery });

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'test query' }
    });

    expect(mockSetQuery).toHaveBeenCalledWith('test query');
  });

  it('handles adding notes', () => {
    const mockAddNote = jest.fn();
    const mockCloseModal = jest.fn();
    const testNote = {
      noteTitle: 'Test Title',
      noteContent: 'Test Content'
    };

    const TestComponent = () => {
      const context = useContext(AppContext);
      return (
        <>
          <button onClick={() => context.addNote(testNote)}>Add Note</button>
          <button onClick={context.closeAddNoteModal}>Close</button>
        </>
      );
    };

    renderWithContext(<TestComponent />, {
      addNote: mockAddNote,
      closeAddNoteModal: mockCloseModal,
      showAddNoteModal: true
    });

    fireEvent.click(screen.getByText('Add Note'));
    expect(mockAddNote).toHaveBeenCalledWith(testNote);

    fireEvent.click(screen.getByText('Close'));
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('handles editing notes', () => {
    const mockEditNote = jest.fn();
    const mockCloseModal = jest.fn();
    const testNote = {
      id: '1',
      noteTitle: 'Test Title',
      noteContent: 'Test Content'
    };

    const TestComponent = () => {
      const context = useContext(AppContext);
      return (
        <>
          <button onClick={() => context.editForm(testNote)}>Edit</button>
          <button onClick={context.closeEditModal}>Close Edit</button>
        </>
      );
    };

    renderWithContext(<TestComponent />, {
      editForm: mockEditNote,
      closeEditModal: mockCloseModal
    });

    fireEvent.click(screen.getByText('Edit'));
    expect(mockEditNote).toHaveBeenCalledWith(testNote);

    fireEvent.click(screen.getByText('Close Edit'));
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('handles deleting notes', () => {
    const mockDeleteNote = jest.fn();
    const mockCloseModal = jest.fn();
    const testNote = { id: '1', title: 'Test Note' };

    const TestComponent = () => {
      const context = useContext(AppContext);
      return (
        <>
          <button onClick={() => context.initDeleteNoteModal(testNote)}>
            Delete Note
          </button>
          <button onClick={context.closeDeleteModal}>Cancel</button>
        </>
      );
    };

    renderWithContext(<TestComponent />, {
      initDeleteNoteModal: mockDeleteNote,
      closeDeleteModal: mockCloseModal
    });

    fireEvent.click(screen.getByText('Delete Note'));
    expect(mockDeleteNote).toHaveBeenCalledWith(testNote);

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('handles filtering notes', () => {
    const notes = [
      { id: '1', noteTitle: 'Test Note', noteContent: 'Content' },
      { id: '2', noteTitle: 'Another Note', noteContent: 'More content' }
    ];

    const TestComponent = () => {
      const context = useContext(AppContext);
      return (
        <div>
          {context.filteredNotes.map(note => (
            <div key={note.id}>{note.noteTitle}</div>
          ))}
        </div>
      );
    };

    renderWithContext(<TestComponent />, {
      notes,
      filteredNotes: notes
    });

    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('Another Note')).toBeInTheDocument();
  });

  it('handles event modal operations', () => {
    const mockOpenEventModal = jest.fn();
    const mockCloseEventModal = jest.fn();
    const testEvent = { id: '1', title: 'Test Event' };

    const TestComponent = () => {
      const context = useContext(AppContext);
      return (
        <>
          <button onClick={() => context.openEditEventModal(testEvent)}>
            Edit Event
          </button>
          <button onClick={context.closeEditEventModal}>
            Close Edit
          </button>
        </>
      );
    };

    renderWithContext(<TestComponent />, {
      openEditEventModal: mockOpenEventModal,
      closeEditEventModal: mockCloseEventModal
    });

    fireEvent.click(screen.getByText('Edit Event'));
    expect(mockOpenEventModal).toHaveBeenCalledWith(testEvent);

    fireEvent.click(screen.getByText('Close Edit'));
    expect(mockCloseEventModal).toHaveBeenCalled();
  });
});
