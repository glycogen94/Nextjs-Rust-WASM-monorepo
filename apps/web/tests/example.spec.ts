import { expect, test } from '@playwright/test';

test('homepage has correct title and links', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Expect the page to have the correct title
  await expect(page).toHaveTitle(/Next\.js \+ Rust WASM App/);

  // Expect the heading to be visible
  const heading = page.getByRole('heading', {
    name: /Next\.js \+ Rust \(WASM\) Monorepo/i,
  });
  await expect(heading).toBeVisible();

  // Check for the demo link
  const demoLink = page.getByRole('link', { name: /Try WASM Demo/i });
  await expect(demoLink).toBeVisible();
  await expect(demoLink).toHaveAttribute('href', '/demo');

  // Check for the GitHub link
  const githubLink = page.getByRole('link', { name: /View on GitHub/i });
  await expect(githubLink).toBeVisible();
  await expect(githubLink).toHaveAttribute(
    'href',
    'https://github.com/glycogen94/Nextjs-Rust-WASM-monorepo',
  );
});

// This test will require the app to be built and WASM to be properly working
test('WASM demo page loads and functions properly', async ({ page }) => {
  // Navigate to the demo page
  await page.goto('/demo');

  // Expect the page to have a heading
  const heading = page.getByRole('heading', { name: /WebAssembly Demo/i });
  await expect(heading).toBeVisible();

  // Check for the back link
  const backLink = page.getByRole('link', { name: /Back to Home/i });
  await expect(backLink).toBeVisible();
  await expect(backLink).toHaveAttribute('href', '/');

  // Wait for WASM to load
  await page.waitForFunction(
    () => {
      return !document.body.textContent?.includes('Loading WASM module...');
    },
    { timeout: 10000 },
  );

  // Check if calculation buttons are available
  const addButton = page.getByRole('button', {
    name: /Calculate 5 \+ 7 using WASM/i,
  });
  await expect(addButton).toBeVisible();

  const greetButton = page.getByRole('button', {
    name: /Get Greeting from WASM/i,
  });
  await expect(greetButton).toBeVisible();

  const fibButton = page.getByRole('button', { name: /Calculate Fibonacci/i });
  await expect(fibButton).toBeVisible();
});
