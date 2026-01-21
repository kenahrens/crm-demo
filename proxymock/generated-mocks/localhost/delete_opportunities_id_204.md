### REQUEST ###
```
DELETE http://localhost:80/v1/api/opportunities/{id} HTTP/1.1
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
http:url is /v1/api/opportunities/{id}
```

### METADATA ###
```
direction: OUT
uuid: 841a5a5c-75ea-4edb-abd3-50bed336381f
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=DELETE, openapi-generated=true, operation=deleteOpportunity, path=/opportunities/{id}, status=204
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"DELETE","openapi-generated":"true","operation":"deleteOpportunity","path":"/opportunities/{id}","status":"204"},"uuid":"hBpaXHXqTtur01C+0zY4Hw==","direction":"OUT","network_address":"localhost:80","command":"DELETE","location":"/opportunities/{id}","status":"204","http":{"req":{"url":"/v1/api/opportunities/{id}","uri":"/v1/api/opportunities/{id}","version":"1.1","method":"DELETE","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=204"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"statusCode":204,"statusMessage":"No Content","headers":{"Cache-Control":["no-cache"],"Server":["OpenAPI-Mock-Server/1.0"]}}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"REVMRVRF","http:queryparams":"","http:url":"L3YxL2FwaS9vcHBvcnR1bml0aWVzL3tpZH0="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
