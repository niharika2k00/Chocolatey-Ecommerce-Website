1. Using CRACO npm package ---> create-react-app config file for setting webpack configs as CRA has its own webpack configuration that can't be easily overriden without ejecting. Hence need to use custom webpack.config.js, here required for @images... import setup.

- For ADMIN user, make the "isAdmin" field of the user true from mongodb directly

**For setting the frontend PORT :**
- Method 1: set in the environment variable inside `frontend/.env`
- Method 2: set in `craco.config.js`
- Method 3: run using `PORT=3001 npm start`





