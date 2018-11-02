[![Build Status](https://travis-ci.com/Alheimsins/tilnefna.svg?branch=master)](https://travis-ci.com/Alheimsins/tilnefna)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

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
### ```POST /api/{WEBHOOK_TOKEN}/confirm```



# License
[MIT](LICENSE)
