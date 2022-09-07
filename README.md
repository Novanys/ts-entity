# ts-entity

Package to generate typescript interfaces, classes and enums as a string. Works in browsers.

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