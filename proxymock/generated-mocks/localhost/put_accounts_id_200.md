### REQUEST ###
```
PUT http://localhost:80/v1/api/accounts/{id} HTTP/1.1
Accept: application/json\, */*
Content-Type: application/json
Prefer: status=200
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
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Type: application/json
Server: OpenAPI-Mock-Server/1.0
```

```
{
  "address": "example_value",
  "city": "example_value",
  "country": "example_value",
  "created_at": "2024-01-15T10:30:00Z",
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "industry": "example_value",
  "name": "example_value",
  "phone": "example_value",
  "state": "example_value",
  "updated_at": "2024-01-15T10:30:00Z",
  "website": "example_value",
  "zip": "example_value"
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
uuid: 8c249593-f0eb-436d-9b6e-b7bc92a72634
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=PUT, openapi-generated=true, operation=updateAccount, path=/accounts/{id}, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"PUT","openapi-generated":"true","operation":"updateAccount","path":"/accounts/{id}","status":"200"},"uuid":"jCSVk/DrQ22bbre8kqcmNA==","direction":"OUT","network_address":"localhost:80","command":"PUT","location":"/accounts/{id}","status":"200","http":{"req":{"url":"/v1/api/accounts/{id}","uri":"/v1/api/accounts/{id}","version":"1.1","method":"PUT","host":"localhost","headers":{"Accept":["application/json, */*"],"Content-Type":["application/json"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]},"bodyBase64":"ewogICJhZGRyZXNzIjogImV4YW1wbGVfdmFsdWUiLAogICJjaXR5IjogImV4YW1wbGVfdmFsdWUiLAogICJjb3VudHJ5IjogImV4YW1wbGVfdmFsdWUiLAogICJpbmR1c3RyeSI6ICJleGFtcGxlX3ZhbHVlIiwKICAibmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAicGhvbmUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgInN0YXRlIjogImV4YW1wbGVfdmFsdWUiLAogICJ3ZWJzaXRlIjogImV4YW1wbGVfdmFsdWUiLAogICJ6aXAiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJhZGRyZXNzIjogImV4YW1wbGVfdmFsdWUiLAogICJjaXR5IjogImV4YW1wbGVfdmFsdWUiLAogICJjb3VudHJ5IjogImV4YW1wbGVfdmFsdWUiLAogICJjcmVhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAiaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAiaW5kdXN0cnkiOiAiZXhhbXBsZV92YWx1ZSIsCiAgIm5hbWUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgInBob25lIjogImV4YW1wbGVfdmFsdWUiLAogICJzdGF0ZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAidXBkYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgIndlYnNpdGUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgInppcCI6ICJleGFtcGxlX3ZhbHVlIgp9"}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"UFVU","http:queryparams":"","http:requestBodyJSON":"eyJhZGRyZXNzIjoiZXhhbXBsZV92YWx1ZSIsImNpdHkiOiJleGFtcGxlX3ZhbHVlIiwiY291bnRyeSI6ImV4YW1wbGVfdmFsdWUiLCJpbmR1c3RyeSI6ImV4YW1wbGVfdmFsdWUiLCJuYW1lIjoiZXhhbXBsZV92YWx1ZSIsInBob25lIjoiZXhhbXBsZV92YWx1ZSIsInN0YXRlIjoiZXhhbXBsZV92YWx1ZSIsIndlYnNpdGUiOiJleGFtcGxlX3ZhbHVlIiwiemlwIjoiZXhhbXBsZV92YWx1ZSJ9","http:url":"L3YxL2FwaS9hY2NvdW50cy97aWR9"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
