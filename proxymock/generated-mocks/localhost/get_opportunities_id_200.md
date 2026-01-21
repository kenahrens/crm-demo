### REQUEST ###
```
GET http://localhost:80/v1/api/opportunities/{id} HTTP/1.1
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
http:method is GET
http:queryparams is -NONE-
http:url is /v1/api/opportunities/{id}
```

### METADATA ###
```
direction: OUT
uuid: 07cdf2cf-8c10-48c2-9461-705c35bf7aff
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=getOpportunity, path=/opportunities/{id}, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"getOpportunity","path":"/opportunities/{id}","status":"200"},"uuid":"B83yz4wQSMKUYXBcNb96/w==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/opportunities/{id}","status":"200","http":{"req":{"url":"/v1/api/opportunities/{id}","uri":"/v1/api/opportunities/{id}","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJhY2NvdW50X2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgImFtb3VudCI6IDUwLjUsCiAgImNsb3NlX2RhdGUiOiAiMjAyNC0wMS0xNSIsCiAgImNyZWF0ZWRfYXQiOiAiMjAyNC0wMS0xNVQxMDozMDowMFoiLAogICJpZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICJvcHBvcnR1bml0eV9uYW1lIjogImV4YW1wbGVfdmFsdWUiLAogICJwcmltYXJ5X2NvbnRhY3RfaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAicHJvYmFiaWxpdHkiOiA1MCwKICAic3RhZ2UiOiAiZXhhbXBsZV92YWx1ZSIsCiAgInVwZGF0ZWRfYXQiOiAiMjAyNC0wMS0xNVQxMDozMDowMFoiCn0="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9vcHBvcnR1bml0aWVzL3tpZH0="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
