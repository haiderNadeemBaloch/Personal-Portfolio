import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

// Mock fetch for the contact API
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ success: true }),
}) as unknown as typeof fetch;

describe('ContactPage', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<ContactPage />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/please enter your name/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please enter your email address/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please enter a message/i)
    ).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();
  });

  it('shows email validation error for invalid email', async () => {
    render(<ContactPage />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'This is a valid message content.' },
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/please enter a valid email address/i)
    ).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();
  });

  it('submits when form is valid and shows success toast', async () => {
    render(<ContactPage />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'This is a valid message content.' },
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    expect(
      await screen.findByText(/message sent successfully/i)
    ).toBeInTheDocument();
  });
});
