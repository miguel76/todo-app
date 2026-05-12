# Plan: Add dark/light theme toggle with persistence

## Overview
Add a visible theme toggle button to the todo app that switches between light and dark themes, with the user's preference persisted in `localStorage`.

## Implementation Steps

### 1. Update `index.html`
- Add a theme toggle button element near the app header or form controls
- Include appropriate aria labels for accessibility

### 2. Refactor `styles.css`
- Define CSS custom properties (variables) for:
  - Background colors (page, card, input)
  - Text colors (primary, secondary)
  - Button colors (background, hover states)
  - Border colors
- Create dark theme overrides using a root-level selector like `:root[data-theme="dark"]`

### 3. Implement theme logic in `script.js`
- Add helper function `getStoredTheme()` to retrieve theme from `localStorage`
- Add function `applyTheme(theme)` to update `document.documentElement` with theme attribute
- Add helper function `saveTheme(theme)` to persist theme to `localStorage`
- Add toggle button click handler that:
  - Switches between light and dark
  - Calls `applyTheme()` to update the UI
  - Calls `saveTheme()` to persist the choice
  - Updates button label/icon to reflect current mode

### 4. Initialize theme on page load
- Retrieve stored theme before rendering existing todos
- Apply the theme to the document root
- Update toggle button state

## Files to Modify
- `index.html` — add toggle button markup
- `styles.css` — add CSS variables and dark theme overrides
- `script.js` — add theme management functions and initialization

## Verification Checklist
- [ ] Theme toggle button is visible and clickable
- [ ] Clicking the button switches between light and dark themes
- [ ] Page refresh preserves the user's theme choice
- [ ] Existing todo functionality (add, delete, complete) works in both themes
- [ ] Colors have sufficient contrast in both light and dark modes

## Design Notes
- Use `data-theme` attribute on root element for theme switching
- Store theme preference as a string (`"light"` or `"dark"`) in `localStorage` under key `"theme"`
- Default to light theme if no preference is stored
- Consider using CSS custom properties for maintainability and easy theming
