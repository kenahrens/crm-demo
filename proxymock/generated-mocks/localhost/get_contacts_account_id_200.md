### REQUEST ###
```
GET http://localhost:80/v1/api/contacts/account/{id} HTTP/1.1
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
]
```

### SIGNATURE ###
```
http:host is localhost
http:method is GET
http:queryparams is -NONE-
http:url is /v1/api/contacts/account/{id}
```

### METADATA ###
```
direction: OUT
uuid: d3cf2489-8515-484d-b295-0adc79095089
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=getContactsByAccount, path=/contacts/account/{id}, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"getContactsByAccount","path":"/contacts/account/{id}","status":"200"},"uuid":"088kiYUVSE2ylQrceQlQiQ==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/contacts/account/{id}","status":"200","http":{"req":{"url":"/v1/api/contacts/account/{id}","uri":"/v1/api/contacts/account/{id}","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"WwogIHsKICAgICJhY2NvdW50X2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAiYWRkcmVzcyI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJjaXR5IjogImV4YW1wbGVfdmFsdWUiLAogICAgImNvdW50cnkiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAiY3JlYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgICAiZW1haWwiOiAidXNlckBleGFtcGxlLmNvbSIsCiAgICAiZmlyc3RfbmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJpZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgImxhc3RfbmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJwaG9uZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJzdGF0ZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJ0aXRsZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJ1cGRhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAgICJ6aXAiOiAiZXhhbXBsZV92YWx1ZSIKICB9LAogIHsKICAgICJhY2NvdW50X2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAiYWRkcmVzcyI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJjaXR5IjogImV4YW1wbGVfdmFsdWUiLAogICAgImNvdW50cnkiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAiY3JlYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgICAiZW1haWwiOiAidXNlckBleGFtcGxlLmNvbSIsCiAgICAiZmlyc3RfbmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJpZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgImxhc3RfbmFtZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJwaG9uZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJzdGF0ZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJ0aXRsZSI6ICJleGFtcGxlX3ZhbHVlIiwKICAgICJ1cGRhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAgICJ6aXAiOiAiZXhhbXBsZV92YWx1ZSIKICB9Cl0="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9jb250YWN0cy9hY2NvdW50L3tpZH0="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
