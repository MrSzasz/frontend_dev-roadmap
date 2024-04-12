---
title: Astro
tags: ["front", "back", "code", "typescript"]
description: Astro es un framework que ayuda a la creación de proyectos estáticos, ya sea un blog, portal de noticias o un portfolio personal, páginas que no tengan que depender de un back. Estos mismos están basados en componentes.
date: 1700082500000
icon: /icons/astro.svg
color: "#F5F5F5"
---

## Instalación

Para empezar debemos crear el proyecto con el comando que nos indica su página oficial de la siguiente manera.

```bash
npm create astro@latest
```

**_PNPM_**

```bash
pnpm create astro@latest
```

Esto nos guiará para poder elegir las opciones de nuestro proyecto. Hecho esto podemos instalar diferentes plugins a medida que lo necesitemos, por ejemplo, podemos instalar el plugin de Tailwind de la siguiente manera.

```bash
npx astro add tailwind
```

**_PNPM_**

```bash
pnpm astro add tailwind
```

Con esto configurado podemos empezar a crear nuestro proyecto.

## Pages

Astro tiene la división de páginas en la carpeta `/pages`, es decir que todos los archivos que creemos en el mismo se tomarán como una página individual, por ejemplo, creamos el archivo `/pages/about-us.astro`.

```astro
<h1>About us</h1>
```

Con esto podemos ir a la ruta `localhost:puerto/about-us` y veremos nuestra página.

## Variables de desarrollo

Gracias a Astro podemos tener variables de desarrollo que luego se convertirán en código estático, esto se hace gracias a agregar `---` al inicio de la página de la siguiente manera.

```astro
---
const title = "About us"; // Creamos la variable

const users = [
  {
    name: "John",
    age: 30,
  },
  {
    name: "Jane",
    age: 25,
  },
  {
    name: "Bob",
    age: 40,
  },
];
---

<h1>{title}</h1>
<!-- Y la pasamos como prop -->

<ul class="flex gap-4">
  <!-- Es posible agregar clases de tailwind -->
    {     users.map((user) => (
  <!-- Creamos un map con jsx -->
       
  <li>
           
    <div class="card">
               
      <div class="card-title">{user.name}</div>
                <small class="card-age">Age: {user.age} years</small>        
    </div>
         
  </li>
      ))   }
</ul>

<style>
    .card {
      width: fit-content;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 16px;
      text-align: center;
    }

    .card-title {
      font-size: 1.2em;
      margin-bottom: 8px;
    }

    .card-age {
      font-size: 0.8em;
      color: #666;
    }
</style>
```

> Si queremos agregar scripts de JS que vayan al front debemos usar la etiqueta `<script>`, es posible utilizar `<styles>` como en el ejemplo o importar un `styles.css` en el `---` de la página

De la misma forma que creamos los usuarios manualmente, podemos pedir datos a una API de la siguiente manera.

```astro
---
const title = "About us";

type User = {
  name: string;
  username: string;
  email: string;
};

const res = await fetch("https://jsonplaceholder.typicode.com/users"); // Hacemos el fetch

const users = await res.json();
---

<h1>{title}</h1>

<ul class="flex flex-wrap gap-4">
    {     users.map((user: User) => (      
  <li>
           
    <div class="card">
               
      <div class="card-name">{user.name}</div>
                <small class="card-email">Username: {user.username} </small>    
         
    </div>
         
  </li>
      ))   }
</ul>

<style>
    .card {
      width: fit-content;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 16px;
      text-align: center;
    }

    .card-name {
      font-size: 1.2em;
      margin-bottom: 8px;
    }

    .card-email {
      font-size: 0.8em;
      color: #666;
    }
</style>
```

## Componentes

Astro trabaja con componentes (como React), por lo que es posible separar nuestra card en otro componente para llamarlo luego, para ello creamos el archivo en el directorio `src/Card/Card.astro`, quedando el mismo de la siguiente manera.

```astro
---
interface Props { // Creamos la interfaz de las props
  name: string;
  username: string;
}

const { name, username } = Astro.props; // E indicamos las props que recibiremos
---

<li>
   
  <div class="card">
       
    <div class="card-name">{name}</div>
    <!-- Pasamos las props -->
        <small class="card-email">Username: {username}</small>  
  </div>
</li>

<style>
    .card {
      width: fit-content;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 16px;
      text-align: center;
    }

    .card-name {
      font-size: 1.2em;
      margin-bottom: 8px;
    }

    .card-email {
      font-size: 0.8em;
      color: #666;
    }
</style>
```

