import { defineSchema, validate } from "../src/schema";
import { describe, it, expect } from "vitest";

describe("Validation Tests", () => {
  it("should validate correct data", () => {
    const schema = defineSchema({ age: "number|min:18" });
    const result = validate(schema, { age: 20 });
    expect(result.isValid).toBe(true);
  });

  it("should return errors for invalid data", () => {
    const schema = defineSchema({ age: "number|min:18" });
    const result = validate(schema, { age: 16 });
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
