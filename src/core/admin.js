import { adminUsers } from '../config';

export default function (email) {
  return adminUsers.indexOf(email) !== -1;
}

