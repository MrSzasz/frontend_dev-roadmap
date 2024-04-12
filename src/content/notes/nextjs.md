---
title: "NextJs"
tags: ["front", "back", "code", "node"]
description: "NextJS es un framework basado en React, desarrollado en TypeScript que tiene todas las funcionalidades de React, pero que a su vez agrega mas facilidades, como la de conectarnos y desarrollar un Back-end completo basado en NodeJs + Typescript, mayor facilidad para generar rutas, mejora el rendimiento base de React, posee una facilidad para generar alta escalabilidad, entre otras."
date: 1700165063000
icon: "/icons/next.svg"
color: "#000000"
---

**_Last Version Notes: 14_**

## Instalación

> Para iniciar con Next lo primero que debemos tener en cuenta es que necesitaremos tener instalado NodeJs + Typescript

Lo primero que debemos hacer es abrir una terminal en donde queremos iniciar nuestro nuevo proyecto con Next y crear nuestra carpeta con el siguiente comando y seguir las indicaciones que nos aparecen en consola.

```cmd
npx create-next-app@latest
```

Luego de generar la carpeta y entrar podemos utilizar el comando por default que viene en Next para levantar el servidor de la siguiente manera.

```bash
npm run dev
```

## Server Side Rendering vs Client Side Rendering

Hay dos formas de renderizar una página web, desde el lado del cliente (`Client side rendering`), siendo esta la forma de que utilizan los frameworks como React y Vue para mostrar la información en la misma, y desde el lado del servidor (`Server side rendering`), el cual hace que el servidor se encargue del generar los HTML necesarios para generar todo el contenido de la página.  
Hay una gran diferencia entre estos dos, la principal es la forma en la que la página recibe los datos, ya que en el CSR la página renderiza un HTML básico sin información, quedando de la siguiente manera.

```html
<body>
  <main id="app"></main>
</body>
```

Esto mejora en cuanto a la versatilidad de la página en sí, pero en cuanto al SEO es contraproducente, ya que el mismo solo muestra una etiqueta `main` a los crawlers de Google, en cambio cuando se genera una página con SSR se envía todo el contenido de la página en formato HTML de al siguiente manera.

```html
<body>
  <main>
    <h1>Hola mundo</h1>
  </main>
</body>
```

La ventaja de `NextJs` sobre esto es que nos deja elegir que tipo de rendering usaremos, pero sin limitarnos a utilizar solo uno, sino que pudiendo combinar ambos en el caso que sea necesario el uso de uno o el otro.

## Layout

Uno de los archivos que nos generó Next es `layout.tsx`, en este se encuentra el paquete Head, gracias al cual podemos configurar todos los datos dentro del mismo, ya sean metadatos como la descripción de la página, las keywords, o las fuentes que usaremos en el mismo, entre otros.
El layout es el que envuelve a todas las páginas de nuestro proyecto, por lo que los cambios hechos en este se reflejan en todos lados.
Cada página puede tener un layout diferente de ser necesario.

Con esto armado podemos iniciar nuestra página y ver como vamos avanzando, ademas de poder pasar los parámetros al `BaseLayout` y ver como cambian en tiempo real con el siguiente comando.

```cmd
npm run dev
```

## Estilos

