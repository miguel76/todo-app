# Copilot instructions for this repository

Purpose
- Provide targeted guidance for future Copilot sessions working on this small static Todo app.

Build / test / lint commands
- No build, test, or linter scripts are present in the repository.
- Run locally: open index.html in a browser or serve the folder as static files:
  - Python 3: python -m http.server 8000
  - Node (npm): npx http-server . -p 8000
- No automated tests exist. To add E2E tests consider Playwright; for unit-like DOM tests consider Jest + jsdom.

High-level architecture (big picture)
- Single-page static app (no backend).
  - index.html: minimal markup and app container.
  - styles.css: presentational styles, uses modern CSS (clamp, custom properties expected in future theme work).
  - script.js: vanilla JS DOM-manipulation logic. Key responsibilities:
    - createTodoItem(text): builds and returns an <li> with .todo-item, .todo-text and .delete-button.
    - submission handler: appends created items to #todo-list, clears/focuses input.
    - completion toggle: clicking .todo-text toggles the .completed class.
    - deletion: Delete button removes the item from the DOM.
- No persistence: todos live in the DOM only (no localStorage or backend currently).
- plan-themeToggle.prompt.md in the repo contains a concrete plan to add a light/dark theme toggle with persistence using localStorage and a data-theme attribute.

Key conventions and patterns (repo-specific)
- DOM-first, imperative pattern: app logic manipulated directly via document.createElement and event listeners in script.js.
- Element/class naming to expect when editing code or adding features:
  - Form: #todo-form, input #todo-input
  - List container: #todo-list
  - Item structure: li.todo-item > span.todo-text + button.delete-button
  - Completed state is represented by the .completed class on .todo-text.
- UI behavior encapsulated in small helper functions (createTodoItem) — prefer adding small, focused helpers when extending functionality.
- Theme toggling approach (recommended by existing plan): use CSS custom properties and switch with document.documentElement.setAttribute('data-theme', ...). Store preference under localStorage key "theme".

Where Copilot should look / incorporate
- Inspect script.js first for behavior changes or refactors.
- styles.css when adding visual or theming changes.
- plan-themeToggle.prompt.md for feature requirements and verification checklist for theming work.

AI assistant / other config files checked
- No existing Copilot/AI assistant config files found (CLAUDE.md, AGENTS.md, .cursorrules, etc.). This file should be the canonical Copilot guidance for now.

Notes for pull requests & automation
- Because there is no build step, PRs that only change HTML/CSS/JS can be tested locally by opening index.html or running a local static server.
- Add tests or linters via package.json if introducing a Node-based toolchain. When adding node tooling, include npm scripts for build/test/lint to make those commands discoverable for automation and Copilot.

If you want: configure an MCP server for web E2E testing (Playwright) to support automated browser tests and recording — ask and this repo can be wired to a Playwright MCP server.

--
Created by Copilot CLI analysis of repository files: index.html, script.js, styles.css, and plan-themeToggle.prompt.md.
