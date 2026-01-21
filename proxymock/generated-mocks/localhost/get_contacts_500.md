### REQUEST ###
```
GET http://localhost:80/v1/api/contacts?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D HTTP/1.1
Accept: application/json\, */*
Prefer: status=500
User-Agent: OpenAPI-Mock-Generator/1.0
```

```
```

### RESPONSE ###
```
HTTP/1.1 500 Internal Server Error
Cache-Control: no-cache
Content-Type: application/json
Server: OpenAPI-Mock-Server/1.0
```

```
{
  "code": 50,
  "message": "example_value"
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
uuid: 88819271-e210-4e92-8db3-3950bd1b6851
ts: 1970-01-01T00:00:00Z
duration: 0ms
tags: method=GET, openapi-generated=true, operation=listContacts, path=/contacts, status=500
```

### INTERNAL - DO NOT MODIFY ###
```
json: {"l7protocol":"http","tags":{"method":"GET","openapi-generated":"true","operation":"listContacts","path":"/contacts","status":"500"},"uuid":"iIGSceIQTpKNszlQvRtoUQ==","direction":"OUT","network_address":"localhost:80","command":"GET","location":"/contacts","status":"500","http":{"req":{"url":"/v1/api/contacts","uri":"/v1/api/contacts?limit=%24%7B%7Bparam%3Alimit%7D%7D&offset=%24%7B%7Bparam%3Aoffset%7D%7D","version":"1.1","method":"GET","host":"localhost","headers":{"Accept":["application/json, */*"],"Prefer":["status=500"],"User-Agent":["OpenAPI-Mock-Generator/1.0"]}},"res":{"contentType":"application/json","statusCode":500,"statusMessage":"Internal Server Error","headers":{"Cache-Control":["no-cache"],"Content-Type":["application/json"],"Server":["OpenAPI-Mock-Server/1.0"]},"bodyBase64":"ewogICJjb2RlIjogNTAsCiAgIm1lc3NhZ2UiOiAiZXhhbXBsZV92YWx1ZSIKfQ=="}},"signature":{"http:host":"bG9jYWxob3N0","http:method":"R0VU","http:queryparams":"","http:url":"L3YxL2FwaS9jb250YWN0cw=="},"netinfo":{"upstream":{"port":80,"hostname":"localhost"}}}
```
