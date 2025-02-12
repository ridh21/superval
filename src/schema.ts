export type SchemaDefinition = Record<string, string>;

const builtInTypes: Record<string, RegExp> = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Standard email regex
  url: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, // Basic URL validation
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, // UUID v4 regex
};

export function defineSchema(definition: SchemaDefinition) {
  return definition;
}

export function validate(schema: SchemaDefinition, data: Record<string, any>) {
  const errors: string[] = [];

  for (const key in schema) {
    const type = schema[key];
    const value = data[key];

    // Check for primitive types
    if (type.startsWith("string") && typeof value !== "string") {
      errors.push(`${key} must be a string`);
    } else if (type.startsWith("number") && typeof value !== "number") {
      errors.push(`${key} must be a number`);
    }

    // Built-in type validation
    if (builtInTypes[type] && !builtInTypes[type].test(value)) {
      errors.push(`${key} must be a valid ${type}`);
    }

    // Handle additional constraints (min:, max:)
    const constraints = type.split("|").slice(1);
    for (const constraint of constraints) {
      if (constraint.startsWith("min:")) {
        const min = parseInt(constraint.split(":")[1]);
        if (typeof value === "number" && value < min) {
          errors.push(`${key} must be at least ${min}`);
        }
      }

      if (constraint.startsWith("max:")) {
        const max = parseInt(constraint.split(":")[1]);
        if (typeof value === "number" && value > max) {
          errors.push(`${key} must be at most ${max}`);
        }
      }
    }
  }

  return { errors, isValid: errors.length === 0 };
}
