# Causalytics

This project is built to match the requirements of the technical exercise provided by Causalytics. It uses Vue, Vuetify and chartjs on the front-end, and has an optional NodeJS server for mocking purposes.

## Setup

Run ``` npm install ``` at the project root to set up the client.<br>
Make sure nothing is running on port 8080, and if using the mock server, port 8081 as well.<br>
To use the application with the real Facebook API, run ```npm run serve``` from the project root.<br>
If you encounter issues with the real Facebook API, you may use the mock NodeJS server. To do so, cd into the server directory and run ```npm install``` followed by ```node index.js```, then run ```npm run serve-local``` from the project root.

## Limitations

Filtering the data by campaign is not yet implemented.<br>
Unit testing is also net yet implemented. This is mostly due to my inexperience with Vue, and therefore lack of understanding of the configurations required.<br>
Edge cases are currently blanket-handled by a popup. In the future, parsing errors and providing more granular responses would be the next step in error management.<br>

## Thanks

Special thanks goes out to my mom, who is a saint.