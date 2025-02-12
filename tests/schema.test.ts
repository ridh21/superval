import { defineSchema, validate } from "../src/schema";
import { describe, it, expect } from "vitest";


describe("SuperVal Validation Tests", () => {
  it("Validates basic types correctly", () => {
    const schema = defineSchema({
      name: "string",
      age: "number",
    });

    const validData = { name: "Alice", age: 30 };
    const invalidData = { name: 123, age: "thirty" };

    expect(validate(schema, validData).isValid).toBe(true);
    expect(validate(schema, invalidData).isValid).toBe(false);
  });

  it("Validates built-in types (email, url, uuid)", () => {
    const schema = defineSchema({
      email: "email",
      website: "url",
      userId: "uuid",
    });

    const validData = {
      email: "test@example.com",
      website: "https://example.com",
      userId: "550e8400-e29b-41d4-a716-446655440000",
    };

    const invalidData = {
      email: "invalid-email",
      website: "not-a-url",
      userId: "1234",
    };

    expect(validate(schema, validData).isValid).toBe(true);
    expect(validate(schema, invalidData).isValid).toBe(false);
  });

  it("Validates number constraints (min, max)", () => {
    const schema = defineSchema({
      age: "number|min:18|max:60",
    });

    const validData = { age: 30 };
    const tooYoung = { age: 16 };
    const tooOld = { age: 65 };

    expect(validate(schema, validData).isValid).toBe(true);
    expect(validate(schema, tooYoung).isValid).toBe(false);
    expect(validate(schema, tooOld).isValid).toBe(false);
  });

  it("Handles multiple errors", () => {
    const schema = defineSchema({
      name: "string",
      age: "number|min:18|max:60",
      email: "email",
    });

    const invalidData = {
      name: 123, // Should be a string
      age: 17, // Below min limit
      email: "invalid-email", // Invalid format
    };

    const result = validate(schema, invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBe(3);
  });

  it("Handles empty input", () => {
    const schema = defineSchema({
      name: "string",
      age: "number|min:18",
      email: "email",
    });

    const result = validate(schema, {}); // Empty object
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBe(3);
  });

  it("Allows optional fields", () => {
    const schema = defineSchema({
      name: "string",
      age: "number|min:18",
      email: "email",
    });

    const validData = { name: "John", age: 25 }; // Missing email, should still be valid

    expect(validate(schema, validData).isValid).toBe(true);
  });
});
