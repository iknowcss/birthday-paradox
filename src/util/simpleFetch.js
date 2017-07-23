export default (url, { body, ...options }) => fetch(url, {
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
  ...options,
})
  .then(async result => ({
    ok: result.ok,
    statusCode: result.status,
    body: await result.json(),
  }));
