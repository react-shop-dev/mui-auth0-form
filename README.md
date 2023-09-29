# Material UI Auth0 form

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/react-shop-dev/mui-auth0-form#contributing)

Material UI Form Template for Auth0 Universal Login.
Build flexible, fully customizable authentication forms for your project with Material UI and Auth0 features. See [Demo here](https://react-shop-82a36.firebaseapp.com/?_gl=1*10k7bz1*_ga*MTUwOTM0MzA4OS4xNjY1MjM1NDc0*_ga_CW55HF8NVT*MTY5NTkwMzA5NC4xMS4xLjE2OTU5MDMxMDAuNTQuMC4w)

## 🔥 Features

- **Typescript support**
- **Powered by [Material UI](https://mui.com/) styled components**
- **Form state management with [react-hook-form](https://react-hook-form.com/)**
- **Object schema validation with [yup package](https://github.com/jquense/yup)**
- **Connection between your application and Auth0 Dashboard client settings**

## 🧩Includes

- **Sign In/SignUp components**
- **Forgot/Reset password components**
- **Passwordless email/sms components**
- **useAuth0 provider (Auth0 web api -> application view tier)**
- **Social connections (Google OAuth, Facebook, Apple and others)**

## Hot to use

For usage you should have registered [Auth0 account](https://auth0.com/).

1. 💻 Clone project:

```sh

git clone https://github.com/react-shop-dev/mui-auth0-form.git && cd mui-auth0-form && rm -rf .gitignore README.md .git

```

and initialize packages

```sh
yarn
#or
npm i
```

2. Create env.local file in root directory and setup environment variables (see env.example file).

```
VITE_AUTH0_DOMAIN='<your-domain>.eu.auth0.com'
VITE_AUTH0_CLIENT_ID='<your client id>'
VITE_AUTH0_REDIRECT_URI='http://localhost:<PORT>/auth-callback'

```

3. Launch application:

```sh
# for custom login form
yarn dev:login
# for password reset form
yarn dev:pass
```

4. 🛠 Customize App for your needs.
   This particular project is used Material UI, but can be rewritten in any modern react ui library, or with your own styles.

5. Run build script. Will generate dist folder with index.html for preview and assets folder for deploying.

```sh
yarn build
```

6. Deploy your bundles in dist/assets folder to [firebase](https://firebase.google.com/) or alternative storage provider.

7. In your Auth0 dashboard:
   Go to _Branding_ -> _Universal Login_ -> _Advanced options_ -> _Login_ Tab

8. Here an example of HTML code template of _Customize Login_ Page:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Sign In with Auth0</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
    />
    <script
      defer="defer"
      src="https://firebasestorage.googleapis.com/v0/b/<your_firebase_project_url>/o/index.js?alt=media&token=<token>?version=1"
    ></script>
  </head>
  <body>
    <div id="login"></div>
  </body>
</html>
```

`🔔 Tip: After updating of your file in storage you might not see any changes, because of caching. Simply change version query param in script url (default is 1)`

`🔔 Tip: If you wanna use custom domain, you should upgrade your subscription`

8. An example of HTML code template of _Password reset_ form:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Change password</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
    />
    <script
      defer="defer"
      src="https://firebasestorage.googleapis.com/v0/b/<your_firebase_project_url>/o/index.js?alt=media&token=<token>&version=1"
    ></script>
  </head>
  <body>
    <input type="hidden" name="_csrf" value="{{csrf_token}}" />
    <input type="hidden" name="ticket" value="{{ticket}}" />
    <input type="hidden" name="email" value="{{email}}" />
    <div id="change_pass"></div>
  </body>
</html>
```

## Deploy to Firebase storage

Check out [Firebase docs](https://firebase.google.com/docs/storage/web/start).

I'm using [Fireup Cli](https://github.com/AmruthPillai/fireup-cli) for deploying bundle file to firebase, via cli command:

```sh
yarn run storage
```

`🔔 Tip: Make sure you have configured rules in firebase account storage settings, which allows read and write permissions`

`🔔 Tip: If you are getting 403 error when preview your html markup in Auth0 account - generate new token on firebase storage settings and include as query param in your script url 'alt=media&token='your token'`

`🔔 Tip: For using fireup cli service-account.json file is required. Can be generated in your firebase console Project settings -> Service accounts -> Manage service account permissions`

## Contributing

Pull requests for bug fixes are welcome on the GitHub repository. If you want to add a feature, you can open a Pull request on the next branch. For all Pull requests, you must follow the coding style of the existing files (based on prettier)

## License

This project is licensed under the [MIT License](https://github.com/react-shop-dev/mui-auth0-form/blob/main/LICENSE.md).

## Donate

<a href="https://www.buymeacoffee.com/vasylpukiy" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
