### REQUEST ###
```
GET http://localhost:80/v1/api/notes?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D HTTP/1.1
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
      "created_at": "2024-01-15T10:30:00Z",
      "created_by": "123e4567-e89b-12d3-a456-426614174000",
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "updated_at": "2024-01-15T10:30:00Z"
    },
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
      "created_at": "2024-01-15T10:30:00Z",
      "created_by": "123e4567-e89b-12d3-a456-426614174000",
      "id": "123e4567-e89b-12d3-a456-426614174000",
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
http:url is /v1/api/notes
```

### METADATA ###
```
direction: OUT
uuid: e658500d-1c19-4ab7-8866-b3d711fbaa46
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=listNotes, path=/notes, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"listNotes","path":"/notes","status":"200"},"uuid":"5lhQDRwZSreIZrPXEfuqRg==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/notes","status":"200","http":{"req":{"url":"/v1/api/notes","uri":"/v1/api/notes?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJkYXRhIjogWwogICAgewogICAgICAiYXNzb2NpYXRpb25zIjogWwogICAgICAgIHsKICAgICAgICAgICJub3RlX2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICAgICAicmVjb3JkX2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICAgICAicmVjb3JkX3R5cGUiOiAiZXhhbXBsZV92YWx1ZSIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJub3RlX2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICAgICAicmVjb3JkX2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICAgICAicmVjb3JkX3R5cGUiOiAiZXhhbXBsZV92YWx1ZSIKICAgICAgICB9CiAgICAgIF0sCiAgICAgICJjb250ZW50IjogImV4YW1wbGVfdmFsdWUiLAogICAgICAiY3JlYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgICAgICJjcmVhdGVkX2J5IjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICJpZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAidXBkYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIKICAgIH0sCiAgICB7CiAgICAgICJhc3NvY2lhdGlvbnMiOiBbCiAgICAgICAgewogICAgICAgICAgIm5vdGVfaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAgICAgICAgICJyZWNvcmRfaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAgICAgICAgICJyZWNvcmRfdHlwZSI6ICJleGFtcGxlX3ZhbHVlIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIm5vdGVfaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAgICAgICAgICJyZWNvcmRfaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAgICAgICAgICJyZWNvcmRfdHlwZSI6ICJleGFtcGxlX3ZhbHVlIgogICAgICAgIH0KICAgICAgXSwKICAgICAgImNvbnRlbnQiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAgICJjcmVhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIiwKICAgICAgImNyZWF0ZWRfYnkiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAgICAgImlkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICJ1cGRhdGVkX2F0IjogIjIwMjQtMDEtMTVUMTA6MzA6MDBaIgogICAgfQogIF0sCiAgImxpbWl0IjogNTAsCiAgIm9mZnNldCI6IDUwLAogICJ0b3RhbCI6IDUwCn0="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9ub3Rlcw=="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
