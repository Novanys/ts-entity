export interface EntityInterface {
    readonly isExported: boolean;
    readonly extends: string;
    readonly implements: string;
    readonly properties: Map<string, any>;
    addProperty({ name, type }): EntityInterface;
}

const DEFAULT_INDENTATION_STEP = 1;
const DEFAULT_INDENTATION = '\t';

export default class Entity {
    private _entity = new Map();
    private _indentationStep = DEFAULT_INDENTATION_STEP;
    private _indentation = DEFAULT_INDENTATION;

    constructor({ indentationStep }: { indentationStep?: number } = {}) {
        if (indentationStep !== undefined) {
            this._indentationStep = indentationStep;
        }

        this._indentation = this._indentation.repeat(this._indentationStep);
    }
    
    public addInterface = (arg: { name: string, isExported?: boolean, implements?: string, extends?: string }): EntityInterface => {
        if (this._entity.get(arg.name)) {
            throw new Error(`An interface with the name "${name}" is already declared`);
        }

        let newInterface: EntityInterface = {
            isExported: arg.isExported,
            extends: arg.extends,
            implements: arg.implements,
            properties: new Map(),
            addProperty: ({ name: propertyName, type: propertyType }: { name: string; type: string }) => {
                newInterface.properties.set(propertyName, propertyType);

                this._entity.set(arg.name, newInterface);

                return this._entity.get(arg.name);
            }
        };
        this._entity.set(arg.name, newInterface);

        return this._entity.get(arg.name);
    }

    private buildProperty = ({name, type }: { name: string, type: string }) => {
        return `${this._indentation}${name}: ${type};`;
    }

    private buildInterface = (arg: { name: string, isExported: boolean, implements: string, extends: string, properties: any }) => {
        let declaration = [];

        if (arg.isExported) {
            declaration.push('export');
        }

        declaration.push('interface');
        declaration.push(arg.name);

        if (arg.implements) {
            declaration.push('implements');
            declaration.push(arg.implements);
        }

        if (arg.extends) {
            declaration.push('extends');
            declaration.push(arg.extends);
        }
        declaration.push('{');
        
        const start = declaration.join(' ');

        const props = [];
        arg.properties.forEach((value, key) => {
            props.push(this.buildProperty({name: key, type: value }))
        });
        
        const end = '}';
        
        return `${start}\n${props.join('\n')}\n${end}`;
    }

    public load = () => {
        let builtEntity = [];
        this._entity.forEach((value, key) => {
            builtEntity.push(this.buildInterface({ name: key, ...value }));
        })

        return builtEntity.join('\n\n');
    }
}