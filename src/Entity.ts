export interface InterfaceEntity {
    readonly isExported: boolean;
    readonly properties: Map<string, any>;
    addProperty({ name, type }): InterfaceEntity;
}

const DEFAULT_INDENTATION_STEP = 1;
const DEFAULT_INDENTATION = '\t';

export default class Entity {
    private _entity = new Map();
    private _indentationStep = DEFAULT_INDENTATION_STEP;
    private _indentation = '';

    constructor({ indentationStep }: { indentationStep?: number }) {
        if (indentationStep) {
            this._indentationStep = indentationStep;
        }

        for (let i = 0; i < this._indentationStep; i++) {
            this._indentation += DEFAULT_INDENTATION;
        }
    }
    
    public addInterface = ({ name, isExported = false }: { name: string, isExported?: boolean }): InterfaceEntity => {
        if (this._entity.get(name)) {
            throw new Error(`An interface with the name "${name}" is already declared`);
        }

        let newInterface: InterfaceEntity = {
            isExported: isExported,
            properties: new Map(),
            addProperty: ({ name: propertyName, type: propertyType }: { name: string; type: string }) => {
                newInterface.properties.set(propertyName, propertyType);

                this._entity.set(name, newInterface);

                return this._entity.get(name);
            }
        };
        this._entity.set(name, newInterface);

        return this._entity.get(name);
    }

    private buildProperty = ({name, type }: { name: string, type: string }) => {
        return `${this._indentation}${name}: ${type};`;
    }

    private buildInterface = ({ name, isExported, properties }: { name: string, isExported: boolean, properties: any }) => {
        let _declaration = [];
        if (isExported) {
            _declaration.push('export');
        }
        _declaration.push('interface');
        _declaration.push(name);
        _declaration.push('{');
        
        const _start = _declaration.join(' ');

        const _properties = [];
        properties.forEach((value, key) => {
            _properties.push(this.buildProperty({name: key, type: value }))
        });
        
        const _end = '}';
        
        return `${_start}\n${_properties.join('\n')}\n${_end}`;
    }

    public load = () => {
        let builtEntity = [];
        this._entity.forEach((value, key) => {
            builtEntity.push(this.buildInterface({ name: key, ...value }));
        })

        return builtEntity.join('\n\n');
    }
}
