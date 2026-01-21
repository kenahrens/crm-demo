### REQUEST ###
```
POST http://localhost:80/v1/api/auth/login HTTP/1.1
Accept: application/json\, */*
Content-Type: application/json
Prefer: status=200
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
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Type: application/json
Server: OpenAPI-Mock-Server/1.0
```

```
{
  "token": "example_value",
  "user": {
    "created_at": "2024-01-15T10:30:00Z",
    "email": "user@example.com",
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "role": "example_value",
    "updated_at": "2024-01-15T10:30:00Z",
    "username": "example_value"
  }
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
uuid: 08d5d53c-a852-4004-8554-4539f124e320
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=POST, openapi-generated=true, operation=login, path=/auth/login, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"POST","openapi-generated":"true","operation":"login","path":"/auth/login","status":"200"},"uuid":"CNXVPKhSQASFVEU58STjIA==","direction":"OUT","network_address":"localhost:80","command":"POST","location":"/auth/login","status":"200","http":{"req":{"url":"/v1/api/auth/login","uri":"/v1/api/auth/login","version":"1.1","method":"POST","host":"localhost","headers":{"Accept":["application/json, */*"],"Content-Type":["application/json"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]},"bodyBase64":"ewogICJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIiwKICAicGFzc3dvcmQiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJ0b2tlbiI6ICJleGFtcGxlX3ZhbHVlIiwKICAidXNlciI6IHsKICAgICJjcmVhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAgICJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIiwKICAgICJpZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgInJvbGUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAidXBkYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgICAidXNlcm5hbWUiOiAiZXhhbXBsZV92YWx1ZSIKICB9Cn0="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"UE9TVA==","http:queryparams":"","http:requestBodyJSON":"eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6ImV4YW1wbGVfdmFsdWUifQ==","http:url":"L3YxL2FwaS9hdXRoL2xvZ2lu"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
