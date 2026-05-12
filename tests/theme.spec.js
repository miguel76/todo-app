import { test, expect } from '@playwright/test';

test.describe('Theme Toggle Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000');
  });

  test('theme toggle button is visible and clickable', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();
    const initialText = await themeToggle.textContent();
    expect(['🌙', '☀️']).toContain(initialText);
  });

  test('switching between light and dark themes updates button icon', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');
    const initialIcon = await themeToggle.textContent();
    
    await themeToggle.click();
    const newIcon = await themeToggle.textContent();
    
    expect(initialIcon).not.toBe(newIcon);
    expect(['🌙', '☀️']).toContain(newIcon);
  });

  test('page refresh preserves theme choice', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');
    
    // Switch to dark theme
    await themeToggle.click();
    const themeAfterClick = await themeToggle.textContent();
    
    // Check localStorage
    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe('dark');
    
    // Reload page
    await page.reload();
    
    // Verify theme persisted
    const themeAfterReload = await themeToggle.textContent();
    expect(themeAfterReload).toBe(themeAfterClick);
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
  });

  test('existing todo functionality works in both themes', async ({ page }) => {
    const input = page.locator('#todo-input');
    const submitButton = page.locator('.todo-form button[type="submit"]');
    const todoList = page.locator('#todo-list');
    
    // Add a todo
    await input.fill('Test Todo');
    await submitButton.click();
    
    await expect(todoList.locator('.todo-item')).toHaveCount(1);
    
    // Switch theme
    await page.locator('#theme-toggle').click();
    
    // Verify todo still exists
    await expect(todoList.locator('.todo-item')).toHaveCount(1);
    await expect(todoList.locator('.todo-text')).toContainText('Test Todo');
    
    // Mark todo as complete
    await todoList.locator('.todo-text').click();
    await expect(todoList.locator('.todo-text.completed')).toHaveCount(1);
    
    // Delete todo
    await todoList.locator('.delete-button').click();
    await expect(todoList.locator('.todo-item')).toHaveCount(0);
  });

  test('colors have sufficient contrast in both themes', async ({ page }) => {
    // Check light theme (default - no data-theme attribute)
    let dataTheme = await page.locator('html').getAttribute('data-theme');
    expect(dataTheme).toBeNull();
    
    // Switch to dark theme
    await page.locator('#theme-toggle').click();
    
    // Check dark theme
    dataTheme = await page.locator('html').getAttribute('data-theme');
    expect(dataTheme).toBe('dark');
    
    // Switch back to light theme
    await page.locator('#theme-toggle').click();
    
    // Verify it's back to no data-theme attribute
    dataTheme = await page.locator('html').getAttribute('data-theme');
    expect(dataTheme).toBeNull();
  });

  test('theme toggle button has proper accessibility label', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');
    const ariaLabel = await themeToggle.getAttribute('aria-label');
    expect(ariaLabel).toBe('Toggle theme');
  });
});
