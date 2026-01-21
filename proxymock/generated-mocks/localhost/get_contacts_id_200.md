### REQUEST ###
```
GET http://localhost:80/v1/api/contacts/{id} HTTP/1.1
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
  "account_id": "123e4567-e89b-12d3-a456-426614174000",
  "address": "example_value",
  "city": "example_value",
  "country": "example_value",
  "created_at": "2024-01-15T10:30:00Z",
  "email": "user@example.com",
  "first_name": "example_value",
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "last_name": "example_value",
  "phone": "example_value",
  "state": "example_value",
  "title": "example_value",
  "updated_at": "2024-01-15T10:30:00Z",
  "zip": "example_value"
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
uuid: 5965b348-3955-41a1-ad34-6eff15b9f417
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=getContact, path=/contacts/{id}, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"getContact","path":"/contacts/{id}","status":"200"},"uuid":"WWWzSDlVQaGtNG7/Fbn0Fw==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/contacts/{id}","status":"200","http":{"req":{"url":"/v1/api/contacts/{id}","uri":"/v1/api/contacts/{id}","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJhY2NvdW50X2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgImFkZHJlc3MiOiAiZXhhbXBsZV92YWx1ZSIsCiAgImNpdHkiOiAiZXhhbXBsZV92YWx1ZSIsCiAgImNvdW50cnkiOiAiZXhhbXBsZV92YWx1ZSIsCiAgImNyZWF0ZWRfYXQiOiAiMjAyNC0wMS0xNVQxMDozMDowMFoiLAogICJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIiwKICAiZmlyc3RfbmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAiaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAibGFzdF9uYW1lIjogImV4YW1wbGVfdmFsdWUiLAogICJwaG9uZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAic3RhdGUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgInRpdGxlIjogImV4YW1wbGVfdmFsdWUiLAogICJ1cGRhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAiemlwIjogImV4YW1wbGVfdmFsdWUiCn0="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9jb250YWN0cy97aWR9"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
