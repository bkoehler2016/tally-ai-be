## Tables

- "users"
- "users_businesses"
- "yelp"
- "businesses"

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
        "last_name": string
    }
```

Res:

```
    {
        "user_id": integer
    }
```

- POST /auth/login

Req:

```
    {
        "email": string,
        "password": string - 8 or more characters
    }
```

Res:

```
    {
        "user_id": integers
    }
```

### Users

- GET /users/:id -DONE

Res:

```
    {
        "first_name": string,
        "last_name": string,
        "businesses": [
            {
                "id": integer,
                "name": string,
                "city": string,
                "state": string,
                "yelp": {
                    "yelp_id": string,
                    "url": string,
                    "image_url": string
                }
            },
            ...
        ],
        "favorites": [
            {
                "id": integer,
                "name": string,
                "city": string,
                "state": string,
                "yelp": {
                    "yelp_id": string,
                    "url": string,
                    "image_url": string
                }
            },
            ...
        ]
    }
```

- POST /users/:id/business -DONE

Req:

```
    {
        "name": string,
        "city": string,
        "state": string,
        "yelp": {
            "yelp_id": string,
            "url": string,
            "image_url": string
        }
    }
```

NOTE: We will insert the business first, then get back the business id, put that into the yelp object, and then insert that object into the yelp table. (because business_id is a foreign key) Then we will create an entry in "users_businesses" connecting the two, using the :id and the business id.

Res:

```
    {
        "event": {
            // either another "message" or ids
        },
        "message"
    }
```

- POST /users/:id/favorite -DONE

Req:

```
    {
        "name": string,
        "city": string,
        "state": string,
        "yelp": {
            "yelp_id": string,
            "url": string,
            "image_url": string
        }
    }
```

Res:

```
    {
        "event": {
            // either another "message" or ids
        },
        "message"
    }
```


- PUT /users/:id -DONE

Req:

```
    {
        "email": string (optional),
        "password": string (8 or more characters, optional),
        "first_name": string (optional),
        "last_name": string (optional),
        "preferences": {
            "widgets": array (optional)
        }
    }
```

Res:

```
    {
        number of records changed (int)
    }
```

- DELETE /users/:id -DONE

Res:

```
    {
        "message": string
    }

```

- DELETE /users/:id/business/:business_id

Res:

```
    {
       "message": string
    }
```

- DELETE /users/:id/favorite/:business_id

Res:

```
    {
       "message": string
    }
```

NOTE: Response gives the array of their businesses, now without the deleted business
