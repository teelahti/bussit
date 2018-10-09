# bussit

Small personal website to show bus schedules for single route only (to overcome some limitations in the official site).

## Develop

Run a static web server, e.g. `cd public && python -m SimpleHTTPServer 8089`.
As this site uses service workers you might need to clear them with your browser tools.

## Deploy

To get proper HTTPS support for free, using Google Firebase hosting instead of Github pages.
Requires Google Firebase CLI installed.

    firebase deploy
