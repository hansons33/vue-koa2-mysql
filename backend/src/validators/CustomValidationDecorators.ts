import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";



export function IsSameValue(property:string, validationOptions?:ValidationOptions){
    return function(
        target: Object,
        propertyName: string
    ) {
        registerDecorator({
            name: 'isSameValue',
            target: target.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, validationArguments?:ValidationArguments){
                    const relateValue = validationArguments && (validationArguments.object as any)[property]

                    if (!value){
                        return true
                    }
                    return relateValue === value;
                }
            }
        })
    }
}