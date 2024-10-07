import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FakeClient from '../api/FakeClient';
import { Project } from '../components/Project';
describe('Project Component', () => {
  let client: FakeClient;

  beforeEach(() => {
    client = new FakeClient();
  });

  test('renders the project name and stages after fetching data', async () => {
    render(<Project client={client} />);

    await screen.findByText('Project 1');

    const stages = await screen.findAllByTestId('stage-column')
    await waitFor(() => {
      expect(stages).toHaveLength(2)
    });
  });

  test('can add a new stage to the project', async () => {
    render(<Project client={client} />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('add-stage-btn'));
    });
    await waitFor(() => {
      expect(screen.getByTestId('add-stage-modal')).toBeInTheDocument();
    });
    
    const input = screen.getByPlaceholderText('Add stage');
    fireEvent.change(input, { target: { value: 'New Stage' } });
    fireEvent.click(screen.getByText('Submit'));

    await screen.findByText('New Stage');
  });


  test('can add a new case to the first stage', async () => {
    render(<Project client={client} />);

    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('create-case-btn'));
    });
    expect(screen.getByTestId('create-case-modal')).toBeInTheDocument();
    
    const input = screen.getByPlaceholderText(/Create Case/);
    fireEvent.change(input, { target: { value: 'New Case 1' } });
    fireEvent.click(screen.getByText('Submit'));
    
    await screen.findByText('New Case 1');
  });
});