Con esto hecho podemos importar el componente en nuestro `about-us` de la siguiente manera.

```astro
---
import Card from "../components/Card/Card.astro"; // Importamos el componente

const title = "About us";

const res = await fetch("https://jsonplaceholder.typicode.com/users");

const users = await res.json();

type User = {
  name: string;
  username: string;
  email: string;
};
---

<h1>{title}</h1>

<ul class="flex flex-wrap gap-4">
    {     users.map((user: User) => (      
  <Card name="{user.name}" username="{user.username}" />
  <!-- Usamos el componente como lo hicimos anteriormente -->
      ))   }
</ul>
```

## Layout

Podemos envolver todo el contenido de nuestra página en un layout que tenga todos los datos HTML importantes, como por ejemplo los metadatos o los estilos, para ello debemos crear nuestro archivo en la dirección `src/layouts/Layout.astro` y agregando la etiqueta `<slot />` de la siguiente manera.

```astro
---
interface Props { // Agregamos la interfaz de los props
    title: string;
}

const { title } = Astro.props; // Y los props que vamos a recibir
---

<!doctype html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>{title}</title>
    <!-- Agregamos el title de la página -->
  </head>
  <body>
        <slot />
    <!-- Y el slot para los children -->
  </body>
</html>
```

> Se puede tener varias etiquetas `<slot />` en un mismo componente, y se diferencian con la propiedad `name="before"` (y `slot="before"` en el children), y con un default dentro de las etiquetas.

Y luego lo importamos donde lo necesitemos de la siguiente manera.

```astro
---
import Card from "../components/Card/Card.astro";
import Layout from "../layouts/Layout.astro"; // Importamos el layout

const title = "About us";

const res = await fetch("https://jsonplaceholder.typicode.com/users");

const users = await res.json();

type User = {
  name: string;
  username: string;
  email: string;
};
---

<Layout title="{title}">
  <!-- Y lo usamos para envolver el contenido -->
   
  <h1>{title}</h1>

   
  <ul class="flex flex-wrap gap-4">
        {       users.map((user: User) => (        
    <Card name="{user.name}" username="{user.username}" />
          ))     }  
  </ul>
</Layout>
```

## Markdown

Astro nos facilita una forma de transformar los archivos de Markdown en páginas de nuestro proyecto, por ejemplo, si tenemos un blog podemos crear cada uno de los posts en markdown y luego utilizarlo para que se generen las páginas automáticamente. La estructura de carpetas quedaría de la siguiente manera.

```text
pages
 |-> blog
  |-> posts
   |-> post1.md
   |-> post2.md
   |-> post3.md
  index.astro
```

Dentro de los posts debemos agregar el contenido y los datos principales que podremos tomar luego desde la página del blog de la siguiente manera.

```md
---
layout: ../../../layouts/Layout.astro # Indicamos donde está el layout

title: Title Post 1 # Y el titulo que utilizaremos luego
---

# Title Post 1 <!-- Creamos el post -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.

Praesent mauris. Fusce nec tellus ed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.

## Subheading

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.

- Sed dignissim lacinia nunc
- Curabitur tortor
- Pellentesque nibh
- Aenean quam
- In scelerisque sem at dolor

### Another Subheading

Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
```

> Los 3 posts son de ejemplo, solamente cambia el número de cada uno

Luego podemos ir a nuestro `blog/index.astro` e indicar de donde tomaremos los posts de la siguiente manera.

```astro
---
import Layout from "../../layouts/Layout.astro"; # Importamos el layout

const posts = await Astro.glob("../blog/posts/*.md"); # Y tomamos todos los archivos que sean '.md' de la carpeta posts
---

<Layout title="Blog">
   
  <h1>Blog</h1>
      {posts.map((post) => <a href="{post.url}">{post.frontmatter.title}</a>)}
  <!-- Tomamos la url de cada post y el titulo de cada post -->
</Layout>
```

> La propiedad `frontmatter` nos entrega los datos que se encuentran entre los `---`

## React

Así como añadimos el plugin de Tailwind podemos agregar el plugin de React para usar sus componentes, esto lo haremos gracias a la integración oficial que nos ofrece Astro, con el siguiente comando.

```bash
npx astro add react
```

