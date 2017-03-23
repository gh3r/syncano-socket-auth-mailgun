# syncano-socket-auth-mailgun

Syncano socket responsible for authenticating users to applications created on Syncano platform.
Helps in registering, login, changing and reseting password.

## Config

Before you start using it please fill in missing informations in `utils/config.js`.
You will need mailgun password, you will find it here: https://app.mailgun.com/app/account/setup

```sh
export default {
  mailgunDomain: 'YOUR_MAILGUN_DOMAIN',
  mailgunKey: 'YOUR_MAILGUN_KEY',
  mailgunFromEmail: 'YOUR_MAILGUN_FROM_EMAIL'
};
```

And your are ready to go!
