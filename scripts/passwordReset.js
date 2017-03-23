import axios from 'axios';
import { users, response } from 'syncano-server';
import mailgun from 'mailgun.js';

import config from '../utils/config';

const { mailgunDomain, mailgunKey, mailgunFromEmail } = config;
const { email } = ARGS;

const usersDetails = {}

function findUserByEmail(email) {
  return users
    .where('username', email)
    .first()
    .then(user => {
      usersDetails.display_name = user.display_name
      return user.id
    })
    .catch(err => response(JSON.stringify(err), 400, 'application/json'));
}

function changeUserPassword(userID) {
  const tempPassword = Math.random().toString(36).substr(2, 8);

  usersDetails.tempPassword = tempPassword;
  return users
    .update(userID, { password: tempPassword })
}

function sendEmailWithPassword() {
  const mg = mailgun.client({username: 'api', key: mailgunKey});

  return mg.messages.create(mailgunDomain, {
    from: mailgunFromEmail,
    to: email,
    subject: `Hello ${usersDetails.display_name}`,
    text: `Hi ${usersDetails.display_name},\nyour password has been reset.\n\nYour new temporary password is: ${usersDetails.tempPassword}`
  })
}

findUserByEmail(email)
  .then(changeUserPassword)
  .then(sendEmailWithPassword)
  .then(res => response(JSON.stringify(res), 200, 'application/json'))
  .catch(err => response(JSON.stringify(err), 400, 'application/json'));
