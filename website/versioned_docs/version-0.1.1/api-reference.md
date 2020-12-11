---
id: version-0.1.1-api-reference
title: API reference
sidebar_label: API reference
original_id: api-reference
---

## Requests

### hydrate

This is used to retrieve data from an API, and then "hydrate" the Hux store with the response. 

#### Parameters

| Key | Value | Required | Function |
| :------------- | :---------- | :---------- | :----------- |
| name | String | Yes | The name of the bucket we want to hydrate |
| query | String | No | Used to do an immediate query on the response data |
| onUpdate | Func | No | Function to run when the linked bucket updates, either through the cache revalidating or a sync event |
| aggregations | Array | No | An array of functions to perform pre-aggregations on the response data |

#### Example code

<details>
  <summary>View example code</summary>
  
  ```js
  import { hydrate } from '@hux-js/hux';

  ...

  const userCounter = (data) => {
    const userCount = data.users.length;
    return { ...data, userCount };
  }

  ...

  const hydrateUsers = async () => {
    const { meta: { icon, size }, users, userCount } = await hydrate({
      name: 'Users',
      query: [
        ['meta', ['icon', 'size'],
        Filter('users', ['name=John Smith']),
        'userCount'
      ],
      onUpdate: (newUsersData) => updateUsers(newUsersData)
      aggregations: [userCounter]
    });

    updateUsers(users);
    updateUserCount(userCount);
    updateMeta(icon, size);
  };

  hydrateUsers();
  ```
</details>

---

### sync

This is used to sync data to the store, usually created from user input. If a sync API has been defined when creating the linked Bucket, the data will also be sent on to this API as well as updating the bucket itself.

#### Parameters

| Key | Value | Required | Function |
| :------------- | :---------- | :---------- | :----------- |
| name | String | Yes | The name of the bucket we want to sync data to |
| data | Any | Yes | The data you want to sync to the bucket |
| mode | String | No | Determines whether to `merge` with or `replace` the current bucket data. Default is `merge` |

#### Example code

<details>
  <summary>View example code</summary>
  
  ```js
  import { sync } from '@hux-js/hux';

  ...

  const resetUsers = async () => {
    await sync({
      name: 'Users',
      data: {
        users: [],
      },
      mode: 'replace'
    });
  }

  resetUsers();
  ```
</details>

---

## Store

### Bucket

Bucket is used to define contracts between the UI and a dataset. These contracts include the API to hydrate from, an API to sync to and a schema.

#### Parameters

| Key | Value | Required | Function |
| :------------- | :---------- | :---------- | :----------- |
| name | String | Yes | The unique name of the bucket |
| schema | Object | Yes | The [JSON schema](https://json-schema.org/learn/getting-started-step-by-step.html) used to define the buckets data structure. Includes the custom schema property `key` that you can assign to array types for a performance boost |
| hydrate | Object | No | Contains the properties `url` and `options`. Specifies the API to retrieve data from. If unspecified you will still be able to sync data to the bucket |
| sync | Object | No | Contains the properties `url` and `options`. Specifies the API to sync data to. If unspecified sync operations will only update the bucket. |

#### Example code

<details>
  <summary>View example code</summary>
  
  ```js
  import { Bucket } from '@hux-js/hux';

  ...

  Bucket({
    name: 'Users',
    hydrate: {
      url: 'http://your-api.com/users',
      options: {
        method: 'GET'
      }
    },
    sync: {
      url: 'http://your-api.com/users/create',
      options: {
        method: 'POST',
      }
    },
    schema: {
      type: 'object',
      properties: {
        meta: { type: 'object' },
        users: { type: 'array', key: 'name' },
        userCount: { type: 'number' },
      },
      required: ['users']
    }
  });
  ```
</details>

---

### query

Used to query a bucket. Includes property selection, filtering and pagination.

#### Parameters

| Key | Value | Required | Function |
| :------------- | :---------- | :---------- | :----------- |
| name | String | Yes | The name of the bucket you want to query |
| query | Array | Yes | The query containing the properties you want to receive and any filters. Pass a blank array to return all of the data |
| onUpdate | Func | No | Function to run when the queried bucket updates. The data provided to this function will be based on the query |

#### Example code

<details>
  <summary>View example code</summary>
  
  ```js
  import { query, Filter } from '@hux-js/hux';

  ...

  const queryUsers = async () => {
    const { userCount, users } = await query({
      name: 'Users',
      query: [
        'userCount',
        Filter(
          'users',
          ['name=John Smith'],
          1, 50
        ),
      ],
      onUpdate: (newUsers) => updateUsers(newUsers)
    });

    updateUsers(users);
    updateUserCount(userCount);
  }

  queryUsers();
  ```
</details>

---

### listen

You can use `listen` to run auxillary functions when a bucket updates, such as logging.

The main difference between `listen` and `query` is that the query is optional here, and the `onUpdate` required. Whereas with `query` it is the other way around.

#### Parameters

| Key | Value | Required | Function |
| :------------- | :---------- | :---------- | :----------- |
| name | String | Yes | The name of the bucket you want to query |
| onUpdate | Func | Yes | Function to run when the queried bucket updates. The data provided to this function will be based on the query |
| query | Array | No | The query containing the properties you want to receive and any filters. Pass a blank array to return all of the data |

#### Example code

<details>
  <summary>View example code</summary>
  
  ```js
  import { listen } from '@hux-js/hux';

  ...

  listen({
    name: 'Users',
    onUpdate: () => {
      console.log('Users bucket updated')
    }
  })
  ```
</details>

---

## Query language

### Filter

Filter is used within a query to select a specific item from an array via either an exact or partial match. If you define a key for the array in the schema when initialising the bucket filtering on an exact match will be much faster.

Filter uses ordered params rather than named params.

#### Parameters

| Key | Value | Required | Function |
| :------------- | :---------- | :---------- | :----------- |
| id (arg 1) | String | Yes | The name of the array you want to filter on  |
| filter (arg 2) | Array | Yes | Details the filter. Use `=` for an exact match or `=*` for a partial match. See the example code for an example |
| page (arg 3) | Number | No | The page number used for pagination |
| limit (arg 4) | Number | No | The amount of results returned per page |

#### Example code

<details>
  <summary>View example code</summary>
  
  ```js
  import { query, Filter } from '@hux-js/hux';

  ...

  const queryUsers = async () => {
    const { users } = await query({
      name: 'Users',
      query: [
        Filter(
          'users',
          ['name=*John'], // return all rows where the name contains 'John' in the users array
          1, 50
        ),
      ],
    });

    updateUsers(users);
  }

  queryUsers();
  ```
</details>



