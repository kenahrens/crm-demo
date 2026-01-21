### REQUEST ###
```
POST http://localhost:80/v1/api/opportunities HTTP/1.1
Accept: application/json\, */*
Content-Type: application/json
Prefer: status=201
User-Agent: OpenAPI-Mock-Generator/1.0
```

```
{
  "account_id": "123e4567-e89b-12d3-a456-426614174000",
  "amount": 50.5,
  "close_date": "2024-01-15",
  "opportunity_name": "example_value",
  "primary_contact_id": "123e4567-e89b-12d3-a456-426614174000",
  "probability": 50,
  "stage": "example_value"
}
```

### RESPONSE ###
```
HTTP/1.1 201 Created
Cache-Control: no-cache
Content-Type: application/json
Server: OpenAPI-Mock-Server/1.0
```

```
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
```

### SIGNATURE ###
```
http:host is localhost
http:method is POST
http:queryparams is -NONE-
http:requestBodyJSON is {"account_id":"123e4567-e89b-12d3-a456-426614174000","amount":50.5,"close_date":"2024-01-15","opportunity_name":"example_value","primary_contact_id":"123e4567-e89b-12d3-a456-426614174000","probability":50,"stage":"example_value"}
http:url is /v1/api/opportunities
```

### METADATA ###
```
direction: OUT
uuid: 5681e52e-4191-4bc3-a337-5557e6b874aa
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=POST, openapi-generated=true, operation=createOpportunity, path=/opportunities, status=201
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"POST","openapi-generated":"true","operation":"createOpportunity","path":"/opportunities","status":"201"},"uuid":"VoHlLkGRS8OjN1VX5rh0qg==","direction":"OUT","network_address":"localhost:80","command":"POST","location":"/opportunities","status":"201","http":{"req":{"url":"/v1/api/opportunities","uri":"/v1/api/opportunities","version":"1.1","method":"POST","host":"localhost","headers":{"Accept":["application/json, */*"],"Content-Type":["application/json"],"Prefer":["status=201"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]},"bodyBase64":"ewogICJhY2NvdW50X2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgImFtb3VudCI6IDUwLjUsCiAgImNsb3NlX2RhdGUiOiAiMjAyNC0wMS0xNSIsCiAgIm9wcG9ydHVuaXR5X25hbWUiOiAiZXhhbXBsZV92YWx1ZSIsCiAgInByaW1hcnlfY29udGFjdF9pZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICJwcm9iYWJpbGl0eSI6IDUwLAogICJzdGFnZSI6ICJleGFtcGxlX3ZhbHVlIgp9"},"res":{"contentType":"application/json","statusCode":201,"statusMessage":"Created","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJhY2NvdW50X2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgImFtb3VudCI6IDUwLjUsCiAgImNsb3NlX2RhdGUiOiAiMjAyNC0wMS0xNSIsCiAgImNyZWF0ZWRfYXQiOiAiMjAyNC0wMS0xNVQxMDozMDowMFoiLAogICJpZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICJvcHBvcnR1bml0eV9uYW1lIjogImV4YW1wbGVfdmFsdWUiLAogICJwcmltYXJ5X2NvbnRhY3RfaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAicHJvYmFiaWxpdHkiOiA1MCwKICAic3RhZ2UiOiAiZXhhbXBsZV92YWx1ZSIsCiAgInVwZGF0ZWRfYXQiOiAiMjAyNC0wMS0xNVQxMDozMDowMFoiCn0="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"UE9TVA==","http:queryparams":"","http:requestBodyJSON":"eyJhY2NvdW50X2lkIjoiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwiYW1vdW50Ijo1MC41LCJjbG9zZV9kYXRlIjoiMjAyNC0wMS0xNSIsIm9wcG9ydHVuaXR5X25hbWUiOiJleGFtcGxlX3ZhbHVlIiwicHJpbWFyeV9jb250YWN0X2lkIjoiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwicHJvYmFiaWxpdHkiOjUwLCJzdGFnZSI6ImV4YW1wbGVfdmFsdWUifQ==","http:url":"L3YxL2FwaS9vcHBvcnR1bml0aWVz"},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