Para probar esto podemos instalar un paquete de notificaciones de React llamado [react-hot-toast](https://react-hot-toast.com/) con el siguiente comando.

```bash
npm i react-hot-toast
```

Ahora podemos crear un nuevo componente llamado `Button` en el directorio `components/Button/Button.tsx`, quedando el mismo de la siguiente manera.

```tsx
import toast, { Toaster } from "react-hot-toast"; // Importamos los componentes

const Button = () => {
  const notify = () => toast("Here is your toast."); // Creamos la función

  return (
    <div className="w-fit bg-red-300 text-black">
            <button onClick={notify}>Make me a toast</button>{" "}
      {/* Y llamamos al toast */}
            <Toaster />   {" "}
    </div>
  );
};

export default Button;
```

Ahora podemos importarlo en nuestro `blog/index.astro` de la siguiente manera.

```astro
---
import Layout from "../../layouts/Layout.astro";
import Button from "../../components/Button/Button"; # Lo importamos como un componente

const posts = await Astro.glob("../blog/posts/*.md");
---

<Layout title="Blog">
   
  <h1>Blog</h1>

    {posts.map((post) => <a href="{post.url}">{post.frontmatter.title}</a>)}  
  <button client:load />
  <!-- E indicamos que se va a cargar cuando cargue la página -->
</Layout>
```

El `client:load` indica que el componente se carga cuando la página se carga por primera vez, pero hay diferentes tipos de carga.

| Type    | Def                                                                                     |
| ------- | --------------------------------------------------------------------------------------- |
| load    | Apenas carga la página                                                                  |
| visible | Cuando el elemento es visible en pantalla                                               |
| idle    | Luego de cargar la página con el callback `requestIdleCallback`                         |
| media   | Funciona como una media query                                                           |
| only    | Renderiza solo en el cliente **_NECESITA INDICAR EL TIPO DE FRAMEWORK QUE SE UTILIZA_** |

## Estilos condicionales

Es posible crear estilos en base a una condición que le pasemos a un elemento gracias a la propiedad `class:list={ [] }`, la cual acepta una condición como valor, de la siguiente manera.

```astro
---
import Layout from "../../layouts/Layout.astro";
import Button from "../../components/Button/Button";

const posts = await Astro.glob("../blog/posts/*.md");
---

<Layout title="Blog">
  <h1>Blog</h1>

  {
    posts.map((post) => (
      <a
        class:list={[ // Creamos la clase base
          "bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:bg-gray-100",
          {
            "bg-red-500 text-white hover:bg-red-600 border-red-600":
              post.frontmatter.important, // E indicamos que se agrega cuando la condición sea verdadera
          },
        ]}
        href={post.url}
      >
        {post.frontmatter.title}
      </a>
    ))
  }

  <Button client:load />
</Layout>
```

## Páginas dinámicas

Si necesitamos generar páginas en base a datos dinámicos podemos hacer uso de los `[ ]` al igual que en NextJs, y generar las páginas gracias a `getStaticPaths()` de la siguiente manera.

```astro
---
import type { GetStaticPaths } from "astro"; # Importamos la función
import Layout from "../../layouts/Layout.astro";

const { id } = Astro.params; # Tomamos el id del params de Astro

const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`); # Hacemos el fetch al usuario
const user = await res.json();

export const getStaticPaths = (async () => { # Creamos las páginas estáticas
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await res.json();

  return users.map((user: any) => ({
    params: { id: user.id.toString() }, # Y devolvemos los parámetros con el id
  }));
}) satisfies GetStaticPaths;
---

<Layout title="{user.username}">
   
  <div class="grid text-center">
       
    <div class="mb-4">
           
      <h1 class="text-xl font-bold">{user.name}</h1>
            <small class="text-base text-gray-700">{user.email}</small>    
    </div>
       
    <div class="mb-6">
           
      <h2 class="text-lg font-bold">Username: {user.username}</h2>
         
    </div>
     
  </div>
</Layout>
```

Esto solamente funciona cuando hay un numero fijo de páginas para crear, cuando no se sabe la cantidad de páginas o son muchas, se recomienda pasar a SSR directamente. Para esto será necesario cambiar ciertas configuraciones en el archivo `astro.config.mjs` y agregar lo siguiente.

```json
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid', // Agrega SSR solo en las páginas que indiquemos
  integrations: [tailwind(), react()]
});
```

Y en la página hay que hacer ciertos cambios.

```astro
---
import Layout from "../../layouts/Layout.astro";

