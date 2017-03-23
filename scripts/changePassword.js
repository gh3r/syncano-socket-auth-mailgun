import axios from 'axios';
import { users, response } from 'syncano-server';

const { email, new_password } = ARGS;

function getUserId(email) {
  return users
    .where('username', email)
    .first()
    .then(user => user.id)
    .catch(err => response(JSON.stringify(err), 400, 'application/json'));
}

getUserId(email)
  .then(user => {
    users
      .update(user, { password: new_password })
  })
  .then(res => response(JSON.stringify(res), 200, 'application/json'))
  .catch(err => response(JSON.stringify(err), 400, 'application/json'));
