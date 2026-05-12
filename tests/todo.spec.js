const { test, expect } = require('@playwright/test');

test('add complete and delete a todo', async ({ page }) => {
  await page.goto('/');
  await page.fill('#todo-input', 'Buy milk');
  await page.click('button:has-text("Add")');
  const item = page.locator('.todo-item').first();
  await expect(item.locator('.todo-text')).toHaveText('Buy milk');

  // toggle complete
  await item.locator('.todo-text').click();
  await expect(item.locator('.todo-text')).toHaveClass(/completed/);

  // delete
  await item.locator('.delete-button').click();
  await expect(page.locator('.todo-item')).toHaveCount(0);
});
