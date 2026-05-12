# Simple Todo App

A minimal static Todo app built with plain HTML, CSS and vanilla JavaScript.

## Quick start (development)
- Open index.html in a browser, or serve locally:
  - Python 3: python -m http.server 8000
  - Node: npx http-server . -p 8000
- Visit http://localhost:8000

## Build / test / lint
- No build step, unit tests, or linters are configured by default.

## E2E tests (Playwright)
This repository includes a Playwright setup and a GitHub Actions workflow that runs Chromium E2E tests on push and PR to main/master.

Local run (recommended for development):
1. Install dev deps: npm ci
2. Install browsers: npx playwright install chromium
3. Run tests (Chromium project): npm run test:e2e

Run a single test file or spec:
- npx playwright test tests/todo.spec.js --project=chromium
- Or run by title: npx playwright test -g "add complete and delete a todo" --project=chromium

Notes on CI:
- Workflow: .github/workflows/playwright.yml
- It checks out the repo, installs Node, installs Playwright Chromium, and runs `npm run test:e2e`.

## How the E2E is wired
- playwright.config.js starts a local static server (python -m http.server 8000) via the `webServer` option and targets baseURL `http://localhost:8000`.
- The Playwright test example is at `tests/todo.spec.js` and exercises add, complete, and delete flows.

## Adding browsers or changing projects
- To test other browsers, update `playwright.config.js` projects and adjust the npm script (or run npx playwright test --project=<name>).

## Where to look for changes
- App behavior: `script.js`
- Styles: `styles.css`
- Feature plan (theme toggle): `plan-themeToggle.prompt.md`

If you want the README expanded with contribution guidelines, local debugging tips, or test reporting (JUnit/HTML), say which areas to cover.