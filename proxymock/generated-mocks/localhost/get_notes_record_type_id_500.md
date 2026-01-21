### REQUEST ###
```
GET http://localhost:80/v1/api/notes/record/{type}/{id} HTTP/1.1
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
http:url is /v1/api/notes/record/{type}/{id}
```

### METADATA ###
```
direction: OUT
uuid: a42856b9-104b-4690-a30b-51df20e84c4e
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=getNotesByRecord, path=/notes/record/{type}/{id}, status=500
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"getNotesByRecord","path":"/notes/record/{type}/{id}","status":"500"},"uuid":"pChWuRBLRpCjC1HfIOhMTg==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/notes/record/{type}/{id}","status":"500","http":{"req":{"url":"/v1/api/notes/record/{type}/{id}","uri":"/v1/api/notes/record/{type}/{id}","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=500"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":500,"statusMessage":"Internal Server Error","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJjb2RlIjogNTAsCiAgIm1lc3NhZ2UiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9ub3Rlcy9yZWNvcmQve3R5cGV9L3tpZH0="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
