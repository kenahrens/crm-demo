### REQUEST ###
```
GET http://localhost:80/v1/api/accounts?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D HTTP/1.1
Accept: application/json\, */*
Prefer: status=400
User-Agent: OpenAPI-Mock-Generator/1.0
```

```
```

### RESPONSE ###
```
HTTP/1.1 400 Bad Request
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
http:method is GET
http:queryparams is -NONE-
http:url is /v1/api/accounts
```

### METADATA ###
```
direction: OUT
uuid: e8091caf-3b4b-4306-8244-8d6b14427247
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=listAccounts, path=/accounts, status=400
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"listAccounts","path":"/accounts","status":"400"},"uuid":"6AkcrztLQwaCRI1rFEJyRw==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/accounts","status":"400","http":{"req":{"url":"/v1/api/accounts","uri":"/v1/api/accounts?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=400"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":400,"statusMessage":"Bad Request","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJjb2RlIjogNTAsCiAgIm1lc3NhZ2UiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9hY2NvdW50cw=="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
