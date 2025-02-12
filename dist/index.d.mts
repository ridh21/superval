type SchemaDefinition = Record<string, string>;
declare function defineSchema(definition: SchemaDefinition): SchemaDefinition;
declare function validate(schema: SchemaDefinition, data: Record<string, any>): {
    errors: string[];
    isValid: boolean;
};

export { defineSchema, validate };
