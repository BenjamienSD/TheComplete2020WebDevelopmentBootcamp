# REpresentational State Transfer

API = menu of things a server can respond to.
REST = architectural style for designing APIs (Roy Fielding)

Other styles include: GraphQL, SOAP, Falcor, ...

2 main guidelines

- Use HTTP Request verbs
- Use specific pattern of routes/endpoint URLs

## HTTP Request verbs

- GET
- POST
- PUT
- PATCH
- DELETE

PUT updates the entry by replacing the entire entry, PATCH is much more granular and only updates the relevant data.

## Routes pattern

| HTTP Verbs | /endpoint         | /path            |
| ---------- | ----------------- | ---------------- |
| GET        | fetches all paths | fetches the path |
| POST       | creates new path  |                  |
| PUT        |                   | updates path     |
| PATCH      |                   | updates path     |
| DELETE     | deletes all paths | deletes the path |
