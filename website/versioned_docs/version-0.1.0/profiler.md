---
id: version-0.1.0-profiler
title: Profiler
sidebar_label: Profiler
original_id: profiler
---

## Requests

### # hydrate()

This is used to retrieve from an API, and then "hydrate" the Hux store with the response. 

#### Parameters
| Key | Value | Required | Function |
| :------------- | :---------- | :---------- | :----------- |
| name | String | Yes | The unique identifier for your dataset. You need this to perform queries |
| url | String | Yes | The API URL to fetch data from |
| schema | String | Yes | The expected schema of the API response |
| query | String | No | Used to do an immediate query on the response data |
| aggregations | Array | No | To perform pre-aggregation on the response data |

#### Example code

<details>
  <summary>View example code</summary>
  
  <!--DOCUSAURUS_CODE_TABS-->
  <!--React-->

  ```js
  import { hydrate } from 'hux-js';

  ...

  useEffect(() => {
    const runFetch = async () => {
      const { countries } = await hydrate({
        name: 'Users',
        url: 'https://randomuser.me/api/?results=5000',
        query: `{ countries }`,
        schema: `type Query { results: JSON, countries: JSON }`,
      });

      updateCountries(countries)
    }

    runFetch();
  }, []);
  ```
  <!--Angular-->

  ```js
  print('Hello, world!')
  ```

  <!--Vue-->

  ```js
  #include <stdio.h>

  int main() {
    printf("Hello World!");
    return 0;
  }
  ```

  <!--Vanilla JS-->

  ```js
  program HelloWorld;
  begin
    WriteLn('Hello, world!');
  end.
  ```

  <!--END_DOCUSAURUS_CODE_TABS-->
</details>

---

### # sync()

This is used to update the server via an API request, whilst also "syncing" changes to the Hux store.

#### Parameters
| Key | Value | Required | Function |
| :------------- | :---------- | :---------- | :----------- |
| url | String | Yes | The API URL you want to fetch data from |

