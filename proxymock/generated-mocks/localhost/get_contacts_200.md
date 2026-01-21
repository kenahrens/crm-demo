### REQUEST ###
```
GET http://localhost:80/v1/api/contacts?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D HTTP/1.1
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
    },
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
http:url is /v1/api/contacts
```

### METADATA ###
```
direction: OUT
uuid: a7d8ead9-125d-4d67-bcba-26ded370d6fe
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=listContacts, path=/contacts, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"listContacts","path":"/contacts","status":"200"},"uuid":"p9jq2RJdTWe8uibe03DW/g==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/contacts","status":"200","http":{"req":{"url":"/v1/api/contacts","uri":"/v1/api/contacts?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJkYXRhIjogWwogICAgewogICAgICAiYWNjb3VudF9pZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAiYWRkcmVzcyI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICAgImNpdHkiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJjb3VudHJ5IjogImV4YW1wbGVfdmFsdWUiLAogICAgICAiY3JlYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgICAgICJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIiwKICAgICAgImZpcnN0X25hbWUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJpZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAibGFzdF9uYW1lIjogImV4YW1wbGVfdmFsdWUiLAogICAgICAicGhvbmUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJzdGF0ZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICAgInRpdGxlIjogImV4YW1wbGVfdmFsdWUiLAogICAgICAidXBkYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgICAgICJ6aXAiOiAiZXhhbXBsZV92YWx1ZSIKICAgIH0sCiAgICB7CiAgICAgICJhY2NvdW50X2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICJhZGRyZXNzIjogImV4YW1wbGVfdmFsdWUiLAogICAgICAiY2l0eSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICAgImNvdW50cnkiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJjcmVhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAgICAgImVtYWlsIjogInVzZXJAZXhhbXBsZS5jb20iLAogICAgICAiZmlyc3RfbmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICAgImlkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICJsYXN0X25hbWUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJwaG9uZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICAgInN0YXRlIjogImV4YW1wbGVfdmFsdWUiLAogICAgICAidGl0bGUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJ1cGRhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAgICAgInppcCI6ICJleGFtcGxlX3ZhbHVlIgogICAgfQogIF0sCiAgImxpbWl0IjogNTAsCiAgIm9mZnNldCI6IDUwLAogICJ0b3RhbCI6IDUwCn0="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9jb250YWN0cw=="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
