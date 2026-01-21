### REQUEST ###
```
DELETE http://localhost:80/v1/api/notes/{id} HTTP/1.1
Accept: application/json\, */*
Prefer: status=404
User-Agent: OpenAPI-Mock-Generator/1.0
```

```
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
http:method is DELETE
http:queryparams is -NONE-
http:url is /v1/api/notes/{id}
```

### METADATA ###
```
direction: OUT
uuid: ca7a04bf-5f53-4f71-bfaf-b06b06325e08
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=DELETE, openapi-generated=true, operation=deleteNote, path=/notes/{id}, status=404
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"DELETE","openapi-generated":"true","operation":"deleteNote","path":"/notes/{id}","status":"404"},"uuid":"ynoEv19TT3G/r7BrBjJeCA==","direction":"OUT","network_address":"localhost:80","command":"DELETE","location":"/notes/{id}","status":"404","http":{"req":{"url":"/v1/api/notes/{id}","uri":"/v1/api/notes/{id}","version":"1.1","method":"DELETE","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=404"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":404,"statusMessage":"Not Found","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJjb2RlIjogNTAsCiAgIm1lc3NhZ2UiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"REVMRVRF","http:queryparams":"","http:url":"L3YxL2FwaS9ub3Rlcy97aWR9"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
