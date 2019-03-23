# CPU Load Monitor Application

### Overview
The application is a WebsSocket based CPU load monitor application. It allows the user to open a browser window to view average CPU load over time as well as a table of CPU load alerts.

### Technologies
For this application I used the following technologies:
* Node.js
* Express
* WS - a Node WebSocket library
* Preact
* D3
* Webpack
* Babel

### Future Improvements

The design of the application backend is rudimentary. The WebSocket functions should be encapsulated in their own module, additional server setup and teardown functionality needs to be implemented, and a WebSocket heartbeat functionality is needed.

The application frontend does not have any formal state management at this point. If I were to start this application over I would start building the frontend with state management from the beginning. I also went off the deep end wiring up D3 with Preact. There is still a lot of work to be done to clean up the client code organization, improve the rendering of SVG elements, improving UI styles, and web accessibility. I think it would also be worht considering swapping out the SVG elements for a canvas in the future.
