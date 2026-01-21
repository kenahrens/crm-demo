### REQUEST ###
```
GET http://localhost:80/v1/api/accounts?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D HTTP/1.1
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
  "data": [
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
    },
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
  ],
  "limit": 50,
  "offset": 50,
  "total": 50
}
```

### SIGNATURE ###
```
http:host is localhost
http:method is GET
http:queryparams is -NONE-
http:url is /v1/api/accounts
```

### METADATA ###
```
direction: OUT
uuid: 409e2095-cbb8-4c55-82e7-0aa9f9baa52f
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=listAccounts, path=/accounts, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"listAccounts","path":"/accounts","status":"200"},"uuid":"QJ4glcu4TFWC5wqp+bqlLw==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/accounts","status":"200","http":{"req":{"url":"/v1/api/accounts","uri":"/v1/api/accounts?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJkYXRhIjogWwogICAgewogICAgICAiYWRkcmVzcyI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICAgImNpdHkiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJjb3VudHJ5IjogImV4YW1wbGVfdmFsdWUiLAogICAgICAiY3JlYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgICAgICJpZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAiaW5kdXN0cnkiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJuYW1lIjogImV4YW1wbGVfdmFsdWUiLAogICAgICAicGhvbmUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJzdGF0ZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICAgInVwZGF0ZWRfYXQiOiAiMjAyNC0wMS0xNVQxMDozMDowMFoiLAogICAgICAid2Vic2l0ZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICAgInppcCI6ICJleGFtcGxlX3ZhbHVlIgogICAgfSwKICAgIHsKICAgICAgImFkZHJlc3MiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJjaXR5IjogImV4YW1wbGVfdmFsdWUiLAogICAgICAiY291bnRyeSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICAgImNyZWF0ZWRfYXQiOiAiMjAyNC0wMS0xNVQxMDozMDowMFoiLAogICAgICAiaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAgICAgImluZHVzdHJ5IjogImV4YW1wbGVfdmFsdWUiLAogICAgICAibmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICAgInBob25lIjogImV4YW1wbGVfdmFsdWUiLAogICAgICAic3RhdGUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJ1cGRhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAgICAgIndlYnNpdGUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJ6aXAiOiAiZXhhbXBsZV92YWx1ZSIKICAgIH0KICBdLAogICJsaW1pdCI6IDUwLAogICJvZmZzZXQiOiA1MCwKICAidG90YWwiOiA1MAp9"}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9hY2NvdW50cw=="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
