---
id: version-0.1.0-overview
title: Overview
sidebar_label: Overview
original_id: overview
---

## What is Hux?

Hux is a client-side data management tool giving you the ability to build next-gen UX on top of large datasets.

This is achieved with the following:

- **Data optimisation** - API data is automatically optimised as it is returned from the server

- **Web workers** - All optimisation, processing and querying is run in web workers ensuring the UI is always available for user interaction

- **SWR caching** - Stale While Revalidate caching enables near instant UI population whilst the server processes and returns fresh data

- **Efficient query language** - Through the built-in query language you can select only the exact data properties the UI needs

## Why Hux?

Hux uncouples API interaction and subsequent data processing and storage from the UI layer, leaving it free to deal with jobs it's designed to do such as DOM interaction.

Commonly, apps will pass all of the API data straight through to the UI state. There are several problems with this:

### Performance

UI state is not meant to process bulk API data as it is too tightly coupled with the DOM. Doing so may lead to unnecessary renders, or an unresponsive UI whilst the data is worked on.

By using Hux, the UI only deals with the data it needs, reserving it's state for UI specific values such as the visual state of a component.

### Data management 

Handling all of your data management in the UI layer can lead to duplication across domains, especially in larger apps where the individual components act as controllers.

Hux allows you to organise your data into domain driven buckets with which the UI has contracts with, keeping data clean and removing risk of duplication.

## Where does Hux live in the frontend stack?

It is not a replacement for libraries such as React, in fact Hux works best when used in tandem with them. Its intended position is on the client, in between your UI layer and the server.

--- 

![alt-text](assets/hux-flow.svg)

---

## What does Hux look like?

Hux is framework agnostic. You can use it with React, Angular, Vue or any other JS library.

```js
// Set up our Users data Bucket, and the UI contracts needed
Bucket({
  name: 'Users',
  hydrate: {
    url: 'http://your-api.com/users',
    options: {
      method: 'GET'
    }
  },
  schema: {
    type: 'object',
    properties: {
      meta: { type: 'object' },
      users: { type: 'array', key: 'name' }, // We can set a key here to enhance query performance
      userCount: { type: 'number' }
    },
    required: ['users']
  }
});

// Hydrate the Users bucket using the API specified when setting up the Bucket,
// then query the response data
const hydrateUsers = async () => {
  const { meta: { icon, size }, users, userCount } = await hydrate({
    name: 'Users',
    query: [
      ['meta', ['icon', 'size'],
      Filter('users', ['name=John Smith']),
      'userCount'
    ]
  });
}
```
