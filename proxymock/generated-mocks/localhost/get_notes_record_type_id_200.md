### REQUEST ###
```
GET http://localhost:80/v1/api/notes/record/{type}/{id} HTTP/1.1
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
]
```

### SIGNATURE ###
```
http:host is localhost
http:method is GET
http:queryparams is -NONE-
http:url is /v1/api/notes/record/{type}/{id}
```

### METADATA ###
```
direction: OUT
uuid: fd2657c8-4a8f-452f-b449-558e0c1a99da
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=getNotesByRecord, path=/notes/record/{type}/{id}, status=200
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"getNotesByRecord","path":"/notes/record/{type}/{id}","status":"200"},"uuid":"/SZXyEqPRS+0SVWODBqZ2g==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/notes/record/{type}/{id}","status":"200","http":{"req":{"url":"/v1/api/notes/record/{type}/{id}","uri":"/v1/api/notes/record/{type}/{id}","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=200"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":200,"statusMessage":"OK","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"WwogIHsKICAgICJhc3NvY2lhdGlvbnMiOiBbCiAgICAgIHsKICAgICAgICAibm90ZV9pZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAgICJyZWNvcmRfaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAgICAgICAicmVjb3JkX3R5cGUiOiAiZXhhbXBsZV92YWx1ZSIKICAgICAgfSwKICAgICAgewogICAgICAgICJub3RlX2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICAgInJlY29yZF9pZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAgICJyZWNvcmRfdHlwZSI6ICJleGFtcGxlX3ZhbHVlIgogICAgICB9CiAgICBdLAogICAgImNvbnRlbnQiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAiY3JlYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgICAiY3JlYXRlZF9ieSI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgImlkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAidXBkYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIKICB9LAogIHsKICAgICJhc3NvY2lhdGlvbnMiOiBbCiAgICAgIHsKICAgICAgICAibm90ZV9pZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAgICJyZWNvcmRfaWQiOiAiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwKICAgICAgICAicmVjb3JkX3R5cGUiOiAiZXhhbXBsZV92YWx1ZSIKICAgICAgfSwKICAgICAgewogICAgICAgICJub3RlX2lkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAgICAgInJlY29yZF9pZCI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgICAgICJyZWNvcmRfdHlwZSI6ICJleGFtcGxlX3ZhbHVlIgogICAgICB9CiAgICBdLAogICAgImNvbnRlbnQiOiAiZXhhbXBsZV92YWx1ZSIsCiAgICAiY3JlYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIsCiAgICAiY3JlYXRlZF9ieSI6ICIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLAogICAgImlkIjogIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsCiAgICAidXBkYXRlZF9hdCI6ICIyMDI0LTAxLTE1VDEwOjMwOjAwWiIKICB9Cl0="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9ub3Rlcy9yZWNvcmQve3R5cGV9L3tpZH0="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
