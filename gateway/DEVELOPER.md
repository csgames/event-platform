# Developer guide

- [Requirements](#requirements)
- [Install dependencies](#install-dependencies)
- [Development server](#development-server)
- [Coding style](#development-server)
    - [Quotes](#quotes)
    - [Semicolon](#semicolon)
    - [Tabs or spaces?](#tabs-or-spaces)
    - [Max line](#max-line)

## Requirements
- NodeJs: 8+

## Install dependencies
Run `npm i` to install project dependencies

## Development server

Run `npm run dev` for a dev server.

## Coding style

### Quotes
Good
```typescript
const hello = "world";
```

Bad
```typescript
const hello = 'world';
```

### Semicolon
Good
```typescript
console.log("world");
```

Bad
```typescript
console.log("world")
```

### Tabs or spaces?
We use spaces. 4 spaces to be more specific.

### Max line
Max line length is 140 caracters.

Good
```typescript
export class HelloWorld {
    constructor(private serviceA: ServiceA,
                private serviceB: ServiceB,
                private serviceC: ServiceC,
                private serviceD: ServiceD) {}
}
```

Bad
```typescript
export class HelloWorld {
     constructor(private serviceA: ServiceA, private serviceB: ServiceB, private serviceC: ServiceC, private serviceD: ServiceD) {}
}
```
