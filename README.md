[![Build Status](https://travis-ci.org/rocknrolla777/loopback-cascade-delete-mixin.svg?branch=master)](https://travis-ci.org/rocknrolla777/loopback-cascade-delete-mixin)

# cascade-delete-mixin

This module is designed for the [Strongloop Loopback](https://github.com/strongloop/loopback) framework. It provides cascade delete with a simple configuration on your models.

## install

```bash
  npm install --save loopback-cascade-delete-mixin
```

## mixinsources

Add the `mixins` property to your `server/model-config.json` like the following:

```json
{
  "_meta": {
    "sources": [
      "loopback/common/models",
      "loopback/server/models",
      "../common/models",
      "./models"
    ],
    "mixins": [
      "loopback/common/mixins",
      "../node_modules/loopback-cascade-delete-mixin",
      "../common/mixins"
    ]
  }
}
```

## config

To use with your Models add the `mixins` attribute to the definition object of your model config.

```json
  {
    "name": "Product",
    "properties": {
      "name": {
        "type": "string",
      }
    },
    "relations": {
        "properties": {
          "type": "hasMany",
          "model": "Property",
          "foreignKey": ""
        }
     },
    "mixins": {
      "CascadeDelete": {
         "relations": ["properties", "description"]
       }
    }
  }
```

**options**

| option | type | description | required |
| ------ | ---- | ----------- | -------- |
|relations| [String] | relations which you want to delete together with current model | true |

## tests

Run the tests: 
```bash
  npm test
```
Run with debugging output on:

```bash
  DEBUG='loopback:mixins:cascade-delete' npm test
```





