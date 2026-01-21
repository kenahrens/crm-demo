### REQUEST ###
```
DELETE http://localhost:80/v1/api/notes/associations HTTP/1.1
Accept: application/json\, */*
Content-Type: application/json
Prefer: status=400
User-Agent: OpenAPI-Mock-Generator/1.0
```

```
{
  "note_id": "123e4567-e89b-12d3-a456-426614174000",
  "record_id": "123e4567-e89b-12d3-a456-426614174000",
  "record_type": "example_value"
}
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
http:method is DELETE
http:queryparams is -NONE-
http:requestBodyJSON is {"note_id":"123e4567-e89b-12d3-a456-426614174000","record_id":"123e4567-e89b-12d3-a456-426614174000","record_type":"example_value"}
http:url is /v1/api/notes/associations
```

### METADATA ###
```
direction: OUT
uuid: bc65581b-c073-4fba-b1bb-39fb8203a4ea
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=DELETE, openapi-generated=true, operation=deleteNoteAssociation, path=/notes/associations, status=400
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"DELETE","openapi-generated":"true","operation":"deleteNoteAssociation","path":"/notes/associations","status":"400"},"uuid":"vGVYG8BzT7qxuzn7ggOk6g==","direction":"OUT","network_address":"localhost:80","command":"DELETE","location":"/notes/associations","status":"400","http":{"req":{"url":"/v1/api/notes/associations","uri":"/v1/api/notes/associations","version":"1.1","method":"DELETE","host":"localhost","headers":{"Accept":["application/json, */*"],"Content-Type":["application/json"],"Prefer":["status=400"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]},"bodyBase64":"ewogICJub3RlX2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgInJlY29yZF9pZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICJyZWNvcmRfdHlwZSI6ICJleGFtcGxlX3ZhbHVlIgp9"},"res":{"contentType":"application/json","statusCode":400,"statusMessage":"Bad Request","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJjb2RlIjogNTAsCiAgIm1lc3NhZ2UiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"REVMRVRF","http:queryparams":"","http:requestBodyJSON":"eyJub3RlX2lkIjoiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwicmVjb3JkX2lkIjoiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwicmVjb3JkX3R5cGUiOiJleGFtcGxlX3ZhbHVlIn0=","http:url":"L3YxL2FwaS9ub3Rlcy9hc3NvY2lhdGlvbnM="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
