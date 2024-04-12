---
title: "Cypress"
tags: ["front", "back", "code", "node", "testing"]
description: "Cypress es una herramienta para testing de la web, particularmente en el front, la cual se utiliza para crear un entorno en el que se prueban las apps simulando el comportamiento de un usuario final."
date: 1704938241000
icon: "/icons/cypress.svg"
color: "#61D1A4"
---

## Instalación

Para instalarlo será necesario usar el comando que nos indica la [documentación oficial](https://docs.cypress.io/guides/getting-started/installing-cypress) de la siguiente manera.

```bash
npm i cypress -D
```

**_PNPM_**

```bash
pnpm add cypress -D
```

**_YARN_**

```bash
yarn add cypress -D
```

Esto descargará e instalará todo lo necesario para que Cypress funcione, por lo que tardará un poco.

## Configuración

Al terminar de descargar se deberá crear el script para empezar a ejecutar Cypress en nuestro `package.json`.

```json
  "scripts": {
    "cypress:open": "cypress open"
  },
```

> Se deberá evitar el uso de `cypress`, ya que la misma es una palabra reservada

Esto nos creará un archivo `cypress.config.ts` en el cual deberemos agregar nuestra URL base de la siguiente manera.

```ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Agregamos la url base

    setupNodeEvents(on, config) {},
  },
});
```

Luego de ejecutar el script se abrirá Cypress, el cual nos guiará para crear la configuración inicial de nuestro test, dejándonos elegir que tipo de test haremos.
Nos dará la opción de crear nuestro primer spec, el cual podremos desarrollar en el IDE que usemos normalmente.

## Coding

Como vemos se creó el archivo `spect.cy.ts`, dentro de la carpeta de Cypress, en este podemos ver el primer test creado automáticamente.

```ts
describe("spec.cy.js", () => {
  it("should visit", () => {
    cy.visit("/"); // Indica que tiene que renderizar la página
  });
});
```

A este podemos hacerle unos cambios, por ejemplo, si queremos buscar un componente debemos utilizar `.get()` de la siguiente manera.

```ts
it("should change theme from dark to light and back", () => {
  cy.visit("/");
  const switchButton = cy.get(".peer"); // Buscamos el botón
  switchButton.should("have.attr", "aria-checked", "false"); // Indicamos que tiene que contener ciertos atributos
  switchButton.click(); // Y hacemos click
});
```

Este funcionamiento simple nos creará una "guía" para que Cypress actúe como el usuario.
También es posible interactuar escribiendo de la siguiente manera.

```ts
it("should render a input and type", () => {
  cy.visit("/");

  cy.get('input[placeholder="Title"]').type("testing title note with cypress"); // Buscamos por el placeholder y pasamos el texto a escribir

  cy.get('input[placeholder="Title"]').contains(/testing title note/i); // Buscamos si existe
});
```

> Podemos pasarle diferentes [teclas especiales](https://docs.cypress.io/api/commands/type#Arguments) indicandolo entre {{}}

Por ultimo podemos ver si un elemento no existe utilizando `.should("not.exist")` de la siguiente manera

```ts
it("should delete the div", () => {
  cy.visit("/");

  cy.get("button")
    .contains(/delete div/i) // Buscamos el botón
    .click(); // Hacemos click

  cy.get("div")
    .contains(/div to delete/i) // Buscamos el div
    .should("not.exist"); // Y comprobamos que no existe
});
```

## Errores

**_missing baseurl in compileroptions cypress_**

Este error se solucionará cambiando el tipo de modulo en el archivo `tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "Node"
  }
}
```

## Fuentes

- [Cypress docs 🔗](https://docs.cypress.io/guides/overview/why-cypress)
- [React Testing Crash Course by Traversy Media 🔗](https://youtu.be/OVNjsIto9xM?si=CbAcga2MJRzHqwai)
