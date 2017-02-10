import fetch from './fetch';

export default function (query, params) {
  return fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      params,
    }),
    credentials: 'include',
  });
}

