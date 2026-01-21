### REQUEST ###
```
DELETE http://localhost:80/v1/api/contacts/{id} HTTP/1.1
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
http:method is DELETE
http:queryparams is -NONE-
http:url is /v1/api/contacts/{id}
```

### METADATA ###
```
direction: OUT
uuid: 41970c73-41b2-48f1-83d7-a1c4e51b1718
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=DELETE, openapi-generated=true, operation=deleteContact, path=/contacts/{id}, status=500
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"DELETE","openapi-generated":"true","operation":"deleteContact","path":"/contacts/{id}","status":"500"},"uuid":"QZcMc0GySPGD16HE5RsXGA==","direction":"OUT","network_address":"localhost:80","command":"DELETE","location":"/contacts/{id}","status":"500","http":{"req":{"url":"/v1/api/contacts/{id}","uri":"/v1/api/contacts/{id}","version":"1.1","method":"DELETE","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=500"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":500,"statusMessage":"Internal Server Error","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJjb2RlIjogNTAsCiAgIm1lc3NhZ2UiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"REVMRVRF","http:queryparams":"","http:url":"L3YxL2FwaS9jb250YWN0cy97aWR9"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
