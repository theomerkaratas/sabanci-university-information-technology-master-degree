# Practice 1: Twelve-Factor App

This practice focuses on modern software methodology and multi-page HTML structure.

## Topics Covered

- **Twelve-Factor App:** 12 fundamental principles for SaaS applications.
- **Relative Links:** Linking to other files in different folders (e.g., `public/`).
- **Project Organization:** Structuring HTML files across multiple directories.

## File Linking Parameters

| Scenario                     | Example Path       | Description                 |
| :--------------------------- | :----------------- | :-------------------------- |
| Same Directory               | `./file.html`      | File in the current folder. |
| Navigate to Subdirectory     | `public/file.html` | File in a subfolder.        |
| Navigate to Parent Directory | `../file.html`     | File in the parent folder.  |

## Key Factors

1.  **Codebase:** One codebase tracked in revision control, many deploys.
2.  **Dependencies:** Explicitly declare and isolate dependencies.
3.  **Config:** Store config in the environment.
4.  **Dev/Prod Parity:** Keep development, staging, and production as similar as possible.
