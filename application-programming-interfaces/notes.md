# Application Programming Interfaces

Broad definition: an API is a set of commands, functions, protocols and objects that programmers can use to create software or interact with an external system.

## Endpoints, paths and parameters

### • Endpoint

<https://example.com/this-is-an-endpoint>  
<https://example.com/another/endpoint>  
<https://example.com/some/other/endpoint>

Endpoints can be different for different HTTP methods (**C**reate **R**ead **U**pdate **D**elete)

```code
GET /item/{id}
PUT /item/{id}
```

### • Paths

If <https://sv443.net/jokeapi/v2/joke/> is the endpoint root, then <https://sv443.net/jokeapi/v2/joke/programming> or <https://sv443.net/jokeapi/v2/joke/misc> are the branches or paths

### • Parameters

Allow for custom queries  
<https://sv443.net/jokeapi/v2/joke/programming?contains=debugging&type=single>

queries are initialized with ?, and are chained with &

## API Authentication and Postman

sample api call  
<https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02>

endpoint: <https://samples.openweathermap.org/data/2.5/weather>  
query: q=London,uk  
authentication: appid=439d4b804bc8187953eb36d2a8c26a02

<https://api.openweathermap.org/data/2.5/weather?q=Gent,BE&units=metric&appid=apikey>

### Postman

API testing using Postman

|  KEY  |     | VALUE  |
| :---: | :-: | :----: |
|   q   |     | london |
| units |     | metric |
| appid |     | apikey |
