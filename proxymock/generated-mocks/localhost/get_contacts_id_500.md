### REQUEST ###
```
GET http://localhost:80/v1/api/contacts/{id} HTTP/1.1
Accept: application/json\, */*
Prefer: status=500
User-Agent: OpenAPI-Mock-Generator/1.0
```

```
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
http:method is GET
http:queryparams is -NONE-
http:url is /v1/api/contacts/{id}
```

### METADATA ###
```
direction: OUT
uuid: 97b84e1f-db46-4761-96ca-84237c80462b
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=getContact, path=/contacts/{id}, status=500
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"getContact","path":"/contacts/{id}","status":"500"},"uuid":"l7hOH9tGR2GWyoQjfIBGKw==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/contacts/{id}","status":"500","http":{"req":{"url":"/v1/api/contacts/{id}","uri":"/v1/api/contacts/{id}","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=500"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":500,"statusMessage":"Internal Server Error","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJjb2RlIjogNTAsCiAgIm1lc3NhZ2UiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9jb250YWN0cy97aWR9"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
