<p align="center">
	<img src="frontend/src/lib/assets/logo.png" alt="Ferrum Dash logo" width="200">
</p>

A lightweight, blazingly fast web-based system monitor and remote administration tool for Linux, written in Rust.

# thinking...

UX wise how should I structure this, should I go mobile first? what are the most important things you want to see in the first page? I am thinking of making it fully customizable (atleast the homescreen) and have some defaults.

home - <some category> - <some category> - <some-category> - <shell> - help

that means these components need to be dynamically loadable, what would be the database, I need something very lightweight, I was thinking about sqlite, the api will be axum and the ui will be plain svelte, all deployable via docker compose. Maybe its better to combine the frontend dist to the backend via rust-embed and embed SQLITE as well, that would make it a single binary.

Shadcn for ui components, home would be customizable so we'll use svelte components and treat everything as widgets and tailwind for styling.

now that the home page has taken shape, I can start on the API,

I would need to use websockets for comms, will do initial load using something like a `/overview` endpoint which gives snapshot of data, then onMount open a wsocket connection, and maintain a client `rev-id` we only send diffs based on this rev id or whole data if its too old.

Quick Actions are renamed to Trigger Routines.

Routines are going to be a list of bash commands because that is the best way, I would have some templates for triggers and some basic commands as well.

# work-items

- [x] UI Mocks
- [ ] Project setup AXUM
- [x] Project setup svelte

# UI mocks

# Screens

| Flow                | Desktop                                  | Mobile                                                 |
| ------------------- | ---------------------------------------- | ------------------------------------------------------ |
| Home widgets        | ![Home](frontend/mocks/home.png)         | ![Home mobile](frontend/mocks/home-mobile.png)         |
| Insights dashboards | ![Insights](frontend/mocks/insights.png) | ![Insights mobile](frontend/mocks/insights-mobile.png) |
| Webhooks overview   | ![Webhooks](frontend/mocks/webhooks.png) | ![Webhooks mobile](frontend/mocks/webhooks-mobile.png) |
| Shell               | ![Shell](frontend/mocks/shell.png)       | ![Shell mobile](frontend/mocks/shell-mobile.png)       |
| Settings            | ![Settings](frontend/mocks/settings.png) | ![Settings mobile](frontend/mocks/settings-mobile.png) |
