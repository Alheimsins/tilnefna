# tilnefna

Service for nominating people for something

## API

### ```POST /api/nominate```

```JavaScript
{
  name: 'Geir',
  mobile: '1726347',
  nomineeName: 'Jonas',
  nomineeMobile: '1983645'
}
```

```
$ curl http://localhost:3000/api/nominate -d '{"name": "Geir", "mobile":"87654", "nomineeName":"Jonas", "nomineeMobile":"1928273"}'
```
### ```POST /api/confirm```



# License
[MIT](LICENSE)
