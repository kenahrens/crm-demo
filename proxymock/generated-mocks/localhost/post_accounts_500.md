### REQUEST ###
```
POST http://localhost:80/v1/api/accounts HTTP/1.1
Accept: application/json\, */*
Content-Type: application/json
Prefer: status=500
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
HTTP/1.1 500 Internal Server Error
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
http:method is POST
http:queryparams is -NONE-
http:requestBodyJSON is {"address":"example_value","city":"example_value","country":"example_value","industry":"example_value","name":"example_value","phone":"example_value","state":"example_value","website":"example_value","zip":"example_value"}
http:url is /v1/api/accounts
```

### METADATA ###
```
direction: OUT
uuid: 5ee31f81-3eaa-485c-8d5b-3445fceae11c
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=POST, openapi-generated=true, operation=createAccount, path=/accounts, status=500
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"POST","openapi-generated":"true","operation":"createAccount","path":"/accounts","status":"500"},"uuid":"XuMfgT6qSFyNWzRF/OrhHA==","direction":"OUT","network_address":"localhost:80","command":"POST","location":"/accounts","status":"500","http":{"req":{"url":"/v1/api/accounts","uri":"/v1/api/accounts","version":"1.1","method":"POST","host":"localhost","headers":{"Accept":["application/json, */*"],"Content-Type":["application/json"],"Prefer":["status=500"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]},"bodyBase64":"ewogICJhZGRyZXNzIjogImV4YW1wbGVfdmFsdWUiLAogICJjaXR5IjogImV4YW1wbGVfdmFsdWUiLAogICJjb3VudHJ5IjogImV4YW1wbGVfdmFsdWUiLAogICJpbmR1c3RyeSI6ICJleGFtcGxlX3ZhbHVlIiwKICAibmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAicGhvbmUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgInN0YXRlIjogImV4YW1wbGVfdmFsdWUiLAogICJ3ZWJzaXRlIjogImV4YW1wbGVfdmFsdWUiLAogICJ6aXAiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="},"res":{"contentType":"application/json","statusCode":500,"statusMessage":"Internal Server Error","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJjb2RlIjogNTAsCiAgIm1lc3NhZ2UiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"UE9TVA==","http:queryparams":"","http:requestBodyJSON":"eyJhZGRyZXNzIjoiZXhhbXBsZV92YWx1ZSIsImNpdHkiOiJleGFtcGxlX3ZhbHVlIiwiY291bnRyeSI6ImV4YW1wbGVfdmFsdWUiLCJpbmR1c3RyeSI6ImV4YW1wbGVfdmFsdWUiLCJuYW1lIjoiZXhhbXBsZV92YWx1ZSIsInBob25lIjoiZXhhbXBsZV92YWx1ZSIsInN0YXRlIjoiZXhhbXBsZV92YWx1ZSIsIndlYnNpdGUiOiJleGFtcGxlX3ZhbHVlIiwiemlwIjoiZXhhbXBsZV92YWx1ZSJ9","http:url":"L3YxL2FwaS9hY2NvdW50cw=="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
