[![Build Status](https://travis-ci.org/rocknrolla777/loopback-cascade-delete-mixin.svg?branch=master)](https://travis-ci.org/rocknrolla777/loopback-cascade-delete-mixin)
[![NSP Status](https://nodesecurity.io/orgs/sergey-reus/projects/bd845837-c965-417a-96f3-013110ed3f58/badge)](https://nodesecurity.io/orgs/sergey-reus/projects/bd845837-c965-417a-96f3-013110ed3f58)
# cascade-delete-mixin

[![Greenkeeper badge](https://badges.greenkeeper.io/rocknrolla777/loopback-cascade-delete-mixin.svg)](https://greenkeeper.io/)

This module is designed for the [Strongloop Loopback](https://github.com/strongloop/loopback) framework. It provides cascade delete with a simple configuration on your models.

## install

```bash
  npm install --save loopback-cascade-delete-mixin
```
Node.js v. > 6

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
        "relations": ["properties", "description"],
        "relationsConfig": {
          "properties": {
            "relationKey": "customForeignKey"
          }
        }
        "deepDelete": true,
      }
    }
  }
```

**options**

| option | type | description | required |
| ------ | ---- | ----------- | -------- |
|relations| [String] | relations which you want to delete together with current model | true |
|relationsConfig| [Object] | optionally define custom foreign keys for any relation to delete. Can be useful when using polymorphic relations | false |
|deepDelete| [Boolean] | enable or disable the deep delete function. If activated, the CascadeDelete will be executed on the deleted related models as well (if they have the CascadeDelete mixin specified). If not used, disable it for performance matters | false |

## tests

Run the tests:
```bash
  npm test
```
Run with debugging output on:

```bash
  DEBUG='loopback:mixins:cascade-delete' npm test
```
