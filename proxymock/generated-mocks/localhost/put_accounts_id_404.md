### REQUEST ###
```
PUT http://localhost:80/v1/api/accounts/{id} HTTP/1.1
Accept: application/json\, */*
Content-Type: application/json
Prefer: status=404
User-Agent: OpenAPI-Mock-Generator/1.0
```

```
{
  "address": "example_value",
  "city": "example_value",
  "country": "example_value",
  "industry": "example_value",
  "name": "example_value",
  "phone": "example_value",
  "state": "example_value",
  "website": "example_value",
  "zip": "example_value"
}
```

### RESPONSE ###
```
HTTP/1.1 404 Not Found
Cache-Control: no-cache
Content-Type: application/json
Server: OpenAPI-Mock-Server/1.0
```

```
{
  "code": 50,
  "message": "example_value"
}
```

### SIGNATURE ###
```
http:host is localhost
http:method is PUT
http:queryparams is -NONE-
http:requestBodyJSON is {"address":"example_value","city":"example_value","country":"example_value","industry":"example_value","name":"example_value","phone":"example_value","state":"example_value","website":"example_value","zip":"example_value"}
http:url is /v1/api/accounts/{id}
```

### METADATA ###
```
direction: OUT
uuid: 6e3fed78-c69f-47bd-8bb2-108b745dfc7c
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=PUT, openapi-generated=true, operation=updateAccount, path=/accounts/{id}, status=404
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"PUT","openapi-generated":"true","operation":"updateAccount","path":"/accounts/{id}","status":"404"},"uuid":"bj/teMafR72LshCLdF38fA==","direction":"OUT","network_address":"localhost:80","command":"PUT","location":"/accounts/{id}","status":"404","http":{"req":{"url":"/v1/api/accounts/{id}","uri":"/v1/api/accounts/{id}","version":"1.1","method":"PUT","host":"localhost","headers":{"Accept":["application/json, */*"],"Content-Type":["application/json"],"Prefer":["status=404"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]},"bodyBase64":"ewogICJhZGRyZXNzIjogImV4YW1wbGVfdmFsdWUiLAogICJjaXR5IjogImV4YW1wbGVfdmFsdWUiLAogICJjb3VudHJ5IjogImV4YW1wbGVfdmFsdWUiLAogICJpbmR1c3RyeSI6ICJleGFtcGxlX3ZhbHVlIiwKICAibmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAicGhvbmUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgInN0YXRlIjogImV4YW1wbGVfdmFsdWUiLAogICJ3ZWJzaXRlIjogImV4YW1wbGVfdmFsdWUiLAogICJ6aXAiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="},"res":{"contentType":"application/json","statusCode":404,"statusMessage":"Not Found","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJjb2RlIjogNTAsCiAgIm1lc3NhZ2UiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"UFVU","http:queryparams":"","http:requestBodyJSON":"eyJhZGRyZXNzIjoiZXhhbXBsZV92YWx1ZSIsImNpdHkiOiJleGFtcGxlX3ZhbHVlIiwiY291bnRyeSI6ImV4YW1wbGVfdmFsdWUiLCJpbmR1c3RyeSI6ImV4YW1wbGVfdmFsdWUiLCJuYW1lIjoiZXhhbXBsZV92YWx1ZSIsInBob25lIjoiZXhhbXBsZV92YWx1ZSIsInN0YXRlIjoiZXhhbXBsZV92YWx1ZSIsIndlYnNpdGUiOiJleGFtcGxlX3ZhbHVlIiwiemlwIjoiZXhhbXBsZV92YWx1ZSJ9","http:url":"L3YxL2FwaS9hY2NvdW50cy97aWR9"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
