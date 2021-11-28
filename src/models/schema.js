// export const schema = {
//     "models": {
//         "Order": {
//             "name": "Order",
//             "fields": {
//                 "id": {
//                     "name": "id",
//                     "isArray": false,
//                     "type": "ID",
//                     "isRequired": true,
//                     "attributes": []
//                 },
//                 "user": {
//                     "name": "user",
//                     "isArray": false,
//                     "type": {
//                         "nonModel": "User"
//                     },
//                     "isRequired": true,
//                     "attributes": []
//                 },
//                 "items": {
//                     "name": "items",
//                     "isArray": true,
//                     "type": {
//                         "nonModel": "Item"
//                     },
//                     "isRequired": false,
//                     "attributes": [],
//                     "isArrayNullable": true
//                 },
//                 "createdAt": {
//                     "name": "createdAt",
//                     "isArray": false,
//                     "type": "AWSDateTime",
//                     "isRequired": false,
//                     "attributes": [],
//                     "isReadOnly": true
//                 },
//                 "updatedAt": {
//                     "name": "updatedAt",
//                     "isArray": false,
//                     "type": "AWSDateTime",
//                     "isRequired": false,
//                     "attributes": [],
//                     "isReadOnly": true
//                 }
//             },
//             "syncable": true,
//             "pluralName": "Orders",
//             "attributes": [
//                 {
//                     "type": "model",
//                     "properties": {}
//                 }
//             ]
//         }
//     },
//     "enums": {},
//     "nonModels": {
//         "User": {
//             "name": "User",
//             "fields": {
//                 "fullName": {
//                     "name": "fullName",
//                     "isArray": false,
//                     "type": "String",
//                     "isRequired": true,
//                     "attributes": []
//                 },
//                 "phone": {
//                     "name": "phone",
//                     "isArray": false,
//                     "type": "ID",
//                     "isRequired": true,
//                     "attributes": []
//                 },
//                 "email": {
//                     "name": "email",
//                     "isArray": false,
//                     "type": "String",
//                     "isRequired": false,
//                     "attributes": []
//                 }
//             }
//         },
//         "Item": {
//             "name": "Item",
//             "fields": {
//                 "id": {
//                     "name": "id",
//                     "isArray": false,
//                     "type": "ID",
//                     "isRequired": true,
//                     "attributes": []
//                 },
//                 "price": {
//                     "name": "price",
//                     "isArray": false,
//                     "type": "String",
//                     "isRequired": true,
//                     "attributes": []
//                 },
//                 "count": {
//                     "name": "count",
//                     "isArray": false,
//                     "type": "String",
//                     "isRequired": true,
//                     "attributes": []
//                 },
//                 "desc": {
//                     "name": "desc",
//                     "isArray": false,
//                     "type": "String",
//                     "isRequired": true,
//                     "attributes": []
//                 },
//                 "model": {
//                     "name": "model",
//                     "isArray": false,
//                     "type": "String",
//                     "isRequired": true,
//                     "attributes": []
//                 }
//             }
//         }
//     },
//     "version": "701388fd587efb5e7baff288a9918f66"
// };
