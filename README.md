## How to use the json.server?

script:

```
npm run dev
```

This will start the json server and "npm start" simultaniously.
The react app will run on localhost:3000 and the json server will run on localhost:8000.

## Create .env file (or copy .env.dist file)

Create 2 variables and insert your endpoint for development and production:
REACT_APP_DEV_MODE= (localhost)
REACT_APP_PRO_MODE= (backendserver)
