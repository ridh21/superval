# SuperVal - A Super Fast TypeScript Validation Library ⚡

[![NPM Version](https://img.shields.io/npm/v/superval)](https://www.npmjs.com/package/superval)


## 🚀 About
**SuperVal** is a blazing-fast, lightweight, and TypeScript-first validation library designed to be an alternative to Zod, providing better performance and developer experience. It ensures type safety while keeping your schemas concise and efficient.

## ✨ Features
- ⚡ **Super Fast** – Optimized for speed, faster than Zod.
- ✅ **TypeScript-First** – Ensures full type safety with zero compromises.
- 🪶 **Lightweight** – Minimal bundle size, perfect for both frontend and backend.
- 🔄 **Runtime Validation** – Checks data at runtime while maintaining TypeScript inference.
- 🏗 **Schema-Based** – Create, validate, and infer types effortlessly.

## 📦 Installation

```sh
npm install superval
```

or using yarn:

```sh
yarn add superval
```

## 🔥 Quick Start

```ts
import { defineSchema, validate } from "superval";

const userSchema = defineSchema({
  name: "string",
  age: "number",
  email: "email", // Built-in validation
});

const userData = { name: "John Doe", age: 25, email: "john@example.com" };

const result = validate(userSchema, userData);

if (result.success) {
  console.log("Valid data:", result.data);
} else {
  console.error("Validation errors:", result.errors);
}
```

## 🏆 Why Choose SuperVal?
| Feature       | SuperVal | Zod  |
|--------------|---------|------|
| Speed        | ⚡ Faster | 🐢 Slower |
| Type Safety  | ✅ Yes | ✅ Yes |
| Bundle Size  | 🪶 Smaller | 📦 Larger |
| Ease of Use  | 🎯 Simple API | 🏗 Complex |

## 📖 Documentation
Coming Soon..

## 🤝 Contributing
We welcome contributions! Feel free to open issues and pull requests.

## 📜 License
Licensed under the **MIT License**.

## ⭐ Support
If you like SuperVal, consider giving it a ⭐ on GitHub!

