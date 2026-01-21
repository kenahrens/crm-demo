### REQUEST ###
```
PUT http://localhost:80/v1/api/notes/{id} HTTP/1.1
Accept: application/json\, */*
Content-Type: application/json
Prefer: status=500
User-Agent: OpenAPI-Mock-Generator/1.0
```

```
{
  "associations": [
    {
      "note_id": "123e4567-e89b-12d3-a456-426614174000",
      "record_id": "123e4567-e89b-12d3-a456-426614174000",
      "record_type": "example_value"
    },
    {
      "note_id": "123e4567-e89b-12d3-a456-426614174000",
      "record_id": "123e4567-e89b-12d3-a456-426614174000",
      "record_type": "example_value"
    }
  ],
  "content": "example_value",
  "created_by": "123e4567-e89b-12d3-a456-426614174000"
}
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
http:method is PUT
http:queryparams is -NONE-
http:requestBodyJSON is {"associations":[{"note_id":"123e4567-e89b-12d3-a456-426614174000","record_id":"123e4567-e89b-12d3-a456-426614174000","record_type":"example_value"},{"note_id":"123e4567-e89b-12d3-a456-426614174000","record_id":"123e4567-e89b-12d3-a456-426614174000","record_type":"example_value"}],"content":"example_value","created_by":"123e4567-e89b-12d3-a456-426614174000"}
http:url is /v1/api/notes/{id}
```

### METADATA ###
```
direction: OUT
uuid: c8870533-24b3-4312-8566-cd09fe0e15e3
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=PUT, openapi-generated=true, operation=updateNote, path=/notes/{id}, status=500
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"PUT","openapi-generated":"true","operation":"updateNote","path":"/notes/{id}","status":"500"},"uuid":"yIcFMySzQxKFZs0J/g4V4w==","direction":"OUT","network_address":"localhost:80","command":"PUT","location":"/notes/{id}","status":"500","http":{"req":{"url":"/v1/api/notes/{id}","uri":"/v1/api/notes/{id}","version":"1.1","method":"PUT","host":"localhost","headers":{"Accept":["application/json, */*"],"Content-Type":["application/json"],"Prefer":["status=500"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]},"bodyBase64":"ewogICJhc3NvY2lhdGlvbnMiOiBbCiAgICB7CiAgICAgICJub3RlX2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICJyZWNvcmRfaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAgICAgInJlY29yZF90eXBlIjogImV4YW1wbGVfdmFsdWUiCiAgICB9LAogICAgewogICAgICAibm90ZV9pZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAicmVjb3JkX2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICJyZWNvcmRfdHlwZSI6ICJleGFtcGxlX3ZhbHVlIgogICAgfQogIF0sCiAgImNvbnRlbnQiOiAiZXhhbXBsZV92YWx1ZSIsCiAgImNyZWF0ZWRfYnkiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIgp9"},"res":{"contentType":"application/json","statusCode":500,"statusMessage":"Internal Server Error","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJjb2RlIjogNTAsCiAgIm1lc3NhZ2UiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"UFVU","http:queryparams":"","http:requestBodyJSON":"eyJhc3NvY2lhdGlvbnMiOlt7Im5vdGVfaWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJyZWNvcmRfaWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJyZWNvcmRfdHlwZSI6ImV4YW1wbGVfdmFsdWUifSx7Im5vdGVfaWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJyZWNvcmRfaWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJyZWNvcmRfdHlwZSI6ImV4YW1wbGVfdmFsdWUifV0sImNvbnRlbnQiOiJleGFtcGxlX3ZhbHVlIiwiY3JlYXRlZF9ieSI6IjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCJ9","http:url":"L3YxL2FwaS9ub3Rlcy97aWR9"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