Al iniciar la pagina podemos ver que posee algunos estilos base, los cuales podemos cambiar de una forma particular.  
Los estilos en Next no se paran de la misma manera, hay dos formas de estilizar, la primera es usando [CSS Modules](https://keepcoding.io/blog/css-modules-en-react/), los cuales dividen los estilos en diferentes módulos, como su nombre lo indica, haciendo que cada estilo afecte unicamente al componente que estamos generando.  
Para empezar con CSS Modules vamos a crear un componente nuevo llamado `MainButton.jsx`, en el mismo crearemos un archivo CSS llamado `MainButton.module.css`. Con esto hecho podemos empezar a crear nuestro botón de la siguiente manera.

```jsx
import styles from "./MainButton.module.css"; // Importamos los estilos

const MainButton = ({ text = "Click me!" }) => {
  return (
    <button className={styles.mainButton}>
      {" "}
      {/* Llamamos a la clase que vamos a usar */}
      {text}
    </button>
  );
};

export default MainButton;
```

Y en el archivo CSS empezamos a colocar nuestros estilos.

```css
.mainButton {
  width: fit-content;
  height: fit-content;
  padding: 0.7em 1em;
  background-color: #e3e3e3;
  border: 2px solid #2e2e2e;
  color: #2e2e2e;
  font-size: medium;
  font-weight: bold;
  transition: ease all 0.25s;
  border-radius: 10px;
  cursor: pointer;
}

.mainButton:hover {
  background-color: #2e2e2e;
  border: 2px solid #e3e3e3;
  color: #e3e3e3;
}
```

Como podemos ver, las clases se llaman como propiedad `style`, pero en el CSS no hay cambio alguno.  
Como dije anteriormente, no es la única forma de crear estilizar en Next, sino que también podemos hacer uso de [`Styled JSX`](https://nextjs.org/blog/styling-next-with-styled-jsx), los cuales funcionan teniendo una etiqueta `style` en nuestro archivo.  
Tomando el ejemplo anterior, se podría usar Styled JSX y nos quedaría de la siguiente manera.

```jsx
const MainButton = ({ text = "Click me!" }) => {
  return (
    <button className="mainButton">
      {text}
      <style jsx>{`
        .mainButton {
          width: fit-content;
          height: fit-content;
          padding: 0.7em 1em;
          background-color: #e3e3e3;
          border: 2px solid #2e2e2e;
          color: #2e2e2e;
          font-size: medium;
          font-weight: bold;
          transition: ease all 0.25s;
          border-radius: 10px;
          cursor: pointer;
        }

        .mainButton:hover {
          background-color: #2e2e2e;
          border: 2px solid #e3e3e3;
          color: #e3e3e3;
        }
      `}</style>
    </button>
  );
};

export default MainButton;
```

Como podemos ver, esta forma de estilizar no es muy organizada, ademas de ocupar mas espacio en el mismo código, pero sigue siendo funcional.  
Para ver nuestro botón correctamente podemos importarlo en nuestro `index` como importaríamos cualquier otro componente en React.

```jsx
import BaseLayout from "../components/BaseLayout/BaseLayout";
import MainButton from "../components/MainButton/MainButton";

const Home = () => {
  return (
    <>
      <BaseLayout>
        <h1>Welcome!</h1>
        <MainButton />
      </BaseLayout>
    </>
  );
};

export default Home;
```

También es posible asignar más de un estilo en el componente, utilizando los backticks, y pasar estilos como propiedades con el uso de corchetes ([]) de la siguiente manera.

```jsx
import styles from "./MainButton.module.css"; // Importamos los estilos

const MainButton = ({ text = "Click me!", color = "blueish" }) => {
  return (
    <button className={`${styles.mainButton} ${styles[color]}`}>
      {" "}
      {/* Le pasamos las clases que indicamos en el CSS */}
      {text}
    </button>
  );
};

export default MainButton;
```

Y en su respectivo CSS agregamos la clase que le pasaremos como prop.

```css
.blueish {
  background-color: #3438a3;
  border: 2px solid #a12d37;
}

.redish {
  background-color: #a12d37;
  border: 2px solid #3438a3;
}
```

> Desde la misma instalación Next recomienda el uso de Tailwind, por lo que lo muestra como predeterminado

## Fuentes personalizadas

NextJs nos ayuda a configurar y optimizar las fuentes que utilizaremos en nuestra aplicación.
Para esto debemos ir a `app/layout.jsx`, en el mismo debemos indicar que fuente queremos utilizar desde Google Fonts de la siguiente manera.

```jsx
import "./globals.css";
import { Herr_Von_Muellerhoff } from "next/font/google"; // Importamos la fuente desde Google Fonts

const HVMFont = Herr_Von_Muellerhoff({
  // Creamos la variable para la fuente
  subsets: ["latin"], // Y le indicamos sus parámetros
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <body className={HVMFont.className}>{children}</body>{" "}
      {/* le pasamos la fuente al proyecto */}
          
    </html>
  );
}
```

> Si estamos trabajando en versiones anteriores se debe instalar el paquete con el comando `npm i @next/font`

Si utilizamos Tailwind debemos indicar la fuente con su sintaxis de la siguiente manera.

```jsx
import "./globals.css";
import { Herr_Von_Muellerhoff } from "next/font/google";

const HVMFont = Herr_Von_Muellerhoff({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--HVMFont", // Indicamos la variable de la fuente
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            
      <body className={`${HVMFont.variable} font-hvm`}>
        {" "}
        {/* Le pasamos la fuente */}
              {children}
              
      </body>
          
    </html>
  );
}
```

Y por ultimo agregamos la fuente a `tailwind.config.js`.

```js
const config = {
content: [...],
  theme: {
    extend: {
      fontFamily: {
        hvm: ['var(--HVMFont)'], // Indicamos el nombre de la font family y su respectiva variable
      },
    },
  },
  plugins: [],
};

export default config;
```

Por ultimo, si queremos agregar fuentes locales podemos hacer uso de `localFont` de la siguiente manera.

```jsx
import localFont from "next/font/local"; // Importamos el módulo

const myFont = localFont({ src: "./my-font.woff2" }); // Creamos la variable con a fuente

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
```

## Páginas

Next trabaja con rutas y archivos principales llamados `pages`, por lo que para crear una nueva ruta se deberá crear una carpeta, y dentro de esta crear el archivo que contendrá todo el código principal, el cual se deberá llamar `page.tsx`, quedando la ruta `app/users/page.tsx`.

```tsx
const page = () => {
  return (
    <div>
              <h1>users</h1>   {" "}
    </div>
  );
};

export default page;
```

Al acceder a la dirección `http://localhost:3000/users` podremos ver como se generó la misma con el código que indicamos anteriormente.

## Links

Para conectar las diferentes páginas Next usa el componente `Link`, el cual tiene ciertos atributos obligatorios para su funcionamiento.

```tsx
import Link from "next/link"; // Importamos el componente

const page = () => {
  return (
    <div>
            <h1>users</h1>      <Link href="/">↩ Volver</Link>{" "}
      {/* Indicamos la ruta y el contenido del link */}   {" "}
    </div>
  );
};

export default page;
```

> En versiones anteriores era necesario tener un `<a></a>` dentro del componente Link, quedando el mismo de la siguiente manera `<Link href=""><a></a></Link>`

## Imágenes

Uno de los beneficios de utilizar Next es la posibilidad de optimizar las imágenes gracias al componente `Image`. El mismo hace que la carga de imágenes sea mucho más rápida.  
Para utilizar este componente debemos crear una carpeta en nuestro `public` llamada `images` (/public/images), dentro agregaremos la imagen que utilizaremos luego. En nuestro código importaremos el componente de la siguiente manera.

```tsx
import Image from "next/image"; // Importamos el componente
import Link from "next/link";

const page = () => {
  return (
    <div>
           {" "}
      <div>
                <h1>users</h1>       {" "}
        <div className="flex gap-4">
                   {" "}
          <Image
            src="https://robohash.org/robo.png/" // Le indicamos el source
            sizes="100vw"
            width={100} // Indicamos el tamaño
            height={100}
            alt="User image 1" // Y el texto
          />
                    <Image
            src="https://robohash.org/robo2.png/"
            sizes="100vw"
            width={100}
            height={100}
            alt="User image 2"
          />          <Image
            src="https://robohash.org/robo3.png/"
            sizes="100vw"
            width={100}
            height={100}
            alt="User image 3"
          />       {" "}
        </div>
             {" "}
      </div>
            <Link href="/">↩ Volver</Link>   {" "}
    </div>
  );
};

export default page;
```

> Las imágenes locales se almacenan en `public/assets/images`

De esta forma Next renderiza mejor las imágenes, ayudando a la carga de las mismas.  
Este método es bueno siempre y cuando sepamos el tamaño de nuestra imagen, pudiendo asignar un tamaño en pixeles adecuadamente, pero si desconocemos el tamaño de la misma es posible usar `layout="fill"`. Para hacer uso de la misma es `NECESARIO` envolver el componente Image dentro de un contenedor, al mismo se le deberá colocar la propiedad `position: relative`, ya que la imagen que se genera con el `fill` tiene `position: absolute`. La misma quedaría de la siguiente manera.

```tsx
<div className="relative h-32 w-screen">
           {" "}
  <Image
    src="https://robohash.org/robo4.png/"
    alt="User image 4"
    fill
    objectFit="cover"
  />
         {" "}
</div>
```

Por ultimo, hay que indicarle a Next las urls externas para las imágenes, esto se hace cambiando la configuración en el archivo `next.config.js`

```js
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "robohash.org", // Indicamos el dominio
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
```

## Fetching data

NextJs nos ayuda a la hora de hacer fetching de datos de tres formas, fetching estático (una vez antes de generar la página), dinámico (cada vez que entre a la página), y un ultimo que es la mezcla de estos dos, indicando el tiempo que se tomará en pedir los datos nuevamente.

### Fetch estático

Para pedir los datos tenemos que indicar que los datos quedarán con el cache guardado, para ello debemos pasar el parámetro `cache: 'force-cache'` al pedido de la siguiente manera.

```jsx
const getData = async () => {
  // Creamos la función para el fetch
  const url = "https://jsonplaceholder.typicode.com/users/1"; // Indicamos la url
  const res = await fetch(url, { cache: "force-cache" }); // Y hacemos el fetch, con las opciones para que sea estático
  return res.json(); // Devolvemos la respuesta
};

export default async function Home() {
  // Indicamos que el componente es asíncrono
  const userData = await getData(); // Llamamos a la función y guardamos los datos

  return (
    <main>
            
      <div>
                <p>{JSON.stringify(userData)}</p>{" "}
        {/* Mostramos los datos en pantalla */}
              
      </div>
          
    </main>
  );
}
```

### Fetch dinámico

Al igual que con el fetch estático, el procedimiento es el mismo, solamente cambia la forma de guardar el caché, indicando que será `cache: no-store`.

```jsx
const getData = async () => {
  const url = "https://jsonplaceholder.typicode.com/users/1";
  const res = await fetch(url, { cache: "no-store" }); // Indicamos la forma de storage del caché
  return res.json();
};

export default async function Home() {
  const userData = await getData();

  return (
    <main>
            
      <div>
                <p>{JSON.stringify(userData)}</p>
              
      </div>
          
    </main>
  );
}
```

### Fetch revalidado

Por ultimo, si necesitamos que el fetch se haga solamente después de cierto tiempo hacemos uso de la opción de revalidado, indicando el tiempo en segundos de la siguiente manera.

```jsx
const getData = async () => {
  const url = "https://jsonplaceholder.typicode.com/users/1";
  const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } }); // Indicamos que se vuelve a hacer cada 24hs

  return res.json();
};

export default async function Home() {
  const userData = await getData();
  return (
    <main>
            
      <div>
                <p>{JSON.stringify(userData)}</p>
              
      </div>
          
    </main>
  );
}
```

### Fetch desde API

Si necesitamos hacer un fetch sin usar la función de fetch pero a su vez necesitamos indicar el tipo de cache se puede hacer uso de las opciones gracias a los imports de Next de la siguiente manera.

```tsx
export const dynamic = "auto",
  dynamicParams = true,
  revalidate = false,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto",
  maxDuration = 5;

export default function MyComponent() {}
```

> Todas las opciones con explicación están [acá 🔗](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#preferredregion)

## Loading y Suspense

Si tenemos que hacer pedidos a una API y sabemos que pueden tardar es buena practica mostrar al usuario cierta interacción, en vez de dejar que cargue toda la página antes. Para ello podemos hacer uso del componente `loading.tsx`, el cual se encarga de mostrar algo antes de la carga de la página.
Para esto se debe crear el archivo en donde se quiera manejar la carga de la siguiente manera.

```tsx
export default function Loading() {
  return <div className="text-white">LOADING...</div>;
}
```

Sumado a esto, es posible hacer que un componente haga un fetch y a su vez que este se cargue solamente cuando el fetch se complete, y mostrar puntualmente un "loading" especifico para el componente. Para ello haremos uso del componente `Fallback` de la siguiente manera.

```tsx
import { Suspense } from "react";
import { LoadingTestOne } from "../lib/ui/LoadingTestOne/LoadingTestOne";
import { LoadingTestTwo } from "../lib/ui/LoadingTestTwo/LoadingTestTwo";
import { LoadingFallback } from "../lib/ui/LoadingFallback/LoadingFallback";

const page = async () => {
  return (
    <div>
           {" "}
      <div className="grid grid-cols-2 place-items-center">
               {" "}
        <Suspense fallback={<h1>Loading component 1...</h1>}>
          {" "}
          {/* Envolvemos el componente en un Suspense */}
                    <LoadingTestOne />       {" "}
        </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <LoadingTestTwo />       {" "}
        </Suspense>     {" "}
      </div>
         {" "}
    </div>
  );
};

export default page;
```

Para probar esto podemos crear un retardo artificial en el fetch de la siguiente manera.

```tsx
const getPosts = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Creamos el retardo de la respuesta
    const res = await fetch("http://jsonplaceholder.typicode.com/posts/2");
    const postData = await res.json();
    return postData;
  } catch (err) {
    console.log(err);
  }
};
```

## Rutas dinámicas

Es posible crear rutas dinámicas en Next con el uso de [], para ello debemos ingresar dentro de este el nombre del parámetro que tomaremos luego, por ejemplo, podemos crear una página para generar el usuario con el ID del mismo, en el directorio `app/users/[userID]/page.tsx` de la siguiente manera.

```tsx
import { UserDataType } from "@/types/dictionary";
import Image from "next/image";

const getUserFromDB = async (
  userIDForSearch: String,
): Promise<UserDataType> => {
  // Creamos la función para pedir los datos del usuario
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userIDForSearch}`, // Y lo generamos dinámicamente
  );
  const data = await res.json();
  return data; // Devolvemos los datos
};

export async function generateStaticParams() {
  // Creamos la función para generar las páginas estáticas
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return users.map((user: UserDataType) => ({
    userID: String(user.id),
  }));
}

const page = async ({ params }: { params: { userID: String } }) => {
  const userData = await getUserFromDB(params.userID); // Pedimos los datos

  return (
    <div>
            <h1>User page</h1>       {" "}
      <div>
                 {" "}
        <Image
          src={`https://robohash.org/robo${userData.username}.png/`}
          sizes="100vw"
          width={100}
          height={100}
          alt={`User ${userData.username} profile`}
        />
                  <ul>
                      <li>User Name: {userData.username}</li>           {" "}
          <li>
                          Address: {userData.address.street},{" "}
            {userData.address.city}           {" "}
          </li>
                   {" "}
        </ul>       {" "}
      </div>
         {" "}
    </div>
  );
};

export default page;
```

## Pathname

El pathname es un hook de Next que nos proporciona los datos del path en el que estamos, lo cual nos ayuda a la hora de hacer ciertas comprobaciones, o manejar ciertos estilos.
Por ejemplo, si creamos el directorio `app/lib/ui/Navbar/Navbar.tsx` para utilizar este nos quedaría de la siguiente manera.

```tsx
"use client"; // Indicamos que es un componente en el cliente

import { RoutesType } from "@/types/dictionary";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Importamos el hook

const Navbar = () => {
  const currentRoute = usePathname(); // Guardamos el pathname

  const links: Array<RoutesType> = [
    // Creamos los links
    {
      href: "/",
      linkName: "Home",
    },
    {
      href: "/users",
      linkName: "Users",
    },
    {
      href: "/help",
      linkName: "Help",
    },
  ];

  return (
    <nav className="w-screen bg-slate-900 py-4">
           {" "}
      <ul className="flex items-center justify-center gap-8">
               {" "}
        {links.map(
          (
            link,
            i, // Iteramos por todos los links
          ) => (
            <li key={i}>
                         {" "}
              <Link
                className={`${
                  currentRoute === link.href ? "underline" : "no-underline" // Y le indicamos el estilo si se encuentra en el mismo link
                }`}
                href={link.href}
              >
                              {link.linkName}           {" "}
              </Link>
                       {" "}
            </li>
          ),
        )}
             {" "}
      </ul>
         {" "}
    </nav>
  );
};

export default Navbar;
```

## Generar build estático

Si nuestro objetivo final es generar una página estática para subirla a un servidor necesitamos indicarlo en el archivo `package.json` como lo indica la documentación oficial. Para ello debemos crear el método `export`, el cual generará todos nuestros archivos estáticos en una carpeta `out`, la cual podremos subir normalmente.  
El script debería quedarnos de la siguiente manera.

```json
  "scripts": {
    // [...]
    "export": "next build && next export"
  },
```

Con esto configurado solo será necesario iniciar el script escribiendo `npm run export` en nuestra consola, pudiendo ver como se genera la carpeta `out` al finalizar.

## Deploy a Vercel

Si la página no será estática lo mejor será hacer nuestro deploy directamente en Vercel, ya que al ser desarrollado por ellos la implantación es mucho mejor que con otros servidores. En el mismo es posible linkear directamente nuestra cuenta de Github y elegir el repo que necesitemos hacer el deploy directamente.

## Fuentes

- [NextJs docs 🔗](https://nextjs.org/docs)
- [Fetching en NextJs 13 by CoderOne 🔗](https://youtu.be/g0Jc5D6tiCo?si=f0e4YwW82J8Tt-dB)
- [Next 13 + Pocketbase by Fireship 🔗](https://youtu.be/__mSgDEOyv8?si=Fx_C7G90bZHUCogS)
- [Next 13.2 back and links by Vercel 🔗](https://youtu.be/UfNMlhu3L4I?si=JF1_p5qeng7Z8glX)
- [Next 14 by midulive 🔗](https://youtu.be/jMy4pVZMyLM?si=R346P98BHkMo7Xcz)
