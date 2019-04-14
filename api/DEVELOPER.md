# Developer guide

- [Requirements](#requirements)
- [Install dependencies](#install-dependencies)
- [Development server](#development-server)
- [Coding style](#development-server)
    - [Quotes](#quotes)
    - [Semicolon](#semicolon)
    - [Tabs or spaces?](#tabs-or-spaces)
    - [Decorators](#decorators)
    - [Max line](#max-line)
- [Project structure](#project-structure)
    - [Guards](#guards)
    - [Modules](#modules)
    - [Interceptors](#interceptors)
    - [Pipes](pipe)
    - [Utils](#utils)

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

### Decorators
Good
```typescript
export class HelloWorld {
    @Input()
    public value: string;
}
```

Bad
```typescript
export class HelloWorld {
    @Input() public value: string;
}
```

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

## Project structure
```
src
   guards
   interceptors
   modules
   pipes
   utils
```

### Guards
This section contains all the global guards of the NestJs server.

### Interceptors
This section contains all the global interceptors of the NestJs server.

### Modules
This section contains all the modules of the NestJs server.

Each module can have a controller, a service and a model. All modules must define a NestJs module.

### Pipes
This section contains all the global pipes of the NestJs server.

### Utils
This section contains all the utils of the NestJs server.
