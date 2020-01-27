# Isomorphic - React Redux Admin Dashboard `Version 2.9.6`
This is the admin panel for different services.

## Dependencies

1. This admin dashboard uses JWT Authentication and registration
from http://gitlab.jooble.com/marketing_tech/jwt_auth.
You can set the url for authentication in **src/config/jwt.config.js**

2. RedButton depends on 2 services:
* Google Red Button: http://gitlab.jooble.com/marketing_tech/google_red_button.git
* Yandex Red Button: http://gitlab.jooble.com/marketing_tech/yandex_red_button.git
In **src/containers/RedButton/PlatformActions** placed classes to work with each service.
It is required to set **apiUrl** properly inside them.

## Installation and running

In the project directory, you should run:

### `make run`

Install dependencies.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds for the production mode.
Then you can run these commands to run the app in the production mode:
```
yarn global add serve
serve -s build
```

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

For more information look in the file **documentation.pdf**: 
