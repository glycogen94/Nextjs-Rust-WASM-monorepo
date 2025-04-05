import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home Page', () => {
  it('renders the heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Next\.js \+ Rust \(WASM\) Monorepo/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders the demo link', () => {
    render(<Home />);

    const demoLink = screen.getByRole('link', {
      name: /Try WASM Demo/i,
    });

    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute('href', '/demo');
  });

  it('renders the GitHub link', () => {
    render(<Home />);

    const githubLink = screen.getByRole('link', {
      name: /View on GitHub/i,
    });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/glycogen94/Nextjs-Rust-WASM-monorepo',
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
  });
});
