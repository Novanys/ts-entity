# ts-entity

A lightweight package for generating typescript interfaces, classes, types and enums as a string. Works in browsers.

**Use other mature and robust packages!** for a more stable typescript generator. This is a fun side-project that is heavly inspired by [ts-morph](https://github.com/dsherret/ts-morph) but isnt wrapping tsc and works in the browser out-of-box. It is made in mind that it need to be working in runtime to generate a string with interfaces, classes, types and enums.

# Example
```javascript
import { Entity } from 'ts-entity';

const myEntity = new Entity();

const data = myEntity.addInterface({ name: 'Data' });

data
    .addProperty({ name: 'firstName', type: 'string' })
    .addProperty({ name: 'lastName', type: 'string' })
    .addProperty({ name: 'age', type: 'number' });


// Do something with the the string...
const myEntityAsString = myEntity.load();
/* 
interface Data {
    firstName: string;
    lastName: string;
    age: number;
}
*/

```