### REQUEST ###
```
POST http://localhost:80/v1/api/auth/login HTTP/1.1
Accept: application/json\, */*
Content-Type: application/json
Prefer: status=401
User-Agent: OpenAPI-Mock-Generator/1.0
```

```
{
  "email": "user@example.com",
  "password": "example_value"
}
```

### RESPONSE ###
```
HTTP/1.1 401 Unauthorized
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
http:requestBodyJSON is {"email":"user@example.com","password":"example_value"}
http:url is /v1/api/auth/login
```

### METADATA ###
```
direction: OUT
uuid: f09743a7-e358-461b-a7a9-a23dbde3a419
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=POST, openapi-generated=true, operation=login, path=/auth/login, status=401
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"POST","openapi-generated":"true","operation":"login","path":"/auth/login","status":"401"},"uuid":"8JdDp+NYRhunqaI9veOkGQ==","direction":"OUT","network_address":"localhost:80","command":"POST","location":"/auth/login","status":"401","http":{"req":{"url":"/v1/api/auth/login","uri":"/v1/api/auth/login","version":"1.1","method":"POST","host":"localhost","headers":{"Accept":["application/json, */*"],"Content-Type":["application/json"],"Prefer":["status=401"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]},"bodyBase64":"ewogICJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIiwKICAicGFzc3dvcmQiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="},"res":{"contentType":"application/json","statusCode":401,"statusMessage":"Unauthorized","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJjb2RlIjogNTAsCiAgIm1lc3NhZ2UiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"UE9TVA==","http:queryparams":"","http:requestBodyJSON":"eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6ImV4YW1wbGVfdmFsdWUifQ==","http:url":"L3YxL2FwaS9hdXRoL2xvZ2lu"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
