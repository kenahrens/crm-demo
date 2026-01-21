### REQUEST ###
```
DELETE http://localhost:80/v1/api/contacts/{id} HTTP/1.1
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
http:url is /v1/api/contacts/{id}
```

### METADATA ###
```
direction: OUT
uuid: 24788f01-c9b4-4957-995b-21bb9b924320
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=DELETE, openapi-generated=true, operation=deleteContact, path=/contacts/{id}, status=204
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"DELETE","openapi-generated":"true","operation":"deleteContact","path":"/contacts/{id}","status":"204"},"uuid":"JHiPAcm0SVeZWyG7m5JDIA==","direction":"OUT","network_address":"localhost:80","command":"DELETE","location":"/contacts/{id}","status":"204","http":{"req":{"url":"/v1/api/contacts/{id}","uri":"/v1/api/contacts/{id}","version":"1.1","method":"DELETE","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=204"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"statusCode":204,"statusMessage":"No Content","headers":{"Cache-Control":["no-cache"],"Server":["OpenAPI-Mock-Server/1.0"]}}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"REVMRVRF","http:queryparams":"","http:url":"L3YxL2FwaS9jb250YWN0cy97aWR9"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
