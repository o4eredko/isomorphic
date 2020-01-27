# Isomorphic - React Redux Admin Dashboard `Version 2.9.6`
This is the admin panel for different services.

## Dependencies

* [Critical]: 
     
    This admin dashboard uses JWT Authentication and registration
    from http://gitlab.jooble.com/marketing_tech/jwt_auth.
    It is impossible to sign in or sign up without this service!
    You can set the url for authentication in **src/config/jwt.config.js**

* [Not critical]
  
  RedButton depends on 2 services:
  * **Google Red Button**: http://gitlab.jooble.com/marketing_tech/google_red_button.git
  * **Yandex Red Button**: http://gitlab.jooble.com/marketing_tech/yandex_red_button.git
  
  **Important**: In **isomorphic/src/containers/RedButton/PlatformActions** placed classes to work with each service.
  It is required to set **apiUrl** properly inside them.

## Installation and running

* Clone repository:
  ```
  git clone http://gitlab.jooble.com/marketing_tech/isomorphic.git
  ```
* Proceed to projects directory:
  ```
  cd isomorphic
  ```
* To run the application use command:
  ```
  docker-compose up --build
  ```
* To stop the application use command:
  ```
  docker-compose down
  ```

---
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
