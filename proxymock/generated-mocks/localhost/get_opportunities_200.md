### REQUEST ###
```
GET http://localhost:80/v1/api/opportunities?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D HTTP/1.1
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
http:url is /v1/api/opportunities
```

### METADATA ###
```
direction: OUT
uuid: eb8e5553-4581-4701-9a3d-cbd43c2d873b
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=listOpportunities, path=/opportunities, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"listOpportunities","path":"/opportunities","status":"200"},"uuid":"645VU0WBRwGaPcvUPC2HOw==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/opportunities","status":"200","http":{"req":{"url":"/v1/api/opportunities","uri":"/v1/api/opportunities?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJkYXRhIjogWwogICAgewogICAgICAiYWNjb3VudF9pZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAiYW1vdW50IjogNTAuNSwKICAgICAgImNsb3NlX2RhdGUiOiAiMjAyNC0wMS0xNSIsCiAgICAgICJjcmVhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAgICAgImlkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICJvcHBvcnR1bml0eV9uYW1lIjogImV4YW1wbGVfdmFsdWUiLAogICAgICAicHJpbWFyeV9jb250YWN0X2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICJwcm9iYWJpbGl0eSI6IDUwLAogICAgICAic3RhZ2UiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJ1cGRhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIgogICAgfSwKICAgIHsKICAgICAgImFjY291bnRfaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAgICAgImFtb3VudCI6IDUwLjUsCiAgICAgICJjbG9zZV9kYXRlIjogIjIwMjQtMDEtMTUiLAogICAgICAiY3JlYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgICAgICJpZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAib3Bwb3J0dW5pdHlfbmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICAgInByaW1hcnlfY29udGFjdF9pZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAicHJvYmFiaWxpdHkiOiA1MCwKICAgICAgInN0YWdlIjogImV4YW1wbGVfdmFsdWUiLAogICAgICAidXBkYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIKICAgIH0KICBdLAogICJsaW1pdCI6IDUwLAogICJvZmZzZXQiOiA1MCwKICAidG90YWwiOiA1MAp9"}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9vcHBvcnR1bml0aWVz"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
