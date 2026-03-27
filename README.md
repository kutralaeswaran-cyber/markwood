# Markwood - BPO Operations Dashboard

A modern, enterprise-grade BPO Operations Dashboard and Workbench UI inspired by Jira-style workflows and optimized for high-volume operations teams.

## Features

- Dashboard with summary cards, category distribution, priority chart, and team workload.
- Queue/Workbench with filters, search, and a horizontal fast-entry form.
- Dependent dropdowns, inline validation, and auto-calculation of effort hours.
- Smart behavior: real-time widget refresh, SLA breach highlighting, delayed task emphasis.
- Task grid with sorting, filtering, inline editing, and status badges.

## Local Preview

Open `index.html` directly in your browser, or run a static server:

```bash
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

## Deploy Preview (GitHub Pages)

This repo now includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that auto-deploys the site.

### One-time setup in GitHub

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push this branch.

### Preview URL

After workflow completion, your preview will be available at:

`https://<your-org-or-user>.github.io/<repo-name>/`

You can also find the exact URL in the workflow run summary.
