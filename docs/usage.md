---
id: usage
title: Usage
sidebar_label: Usage
---

## Setting up your Buckets

This is the first step when using Hux. It allows you to define the APIs and schemas associated with the [bucket](https://huxjs.org/docs/api-reference#bucket), otherwise known as contracts. They may include what API you would call to fill the bucket with data, or what API you call when updating or POST'ing data.

Below you can see we are setting a unique name for the bucket, the `GET` API method and the `POST` API method. We also define the expected JSON schema.

We've added `key` to the `users` array so we can quickly query using the identifier `name`. This isn't a requirement but does drastically speed up filtering arrays.

```js
Bucket({
  name: 'Users',
  hydrate: {
    url: 'http://localhost:3456',
  },
  sync: {
    url: 'http://localhost:3456/create',
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
    required: ['users'],
  },
});
```

## Calling an API

After you've set up your bucket, you can use the [hydrate](https://huxjs.org/docs/api-reference#hydrate) function to fill it with data when required.

To immediately retrieve data from the bucket, you can add a query to the hydrate function. This will initially return cached data if available. When the latest API data returns from the server you can use the `onUpdate` property to push the fresh data to the UI.

<blockquote>Note: `onUpdate` only works if the `query` property is present</blockquote>

```js
const { users: cachedUsers } = await hydrate({
  name: 'Users',
  query: [
    'users',
  ],
  onUpdate: ({ users: freshUsers }) => updateUiWithFreshUsers(freshUsers)
});
```

## Querying the store

Once the bucket has been hydrated, you can query it from anywhere. The `query` function looks very similar to `hydrate`, with the exception that it does not call any APIs.

You can pass a blank array to return all of the bucket data:

```js
const usersBucket = await query({
  name: 'Users',
  query: [],
});
```

Or you can retrieve only specific fields, using nested arrays to select within objects:

```js
const { users, meta: { count }} = await query({
  name: 'Users',
  query: [
    'users',
    ['meta', ['count']]
  ],
});
```

You can also filter on arrays. Below we are searching the users array for the name `John Smith`. We can use `onUpdate` to ensure that if another component updates the users bucket we have the latest version of the `John Smith` user:

```js
const { users } = await query({
  name: 'Users',
  query: [
    Filter(
      'users',
      ['name=John Smith'], // We can use =* to do a partial search
    ),
  ],
  onUpdate: ({ users }) => updateUser(users[0])
});
```

## Syncing data to the store/API

When you want to update the store you can either merge the new data with the current, or do a complete replacement. If the `mode` property is left blank it defaults to `replace`.

If you have a sync API defined in your bucket the data will be sent on to it.

Below we are adding a new user to the Users bucket:

```js
sync({
  name: 'Users',
  data: {
    users: [{ name: 'New user' }],
  },
  mode: 'merge'
});
```

## Listening to store updates

Usually you would use the `onUpdate` property in `query` to listen to store updates. However for auxillary functions such as logging you can use the simpler alternative `listen`, which doesn't require a query.

Below we are listening for any updates to the `Users` bucket and logging out the event:

```js
listen({
  name: 'Users',
  onUpdate: () => {
    console.log('Users bucket updated')
  }
})
```

## Pre-aggregating data

When hydrating the store, Hux provides a property allowing you to chain aggregation functions together that will run on your data. You can use this to pre-emptively process your data so the UI can just focus on rendering rather than shaping the data.

Each aggregator functions receives the previous aggregators output data as it's input, hence the term 'chain'.

Below we're adding a simple user count aggregation:

```js
const userCounter = (data) => {
  const userCount = data.users.length;
  return { ...data, userCount };
}

const { users } = await hydrate({
  name: 'Users',
  query: [
    'users',
  ],
  aggregations: [userCounter],
});
```