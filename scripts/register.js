import axios from 'axios';
import { users, response } from 'syncano-server';

const { email, password, username } = ARGS;
const userData = {
    username: email,
    password,
    display_name: username
  };

function checkValidEmail(email) {
  const pattern = /\S+@\S+\.\S+/;
  const validationResult = email.match(pattern);

  if (validationResult === null) {
    const error = {"error": "This email adress is not valid!"};

    response(JSON.stringify(error), 200, 'application/json');
    return process.exit();
  }
  return true;
};

checkValidEmail(email)
  .then(() => {
    users
      .create(userData)
      .then(res => response(JSON.stringify(res), 200, 'application/json'))
      .catch(err => response(JSON.stringify(err), 400, 'application/json'));
  });
