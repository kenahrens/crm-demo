### REQUEST ###
```
DELETE http://localhost:80/v1/api/notes/{id} HTTP/1.1
Accept: application/json\, */*
Prefer: status=204
User-Agent: OpenAPI-Mock-Generator/1.0
```

```
```

### RESPONSE ###
```
HTTP/1.1 204 No Content
Cache-Control: no-cache
Server: OpenAPI-Mock-Server/1.0
```

```
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
uuid: b2ab6f9b-3f83-43f3-804b-229b46099376
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=DELETE, openapi-generated=true, operation=deleteNote, path=/notes/{id}, status=204
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"DELETE","openapi-generated":"true","operation":"deleteNote","path":"/notes/{id}","status":"204"},"uuid":"sqtvmz+DQ/OASyKbRgmTdg==","direction":"OUT","network_address":"localhost:80","command":"DELETE","location":"/notes/{id}","status":"204","http":{"req":{"url":"/v1/api/notes/{id}","uri":"/v1/api/notes/{id}","version":"1.1","method":"DELETE","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=204"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"statusCode":204,"statusMessage":"No Content","headers":{"Cache-Control":["no-cache"],"Server":["OpenAPI-Mock-Server/1.0"]}}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"REVMRVRF","http:queryparams":"","http:url":"L3YxL2FwaS9ub3Rlcy97aWR9"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
