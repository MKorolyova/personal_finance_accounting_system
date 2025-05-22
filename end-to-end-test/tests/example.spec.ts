import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4000/');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.locator('#email').fill('test@test.com');
  await page.locator('#password').fill('test');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByText('Welcome back!')).toBeVisible();
  await expect(page).toHaveURL('http://localhost:4000/Home');
});


test('should navigate to Transactions tab', async ({ page }) => {
  const header = page.locator('header'); 
  await header.getByRole('link', { name: 'Transactions' }).click();
  await expect(page).toHaveURL('http://localhost:4000/Transactions');
});

test('should navigate to Goals tab', async ({ page }) => {
  const header = page.locator('header'); 
  await header.getByRole('link', { name: 'Goals' }).click();
  await expect(page).toHaveURL('http://localhost:4000/Goals');
});

test('should navigate to Analytics tab', async ({ page }) => {
  const header = page.locator('header'); 
  await header.getByRole('link', { name: 'Analytics' }).click();
  await expect(page).toHaveURL('http://localhost:4000/Analytics');
});

test('should navigate to Home tab', async ({ page }) => {
  const header = page.locator('header'); 
  await header.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByText('Welcome back!')).toBeVisible();
  await expect(page).toHaveURL('http://localhost:4000/Home');
});

test('should add a new transaction', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Transaction' }).click();
  await page.locator('text=Amount:').locator('..').locator('input').fill('250');
  await page.getByRole('button', { name: 'expense' }).click();
  await page.getByRole('button', { name: 'groceries' }).click();

  await page.getByRole('button', { name: '22' }).click();

  await page.locator('text=Description:').locator('..').locator('input').fill('Groceries');
  await page.getByRole('button', { name: 'Add', exact: true }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Add', exact: true }).click();

});

test('should add a new goal', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Goal' }).click();
  await page.locator('text=Goal Name:').locator('..').locator('input').fill('New Phone');
  await page.locator('text=Current Amount:').locator('..').locator('input').fill('50');
  await page.locator('text=Target Amount:').locator('..').locator('input').fill('650');

  await page.getByRole('button', { name: '›' }).click();
  await page.getByRole('button', { name: '21' }).click();

  await page.getByRole('button', { name: 'Add', exact: true }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Add', exact: true }).click();

});

