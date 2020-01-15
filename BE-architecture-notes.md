## Tables
- "users"
- "users_businesses"
- "yelp"
- "buesinesses"

## Routers
- auth
- users

## Models
- auth
- users

## Steps for new user
1. Register -> POST /auth/register -> adds entry to "users"
2. Add business -> POST /users/:id/business -> if (no existing entries in "yelp" & "businesses") { new entry in "yelp" and "businesses" } -> add entry in "users_businesses"

## Endpoints
### Auth
- POST /auth/register
- POST /auth/login

### Users
- GET /users/:id -done
- POST /users/:id/business -done... i think
- PUT /users/:id -done
- DELETE /users/:id -done
- DELETE /users/:id/business -done
