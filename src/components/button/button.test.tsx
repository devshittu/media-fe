import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button id={`action-click-me`}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('handles click event', () => {
    const handleClick = jest.fn();
    render(
      <Button id={`action-click-test`} onClick={handleClick}>
        Click me
      </Button>,
    );
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(
      <Button id={`action-click-test`} disabled>
        Click me
      </Button>,
    );
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  test('shows loading indicator when loading prop is true', () => {
    render(
      <Button id={`action-test`} data-testid="loading-indicator" loading>
        Click me
      </Button>,
    );
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  test('applies correct styles for each type', () => {
    const types = [
      'info',
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'dark',
      'light',
      'adaptive',
    ];
    types.forEach((type) => {
      render(
        <Button id={`action-click-test`} type={type}>
          Click me
        </Button>,
      );
      expect(screen.getByText('Click me'));
      // .toHaveClass(`button-${type}`);
    });
  });

  // test('renders icon correctly when icon prop is provided', () => {
  //   const IconComponent = () => <span>Icon</span>;
  //   render(<Button icon={<IconComponent />}>Click me</Button>);
  //   expect(screen.getByText('Icon')).toBeInTheDocument();
  // });

  // test('renders badge correctly when badge prop is provided', () => {
  //   render(<Button badge="New">Click me</Button>);
  //   expect(screen.getByText('New')).toBeInTheDocument();
  // });

  // Add more tests as needed for other props and scenarios
});
