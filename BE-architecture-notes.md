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
  Req:

```
    {
        "business": {
            "name": string,
            "location": {
                "city": string,
                "state": string
            }
        },
        "yelp": {
                "yelp_id": string,
                "url": string,
                "image_url": string
        }
    }
```

NOTE: We will insert the business first, then get back the business id, put that into the yelp object, and then insert that object into the yelp table. (because business_id is a foreign key)

Res:

```
    {
        "business_id": integer,
        "yelp_id": integer
    }
```

NOTE: These are the IDs for the rows in the "businesses" and "yelp" tables, respectively.

- PUT /users/:id -DONE
- DELETE /users/:id -DONE
- DELETE /users/:id/business
