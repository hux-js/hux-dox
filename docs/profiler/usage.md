---
id: usage
title: Usage
sidebar_label: Usage
---

## Adding the profiler to your app

If you are using React you can simply import the profiler as you would a normal component, as shown below:

```js
import React from 'react';
import { HuxProfiler } from '@hux-js/profiler';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <HuxProfiler />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

For other libraries such as Angular, use the standard method of importing a React component into the application.

**Remember to either remove it for production, or wrap it in environment checks so it only renders in development**

## Events

The events tab gives you insight into all interactions with Hux, including queries, hydrating and syncing. Within each individual event you'll be able to see details, including performance metrics that will help you understand what is happening in your application and where bottlenecks may sit.

![alt-text](assets/events.png)

## Store

The store tab gives you access to your entire Hux store. You can run queries and hydrate buckets with mock data

![alt-text](assets/store.png)

## Analytics

The analytics tab shows you memory usage over time, so you can ensure it stays within reasonable bounds.

![alt-text](assets/analytics.png)

