### REQUEST ###
```
GET http://localhost:80/v1/api/opportunities/account/{id} HTTP/1.1
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
[
  {
    "account_id": "123e4567-e89b-12d3-a456-426614174000",
    "amount": 50.5,
    "close_date": "2024-01-15",
    "created_at": "2024-01-15T10:30:00Z",
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "opportunity_name": "example_value",
    "primary_contact_id": "123e4567-e89b-12d3-a456-426614174000",
    "probability": 50,
    "stage": "example_value",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  {
    "account_id": "123e4567-e89b-12d3-a456-426614174000",
    "amount": 50.5,
    "close_date": "2024-01-15",
    "created_at": "2024-01-15T10:30:00Z",
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "opportunity_name": "example_value",
    "primary_contact_id": "123e4567-e89b-12d3-a456-426614174000",
    "probability": 50,
    "stage": "example_value",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

### SIGNATURE ###
```
http:host is localhost
http:method is GET
http:queryparams is -NONE-
http:url is /v1/api/opportunities/account/{id}
```

### METADATA ###
```
direction: OUT
uuid: 7532454b-600b-41f0-81f5-01d247212de7
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=getOpportunitiesByAccount, path=/opportunities/account/{id}, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"getOpportunitiesByAccount","path":"/opportunities/account/{id}","status":"200"},"uuid":"dTJFS2ALQfCB9QHSRyEt5w==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/opportunities/account/{id}","status":"200","http":{"req":{"url":"/v1/api/opportunities/account/{id}","uri":"/v1/api/opportunities/account/{id}","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"WwogIHsKICAgICJhY2NvdW50X2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAiYW1vdW50IjogNTAuNSwKICAgICJjbG9zZV9kYXRlIjogIjIwMjQtMDEtMTUiLAogICAgImNyZWF0ZWRfYXQiOiAiMjAyNC0wMS0xNVQxMDozMDowMFoiLAogICAgImlkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAib3Bwb3J0dW5pdHlfbmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJwcmltYXJ5X2NvbnRhY3RfaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAgICJwcm9iYWJpbGl0eSI6IDUwLAogICAgInN0YWdlIjogImV4YW1wbGVfdmFsdWUiLAogICAgInVwZGF0ZWRfYXQiOiAiMjAyNC0wMS0xNVQxMDozMDowMFoiCiAgfSwKICB7CiAgICAiYWNjb3VudF9pZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgImFtb3VudCI6IDUwLjUsCiAgICAiY2xvc2VfZGF0ZSI6ICIyMDI0LTAxLTE1IiwKICAgICJjcmVhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAgICJpZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgIm9wcG9ydHVuaXR5X25hbWUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAicHJpbWFyeV9jb250YWN0X2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAicHJvYmFiaWxpdHkiOiA1MCwKICAgICJzdGFnZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJ1cGRhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIgogIH0KXQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9vcHBvcnR1bml0aWVzL2FjY291bnQve2lkfQ=="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
