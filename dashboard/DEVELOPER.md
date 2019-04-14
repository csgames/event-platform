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
    - [App](#app)
        - [Api](#api)
        - [Components](#components)
        - [Features](#features)
        - [Directives](#directives)
        - [Guards](#guards)
        - [Modals](#modals)
        - [Pipe](pipe)
        - [Providers](#providers)
        - [Store](#store)
        - [Utils](#utils)
    - [Assets](#assets)
        - [Fonts](#fonts)
        - [i18n](#i18n)
        - [Icons](#icons)
    - [Environments](#environments)

## Requirements
- NodeJs: 8+

## Install dependencies
Run `npm i` to install project dependencies

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
    app
        api
        components
        directives
        features
        guards
        modals
        pipe
        providers
        store
        utils
    assets
        fonts
        i18n
        icons
    environments
```

### App
This folder contains all the code of the angular applications

#### Api
This section contains the logic of the api. In other words, all communication with the different api is handle in this section.
This section also contains all the model of the data from the different services.

#### Components
This section contains all the global components of the Angular application.

#### Features
This section contains all the pages of the Angular application. Each page must have its own store and can have custom components and modal.

A page structure must look like this
```
page
    components
    store
        page.actions.ts
        page.effects.ts
        page.reducer.ts
    page-routing.module.ts
    page.component.ts
    page.module.ts
    page.style.scss
    page.template.html
```

#### Directives
This section contains all the global directives of the Angular application.

#### Guards
This section contains all the global guards of the Angular application.

#### Modals
This section contains all the global modals of the Angular application.

#### Pipe
This section contains all the global pipes of the Angular application.

#### Providers
This section contains all the global providers of the Angular application.

#### Store
This section contains all the global stores of the Angular application.

#### Utils
This section contains all the utils of the Angular application.

### Assets
This folder constains all the assets of the project.

#### Font
All the fonts used in the project must be in this folder.

#### i18n
All translation file are in this folder. Translation file are key -> value file (json format) containing all translation of the application.

#### Icons
All the icons used in the project must be in this folder

### Environments
This section contains the different environment file (dev, staging, production) of the application.
