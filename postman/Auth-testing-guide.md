# Auth Postman Test Guide

## 1. Default setup

Import:

- `Auth.postman_collection.json`
- `Auth.postman_environment.json`

Select environment `Exam API Local`.

Use the API base URL:

```text
http://localhost:3000/
```

## 2. Basic happy path

Run in order:

1. `A1. Get CSRF Token`
2. `A2. Register`
3. `A3. Login`
4. `A4. Me`
5. `A5. Refresh`
6. `A6. Logout`
7. `A7. Me After Logout`

Expected:

- Register returns `201`, or `409` if the test user already exists.
- Login returns `200`.
- Me returns only `id`, `email`, `fullName`, `role`.
- Refresh returns `200` and rotates cookies.
- Logout returns `200`.
- Me after logout returns `401`.

## 3. CSRF tests

Run:

1. `B1. Login Without CSRF Header`
2. `B2. Login With Wrong CSRF Header`

Expected:

- Both return `403`.

## 4. Refresh token rotation

Run:

1. `C1. Login Before Rotation Test`
2. Copy the current `refreshToken` cookie value from Postman cookies and call it token `A`.
3. Run `C2. Refresh Once`.
4. Confirm Postman now shows a different `refreshToken` value, token `B`.
5. Replace the current `refreshToken` cookie value `B` with old token `A` in the same cookie row for `localhost`.
6. Make sure there is only one `refreshToken` cookie for `localhost` before sending the next request.
7. Run `C3. Manual Reuse Old Refresh Token`.

Expected:

- `C3` returns `401`.
- Current session is revoked.

## 5. Email lock and IP block

Current default behavior:

```env
AUTH_LOGIN_MAX_ATTEMPTS=5
AUTH_LOCK_WINDOW_MINUTES=1
AUTH_IP_MAX_ATTEMPTS=5
```

### Email lock

Run `D2. Same Wrong Password x5` with Collection Runner for 5 iterations.
Then run `D3. Correct Password While Email Locked`.

Expected:

- Failed attempts return the same generic `401` message.
- Correct password still returns `401` while locked.

### IP block

Run `D1. Wrong Password` 5 times from the same Postman client inside 1 minute.

Expected:

- Later login attempts from the same IP return generic `401`.

## 6. Rate limit tests

Current default behavior:

```env
AUTH_LOGIN_LIMIT=10
AUTH_REGISTER_LIMIT=10
AUTH_REFRESH_LIMIT=10
AUTH_CSRF_LIMIT=10
```

Run the requests in folder `E. Rate Limit` more times than their configured limit inside the TTL window.

Expected:

- Later requests return `429`.

## 7. Google OAuth

### Postman can test

- `F1. Start Google OAuth`
- `F2. Google Callback Invalid State`

For `F1`, turn off automatic redirect following in Postman if you want to inspect:

- redirect response
- `Location` header
- signed `oauthState` cookie

For `F2`, expected behavior is redirect to:

```text
{{FRONTEND_URL}}/login?error=google_auth_failed
```

### Postman cannot fully replace a browser

The full success path requires:

1. browser redirect to Google
2. user login/consent at Google
3. callback back to the API

So the real positive Google login flow should be tested in a browser, not only Postman.
