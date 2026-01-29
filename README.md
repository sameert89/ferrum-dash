<p align="center">
	<img src="frontend/mocks/logo.png" alt="Ferrum Dash logo" width="200">
</p>

A lightweight, blazingly fast web-based system monitor and remote administration tool for Linux, written in Rust.

# thinking...
UX wise how should I structure this, should I go mobile first? what are the most important things you want to see in the first page? I am thinking of making it fully customizable (atleast the homescreen) and have some defaults.

home - <some category> - <some category> - <some-category> - <shell> - help

that means these components need to be dynamically loadable, what would be the database, I need something very lightweight, I was thinking about sqlite, the api will be axum and the ui will be plain svelte, all deployable via docker compose. Maybe its better to combine the frontend dist to the backend via rust-embed and embed SQLITE as well, that would make it a single binary.

Shadcn for ui components, home would be customizable so we'll use svelte components and treat everything as widgets and tailwind for styling.

# work-items
- [x] UI Mocks
- [ ] Project setup AXUM
- [ ] Project setup svelte


# UI mocks
# Screens
| Flow | Desktop | Mobile |
| --- | --- | --- |
| Shell landing | ![Shell](frontend/mocks/shell.png) | ![Shell mobile](frontend/mocks/shell-mobile.png) |
| Home widgets | ![Home](frontend/mocks/home.png) | ![Home mobile](frontend/mocks/home-mobile.png) |
| Insights dashboards | ![Insights](frontend/mocks/insights.png) | ![Insights mobile](frontend/mocks/insights-mobile.png) |
| Webhooks overview | ![Webhooks](frontend/mocks/webhooks.png) | ![Webhooks mobile](frontend/mocks/webhooks-mobile.png) |
| Settings | ![Settings](frontend/mocks/settings.png) | ![Settings mobile](frontend/mocks/settings-mobile.png) |

