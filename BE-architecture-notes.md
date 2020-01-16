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
  Req:

```
    {
        "email": string,
        "password": string - 8 or more characters,
        "first_name": string,
        "last_name": string,
    }
```

Res:

```
    {
        "user_id": integer,
    }
```

- POST /auth/login
  Req:

```
    {
        "email": string,
        "password": string - 8 or more characters,
    }
```

Res:

```
    {
        "user_id": integer,
    }
```

### Users

- GET /users/:id -DONE
  Res:

```
    {
        "first_name": string,
        "last_name": string,
        "business": {
            "id": integer,
            "name": string,
            "location": {
                "city": string,
                "state": string
            }
            "yelp": {
                "id": string,
                "yelp_id": string,
                "url": string,
                "image_url": string
            }
        }
    }
```

- POST /users/:id/business -DONE
- PUT /users/:id -DONE
- DELETE /users/:id -DONE
- DELETE /users/:id/business
