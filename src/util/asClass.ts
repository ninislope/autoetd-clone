export function asClass<Interface, Class>(object: Interface, Type: { new (object: Interface): Class }): Class;
export function asClass<Interface, Class, ElementClass>(
    object: Interface[],
    Type: { new (...objects: ElementClass[]): Class; readonly elementType: { new (object: Interface): ElementClass } },
): Class;
export function asClass<Interface, Class, ElementClass>(
    object: Interface | Interface[],
    Type:
        | { new (object: Interface): Class }
        | { new (...objects: ElementClass[]): Class; readonly elementType: { new (object: Interface): ElementClass } },
) {
    if (object instanceof Type) {
        return object;
    }
    if ("elementType" in Type) {
        const ElementType = Type.elementType;
        const ret = new Type(
            ...(object as Interface[]).map(item => (item instanceof ElementType ? item : new ElementType(item))),
        );
        return ret;
    }
    return new (Type as { new (object: Interface): Class })(object as Interface);
}
