### REQUEST ###
```
GET http://localhost:80/v1/api/accounts/{id} HTTP/1.1
Accept: application/json\, */*
Prefer: status=200
User-Agent: OpenAPI-Mock-Generator/1.0
```

```
```

### RESPONSE ###
```
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Type: application/json
Server: OpenAPI-Mock-Server/1.0
```

```
{
  "address": "example_value",
  "city": "example_value",
  "country": "example_value",
  "created_at": "2024-01-15T10:30:00Z",
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "industry": "example_value",
  "name": "example_value",
  "phone": "example_value",
  "state": "example_value",
  "updated_at": "2024-01-15T10:30:00Z",
  "website": "example_value",
  "zip": "example_value"
}
```

### SIGNATURE ###
```
http:host is localhost
http:method is GET
http:queryparams is -NONE-
http:url is /v1/api/accounts/{id}
```

### METADATA ###
```
direction: OUT
uuid: d921e569-4b70-4667-bb68-5785da4ac9e2
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=getAccount, path=/accounts/{id}, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"getAccount","path":"/accounts/{id}","status":"200"},"uuid":"2SHlaUtwRme7aFeF2krJ4g==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/accounts/{id}","status":"200","http":{"req":{"url":"/v1/api/accounts/{id}","uri":"/v1/api/accounts/{id}","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJhZGRyZXNzIjogImV4YW1wbGVfdmFsdWUiLAogICJjaXR5IjogImV4YW1wbGVfdmFsdWUiLAogICJjb3VudHJ5IjogImV4YW1wbGVfdmFsdWUiLAogICJjcmVhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAiaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAiaW5kdXN0cnkiOiAiZXhhbXBsZV92YWx1ZSIsCiAgIm5hbWUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgInBob25lIjogImV4YW1wbGVfdmFsdWUiLAogICJzdGF0ZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAidXBkYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgIndlYnNpdGUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgInppcCI6ICJleGFtcGxlX3ZhbHVlIgp9"}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9hY2NvdW50cy97aWR9"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
