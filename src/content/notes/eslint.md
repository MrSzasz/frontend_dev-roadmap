---
title: "EsLint"
tags: ["front", "back", "linter", "code", "node"]
date: 1701969117000
description: "ESLint es una herramienta que nos ayudan a mantener el orden y la consistencia en un código, ya sea con reglas creadas por el usuario como con reglas creadas por la comunidad. Es normal que ESLint se use junto a Prettier, una herramienta que nos ayuda a formatear en base a estas reglas."
icon: "/icons/eslint.svg"
color: "#8080e9"
---

## Instalación NextJS + Typescript

Para comenzar será necesario instalar ambos paquetes, empezando por ESLint y Prettier con sus respectivos comandos.

```bash
npm install -D eslint prettier eslint-config-prettier
```

**_PNPM_**

```bash
pnpm add -D eslint prettier eslint-config-prettier
```

**_YARN_**

```bash
yarn add -D eslint prettier eslint-config-prettier
```

Esto nos instalará Prettier y ESLint, pero debemos crear el archivo de configuración del mismo, el cual será `.prettierrc`, el cual quedará de la siguiente manera.

```json
{
  "arrowParens": "avoid",
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all"
}
```

Además debemos crear el archivo `.prettierignore` para ignorar ciertos archivos.

```text
build
coverage
dist
package-lock.json
dist
node_modules
node_modules/
```

Y lo mismo con `.eslintignore`.

```text
dist
node_modules
node_modules/
```

Por ultimo debemos agregar los scripts a nuestro `package.json`.

```json
  "scripts": {
    // [...]
    "format": "prettier --write .",
    "lint": "eslint --fix . --ext .js,.jsx,.ts,.tsx"
  },
```

## Configuración

Con esto hecho podemos empezar a configurar nuestro linter, empezando por configurar nuestras reglas con el siguiente comando.

```bash
npm init @eslint/config
```

```bash
pnpm create @eslint/config
```

```bash
yarn create @eslint/config
```

Nos dará a elegir todas las configuraciones, y al momento de elegir que reglas seguir las mas comunes son `Standard` y `AirBnb`.
Hecho esto debemos agregar Prettier a nuestro `.eslintrc.json` de la siguiente manera.

```json
"extends": [
 "standard-with-typescript",
 "plugin:react/recommended",
 "plugin:react/jsx-runtime",
 "prettier"
],
```

Además, al trabajar con TypeScript, ESLint nos recomendará que creemos Interfaces en vez de tipos, para ello debemos cambiarlo en nuestras reglas.

```json
"rules": {
 "typescript-eslint/consistent-type-definitions": "off"
}
```

## Fuentes

- [Configurar ESLint y Prettier en React by Desarrollo Útil 🔗](https://youtu.be/3BHXuZvI4FI?si=LPd3Izmzf0AfMCF6)
- [Prettier Docs 🔗](https://prettier.io/docs/en/)
