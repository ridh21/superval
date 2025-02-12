export type SchemaDefinition = Record<string, string>;

export function defineSchema(definition: SchemaDefinition) {
  return definition;
}

export function validate(schema: SchemaDefinition, data: Record<string, any>) {
  const errors: string[] = [];

  for (const key in schema) {
    const type = schema[key];
    const value = data[key];

    if (type.startsWith("string") && typeof value !== "string") {
      errors.push(`${key} must be a string`);
    }
    if (type.startsWith("number") && typeof value !== "number") {
      errors.push(`${key} must be a number`);
    }
    if (type.includes("min:")) {
      const min = parseInt(type.split("min:")[1]);
      if (value < min) errors.push(`${key} must be at least ${min}`);
    }
  }

  return { errors, isValid: errors.length === 0 };
}