export const prerender = false; # Quitamos el prerender para que sea SSR

const { id } = Astro.params;

const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
const user = await res.json();
---

<Layout title="{user.username}">
   
  <div class="grid text-center">
       
    <div class="mb-4">
           
      <h1 class="text-xl font-bold">{user.name}</h1>
            <small class="text-base text-gray-700">{user.email}</small>    
    </div>
       
    <div class="mb-6">
           
      <h2 class="text-lg font-bold">Username: {user.username}</h2>
         
    </div>
     
  </div>
</Layout>
```

## Transiciones

Astro agrega transiciones automáticas a las páginas que tienen cambios en la UI, para esto usaremos el label `<ViewTransitions />` de la siguiente manera.

```astro
---
import { ViewTransitions } from "astro:transitions"; # Importamos el componente
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
   
  <head>
       
    <meta charset="UTF-8" />
       
    <meta name="description" content="Astro description" />
       
    <meta name="viewport" content="width=device-width" />
       
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
       
    <meta name="generator" content="{Astro.generator}" />
       
    <title>{title}</title>
       
    <ViewTransitions />
    <!-- Y lo utilizamos en el head -->
     
  </head>
     
  <body>
        <slot />  
  </body>
     
  <style is:global>
        :root {
          --accent: 136, 58, 234;
          --accent-light: 224, 204, 250;
          --accent-dark: 49, 10, 101;
          --accent-gradient: linear-gradient(
            45deg,
            rgb(var(--accent)),
            rgb(var(--accent-light)) 30%,
            white 60%
          );
        }
        html {
          font-family: system-ui, sans-serif;
          background: #13151a;
          background-size: 224px;
          color: wheat;
        }
        code {
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
        h1 {
          font-size: 2em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }

        h2 {
          font-size: 1.5em;
          font-weight: semi-bold;
          margin-bottom: 0.4em;
        }

        h3 {
          font-size: 1.17em;
          font-weight: normal;
          margin-bottom: 0.3em;
        }
     
  </style>
</html>
```

> Si queremos que un elemento se mantenga entre páginas debemos agregar `transition:persist` como propiedad del mismo

## Integrations

Astro tiene una forma particular de agregar paquetes, las integraciones.
Desde su [página](https://astro.build/integrations/) se pueden ver las integraciones oficiales, las cuales se integran al proyecto con `npx astro add`. Algunas de las integraciones oficiales y/o recomendadas son las siguientes

| Integration        | Desc                                           | Link                                                                                                |
| ------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Astro Icon         | Agrega iconos a Astro como componentes         | [astro-icon](https://github.com/natemoo-re/astro-icon#readme)                                       |
| Astro Sitemap      | Genera un sitemap automáticamente del build    | [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)                  |
| Astro Robots.txt   | Genera automáticamente un robots.txt del build | [astro-robots-txt](https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme) |
| Astro SEO          | Agrega una tag para el SEO                     | [astro-seo](https://github.com/jonasmerlin/astro-seo#readme)                                        |
| Astro SPA          | Agrega funcionalidades directas de una SPA     | [astro-spa](https://github.com/RafidMuhymin/astro-spa#readme)                                       |
| Astro I18next      | Agrega localizaciones a las páginas            | [astro-18next](https://github.com/yassinedoghri/astro-i18next#readme)                               |
| Astro JSON Element | Permite crear elementos desde un archivo JSON  | [astro-json-element](https://github.com/BryceRussell/astro-json-element#readme)                     |
| Astro Starlight    | Crea un template para generar documentación    | [starlight](https://starlight.astro.build/getting-started/)                                         |

## Build

Por ultimo para subir el proyecto a un host debemos hacer un build del mismo, para ello usaremos el comando `build` de la siguiente manera.

```bash
npm run build
```

Esto nos genera la carpeta `dist`, la cual es la que se tiene que subir al hosting que estemos utilizando.

> Para tener una vista previa del proyecto después del build se puede utilizar `npm run preview`

## Fuentes

- [Curso de Astro by Fazt 🔗](https://youtu.be/sOXW0ZnJxbQ?si=8QWUSTHT8zAg82k9)
- [Astro 3 desde cero by MiduDev 🔗](https://youtu.be/RB5tR_nqUEw?si=ry6FkzewEF1JncLO)
