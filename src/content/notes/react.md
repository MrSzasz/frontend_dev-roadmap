---
title: "React"
tags: ["front", "code", "typescript"]
description: "React es una librería de JavaScript diseñada con el fin de crear interfaces de usuario dinámicas mucho mas rápidas, la cual fue creada por Facebook y es utilizada, mas allá de sus respectivas páginas web, en una gran variedad mas como puede ser Uber, Pinterest, Netflix entre otros."
date: 1700082500000
icon: "/icons/react.svg"
color: "#81E0FF"
---

## NodeJS

Para iniciar debemos tener instalado [NodeJS](https://nodejs.org/en/), para saber si lo tenemos instalado deberemos abrir [la terminal](https://linube.com/ayuda/articulo/174/abrir-una-consola-de-comandos#:~:text=Windows%20y%20Mac.-,En%20Windows,En%20ella%20debes%20escribir%20cmd.) y escribir el siguiente comando.

```cmd
node -v
```

Si sale la version es que esta instalado correctamente, de no ser así deberemos ir a la [página de node](https://nodejs.org/en/) e instalar la version LTS, ya que es la mas estable.

## Instalación React

Para crear un proyecto de React hay dos formas principales, la forma clásica usando [`npx create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) y la forma más actual con [`ViteJS`](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

### Create-React-App

Para instalar React de la forma clásica abriremos nuestra terminal en el escritorio (o abrimos la terminar y escribimos `cd Desktop`), y escribimos el siguiente comando.

```cmd
npx create-react-app nombre-de-mi-proyecto
```

> El nombre del proyecto puede ser cualquiera siempre y cuando no tenga espacios de por medio.

Esto creara una carpeta con todos los archivos necesarios para nuestro proyecto, la cual deberemos abrir con nuestro editor de código preferido (en este proyecto usaremos [Visual Studio Code](https://code.visualstudio.com/)).

### ViteJS

El proyecto creado de la anterior forma suele ser mas pesado porque contiene muchas mas dependencias de las que se usan normalmente, es por ello que actualmente es mas usado `ViteJs` para la creación de las mismas. Para comenzar haremos lo mismo, abriremos la consola en el escritorio pero esta vez el comando sera diferente, ya que nos guiara por las opciones a medida que vayamos eligiendo que proyecto crear.

```cmd
npx create vite@latest
```

> Tal vez nos pida instalar el paquete para crear el proyecto, el cual aceptamos

Primeramente deberemos escribir el nombre de nuestro proyecto, luego con las flechas de dirección seleccionamos `react` y la variante `react` normal (también es posible usar `react-ts` para tener configurado TypeScript en el mismo). Hecho esto deberemos entrar en la carpeta que se creó con `cd nombre-de-mi-proyecto` y ejecutar el comando `npm install`, el cual instalará todas las dependencias necesarias para el proyecto.  
Al terminar podemos notar que el peso del mismo ronda los 30MB/35MB, una gran diferencia a comparación de los 200MB de la forma clásica.  
Para este proyecto usaremos esta ultima forma como base, es por eso que deberemos abrir esta carpeta en VSC par poder seguir con el mismo.

## Coding

Al abrir el proyecto podemos ver las carpetas y archivos que nos creo Vite, dando un repaso por ellos podemos explicar los siguientes.

- **_node_modules_**: Son los archivos de las dependencias necesarias para la creación de nuestro proyecto, esta misma no hay que tocar.

- **_public_**: Esta es la carpeta en la que se encuentran los archivos públicos del Front End

- **_src_**: Es la carpeta en la que crearemos todos nuestros componentes y archivos de React

- **_.gitignore_**: Es el archivo que contiene los datos de que carpetas o archivos no se deben subir a los repositorios

- **_index.html_**: Es el index base en el cual se basará nuestra aplicación

- **_package-lock.json_**: Es el archivo que contiene los datos detallados de los paquetes necesarios para el funcionamiento de nuestra aplicación

- **_package.json_**: Contiene los datos de la aplicación, los scripts y las dependencias de las mismas

- **_vite.config.js_**: Archivo de configuración de ViteJS

Aunque los archivos ya vienen creados y listos para su uso, para una mejor comprensión de los mismos eliminaremos la carpeta `src` y la crearemos nosotros desde cero.

## Archivos básicos

Para comenzar completamente desde cero podemos hablar del archivo `index.html`, el cual es el archivo HTML que contiene nuestra futura aplicación, la misma es una base normal de HTML pero tiene dos puntos clave que veremos a continuación. Comenzamos creando nuestra base HTML normal (en VSC si escribimos el símbolo de exclamación `"!"` y damos ENTER tendremos automáticamente creado el código base).  
Dentro del `body` tendremos un div con el id `root`, el cual usaremos como lienzo para toda nuestra aplicación, y también un script que sera donde tendremos toda la lógica de programación.

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React-WEB</title>
</head>

<body>

    <div id="root"></div>       <!-- DIV base que contendrá nuestra aplicación -->

    <script type="module" src="./src/main.jsx"></script>        <!-- Importamos el modulo que crearemos próximamente -->

</body>

</html>
```

Hecho esto debemos crear nuestra nueva carpeta `src` en la cual crearemos nuestro archivo `main.jsx` (o `index.js` si se usa `create-react-app`).  
En este archivo es donde tendremos nuestra raíz para la aplicación. Hay que saber que React crea las interfaces en JavaScript y luego las "construye" con un comando para que podamos subirlas a nuestro host, y para esto se usa una forma diferente de escribir el código llamada [`jsx`](https://reactjs.org/docs/introducing-jsx.html), la cual se podría tomar como una combinación entre JavaScript y HTML, lo cual veremos en unos instantes.  
Para empezar deberemos importar la librería de React (librería base) y [ReactDOM](https://es.reactjs.org/docs/react-dom.html) (librería para controlar el DOM en el navegador) en nuestro archivo `main.jsx`, para ello las importaremos en las dos primeras lineas de la siguiente forma.

```jsx
import React from "react"; // Importamos la base de React
import ReactDOM from "react-dom/client"; // Importamos ReactDOM para el cliente
```

Obviamente nuestra aplicación no funcionara si no importamos React anteriormente, pero luego debemos declarar en donde se crearan las mismas, es por eso que debemos llamar al DIV que creamos con el id `root` y usar los métodos de React y ReactDOM para generar la interfaz de la siguiente forma.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

const mainDiv = document.getElementById("root"); // Primero tomamos el elemento DIV del HTML
const root = ReactDOM.createRoot(mainDiv); // Creamos la constante raíz y usamos el método para crear la raíz en base al elemento
root.render(); // Método que utilizamos para renderizar nuestra aplicación
```

> La forma corta que usaremos de ese código será `const root = ReactDOM.createRoot(document.getElementById("root")).render();`

Acá podemos probar por primera vez nuestra aplicación, pasando un elemento dentro del método `render()`.

```jsx
const root = ReactDOM.createRoot(document.getElementById("root")).render(
  <h1>Hola, mundo!</h1>,
);
```

Luego abrimos la [consola de VSC](https://damiandeluca.com.ar/como-usar-la-terminal-integrada-de-visual-studio-code) y escribimos el siguiente comando.

```cmd
npm run dev
```

Este comando iniciará nuestra app en el servidor, nos dará una dirección con el puerto que se esté usando, el cual pegaremos en nuestro navegador preferido para ver como se genera nuestra página.  
Aquí mismo podemos ver nuestro primer `Hola, mundo` generado con React, el cual se actualizará automáticamente cada vez que actualicemos nuestro archivo de React.

## Componentes

Pero la forma en la que creamos nuestro primer componente no es la mejor, dado que al escribir mas y mas código se hará difícil de controlar, es por esto que debemos modularizar los componentes de nuestro proyecto. Para ello comenzamos con el componente principal, en el cual importaremos todos los demás componentes.  
En nuestra carpeta `src` creamos un archivo llamado `App.jsx`.

> TODOS los componentes de React deben de estar escritos con PascalCase, es decir, SI O SI deben empezar con mayúsculas, sino React no los tomara como un componente valido

Este será el componente principal de nuestra aplicación, aquí es donde importaremos los otros componentes a medida que vayamos armándolo. Dentro del mismo debemos crear nuestra aplicación base de la siguiente forma.

```jsx
const App = () => {
  // Creamos el componente, empezando con mayúsculas
  return (
    // Creamos el return de la función para retornar el contenido del componente
    <h1>Hola, mundo!</h1> // El contenido del componente en formato JSX
  );
};

export default App; // Exportamos el componente para su uso en otro lado
```

> En VSC si se escribe `rafce` se genera automáticamente el componente con el nombre del archivo en cuestión

Esta es una de las formas de escribir el componente, pero también puede ser escrita como una función normal

```jsx
function App() {
  return <h1>Hola, mundo!</h1>;
}
```

> Esta se genera automáticamente escribiendo `rfce`

O como una clase, la cual es la forma clásica de crear componentes para React, aunque actualmente no se utiliza tanto, pero hay muchos proyectos que siguen teniendo este formato.

```jsx
import React, { Component } from "react"; // En este caso si es importante tener React y el componente importados

export class App extends Component {
  // Se crea la clase en vez de crear la función
  render() {
    return <h1>Hola, mundo!</h1>;
  }
}

export default App;
```

> Esta se genera automáticamente con con el comando `rce`

Por comodidad en el proyecto usaremos la primer forma de creación de componentes (`rafce`).  
Como se puede observar, el componente es prácticamente una sintaxis HTML, dado que solo tenemos un `h1` que vamos a exportar, pero este mismo debemos llevarlo al main para que sea la base de todo.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/App"; // Importamos el componente principal

const root = ReactDOM.createRoot(document.getElementById("root")).render(
  <App />, // Usamos el componente principal como parámetro para la raíz
);
```

Como se puede ver, el componente tiene una forma de llamarse particular, esta sintaxis es propia de JSX, la cual genera los componentes como si fueran etiquetas HTML, y si no tienen elementos `child` no tienen la necesidad de tener una etiqueta de cierre como tal, a esto se lo llama `Self-closing tag`.
Hecho esto tenemos nuestra base de React configurada, esto es todo lo que se crea automáticamente con ambas herramientas, ya sea con `npx` o `Vite`.

## Props

Como vimos al principio, los componentes son reutilizables, los mismos pueden ser solo una maqueta base que cambia dependiendo el contenido, es decir, podemos crear un componente `Title` que sea un `h1` con cierto estilo, y a este lo podemos llamar en diferentes páginas de nuestra aplicación, solamente cambiando el texto que contiene dentro. Esto es posible gracias al uso dinámico de las `props`, los cuales son, como su nombre lo indican, propiedades que cambiamos cuando llamamos a ciertos componentes.  
Los props pueden ser dinámicos, y para entender el concepto completo vamos a hacer un ejemplo con la venta de una propiedad. Empezamos creando una carpeta llamada `Components` dentro de la carpeta `src`. Dentro de la misma creamos una carpeta llamada `HouseCard` y dentro el archivo `HouseCard.jsx` en la cual tendremos nuestro primer componente.

```jsx
const HouseCard = () => {
  return <div>HouseCard</div>;
};

export default HouseCard;
```

> Este es el formato que creamos automáticamente con `racfe`

Dentro del mismo podemos tener nuestra base de componente para repetir con diferentes contenidos, para ello empezamos haciendo el maquetado con datos que cambiaremos luego.

```jsx
const HouseCard = () => {
  return (
    <div>
      <h1>Nombre</h1>
      <h2>Dirección</h2>
      <p>$Precio</p>
      <h3>Características</h3>
      <ul>
        <li>Tamaño:</li>
        <li>Habitaciones:</li>
        <li>Mascotas:</li>
      </ul>
      <p>Disponible: </p>
      <button>Contacto</button>
      <hr />
    </div>
  );
};

export default HouseCard;
```

> El contenido del un componente SIEMPRE tiene que estar dentro de una etiqueta contenedora, ya sea un `div`, `button`, o hasta una etiqueta vacía (`<> </>`)

Ahora podemos ir a nuestra `App.jsx` e importarlo para su uso.

```jsx
import HouseCard from "./Components/HouseCard/HouseCard"; // Debemos importarlo

const App = () => {
  return (
    <HouseCard /> // El componente se llama como si fuera una etiqueta HTML con cierre en el mismo
  );
};

export default App;
```

> En VSC el componente se importa automáticamente siempre que se empiece con `<` y se escriba la primer letra en mayúsculas

Ahora podemos levantar nuestro servidor usando `npm run dev` en la consola y podremos observar que el componente se refleja en la página.  
Pero si queremos reutilizar el mismo con diferentes valores debemos hacer uso de las props de las mismas, estas son equivalentes a los parámetros en las funciones normales de JavaScript, las mismas se pasan de la siguiente forma.

```jsx
const HouseCard = ({ nombre, direccion, precio, características, disponibilidad, funcionBoton }) => {
    return (
        [...]       // Aca esta el código hecho anteriormente
    );
};

export default HouseCard;
```

Las props se pasan como un componente general llamado `props`, el cual es un objeto con todas las propiedades dentro, es por eso que usamos las llaves (`{ }`) para hacer un destructuring del mismo. Hecho esto, podemos acomodar las props en el componente, dependiendo donde las vamos a usar. Las props se escriben entre llaves para declarar que son las props, usando JavaScript para las mismas, es por eso que podemos hacer operaciones ternarias (`if/else`) para generar cierto código si se declara un ternario o se cumple cierta condición.

```jsx
const HouseCard = ({
  nombre,
  direccion,
  precio,
  características,
  disponibilidad,
  funcionBoton,
}) => {
  return (
    <div>
      <h1>{nombre}</h1>{" "}
      {/* Las props deben de tener el mismo nombre que se pasan para que funcione correctamente */}
      <h2>{direccion}</h2>
      <p>${precio}</p>
      <h3>Características</h3>
      <ul>
        <li>Tamaño: {características.tamaño}</li>{" "}
        {/* Como le vamos a pasar un objeto, es necesario tomar las características de los mismos */}
        <li>Habitaciones: {características.habitaciones}</li>
        <li>Mascotas: {características.mascotas ? "✔" : "❌"}</li>{" "}
        {/* Al ser JavaScript podemos tomar el ternario para generar diferentes respuestas */}
      </ul>
      <p>Disponible: {disponibilidad ? "✔" : "❌"}</p>
      <button>Contacto</button>
      <hr />
    </div>
  );
};

export default HouseCard;
```

Lo único que nos falta ahora es pasar las props cuando lo llamamos, esto se hace de la siguiente manera.

```jsx
import HouseCard from "./Components/HouseCard/HouseCard";

const App = () => {
  return (
    <HouseCard
      nombre="Lake Manor"
      direccion="35 Main Street"
      precio={1200000}
      caracteristicas={{ tamaño: "100m2", habitaciones: 3, mascotas: true }}
      disponibilidad={true}
    />
  );
};

export default App;
```

> Las props tienen su forma de pasarse, si son strings se envían normalmente con comillas (`"", ''`), en cambio si son cualquier otro tipo de dato se envían entre llaves (`{ }`), y los objetos se envían con doble llave (`{{ }}`) ya que necesitan una llave para enviarse, y otra para declarar que son objetos

Gracias a React podemos reutilizar este componente las veces que sean necesarias, solo cambiando las props que le pasamos de la siguiente manera.

```jsx
import HouseCard from "./Components/HouseCard/HouseCard";

const App = () => {
  return (
    <>
      {" "}
      {/* Utilizamos los tags vacíos para que no se genere un div en el HTML */}
      <HouseCard // Este formato se usa para que sea mas Comodo a la vista
        nombre="Lake Manor"
        direccion="35 Main Street"
        precio={2600000}
        características={{ tamaño: "1300m2", habitaciones: 7, mascotas: true }}
        disponibilidad={true}
      />
      <HouseCard
        nombre="Minimal Dream"
        direccion="13 Main Street"
        precio={1000000}
        características={{ tamaño: "90m2", habitaciones: 1, mascotas: true }}
        disponibilidad={true}
      />
      <HouseCard
        nombre="Commercial Block 3"
        direccion="3 Commercial Street"
        precio={500000}
        caracteristicas={{ tamaño: "72m2", habitaciones: 1, mascotas: false }}
        disponibilidad={false}
      />
    </>
  );
};

export default App;
```

## EventHandlers

En React podemos hacer uso de los [eventos](https://es.reactjs.org/docs/events.html), los mismos que reaccionan a ciertas acciones del usuario en la página, al igual que en JavaScript. La diferencia entre los eventos de JS y los de React es la forma en la que se escriben, empezando con `on` y camelCase en React (`onClick, onKeyDown, onBlur`).  
Para ver un ejemplo de esto empezaremos creando prop que nos falto pasar, `funcionBoton`, al cual sera una función que crearemos en `App.jsx`, aunque siempre es recomendable dejar la misma limpia y modularizar todo lo que se pueda.

```jsx
import HouseCard from "./Components/HouseCard/HouseCard";

const App = () => {
  function contacto(nombre, precio) {
    alert(
      `En breve se le contactará por la propiedad ${nombre} valorada en $${precio}`,
    );
  }

  return (
    <>
      <HouseCard
        nombre="Lake Manor"
        direccion="35 Main Street"
        precio={2600000}
        características={{ tamaño: "1300m2", habitaciones: 7, mascotas: true }}
        disponibilidad={true}
        funcionBoton={contacto} // Le pasamos la función que creamos anteriormente
      />
      [...] />
    </>
  );
};

export default App;
```

Y luego debemos ubicarla en nuestro componente para que se accione cada vez que se haga click en el mismo, haciendo uso del evento llamado [`onClick`](https://reactjs.org/docs/events.html#mouse-events), el cual reaccionará cada vez que se haga un click en el elemento en cuestión.

```jsx
const HouseCard = ({
  nombre,
  direccion,
  precio,
  características,
  disponibilidad,
  funcionBoton,
}) => {
  return (
    <div>
      [...]
      <button onClick={() => funcionBoton(nombre, precio)}>
        Contacto
      </button> {/* Le pasamos las props que vamos a necesitar como parámetros */}
      <hr />
    </div>
  );
};

export default HouseCard;
```

> Las funciones pueden abarcar desde una alerta simple como ahora hasta un cambio de componente, ocultarlo o hasta cambios en la base de datos, siempre y cuando se tengan los conocimientos de JavaScript necesarios

## Estilos

Como podemos observar, a nuestro componente le falta un estilo visual para que no sea un simple HTML plano, para ello haremos uso de `CSS`, creando un archivo llamado `HouseCard.css` dentro de la carpeta `HouseCard`.  
Este archivo sera nuestro archivo de estilos para el componente, cada carpeta de componente contiene el archivo `.jsx` de código y el `.css` de estilos propio, el cual debemos importar en el mismo de la siguiente manera.

```jsx
import "./HouseCard.css"        // Importamos el css del componente

const HouseCard = ({ nombre, direccion, precio, características, disponibilidad, funcionBoton }) => {
    return (
        [...]
    );
};
```

Y ahora es posible cambiar cualquier estilo del componente, y el mismo se aplicará cada vez que se llame, para ello tendremos un ejemplo base.

```css
.houseCard {
  min-width: min-content;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 2px solid black;
  border-radius: 10px;
  padding: 10%;
  margin-bottom: 10px;
  background-color: #0d0d0d;
  color: white;
}

.houseCard h1 {
  font-family: "Courier New", Courier, monospace;
}

.houseCard ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

button {
  background-color: #2e2e2e;
  padding: 10px;
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: ease all 0.5s;
  margin-top: 15px;
}

button:hover {
  scale: 1.1;
  background-color: #3e3e3e;
}
```

En este caso hicimos uso de una clase que debemos crear, pero para ello no se usa simplemente `class` como en HTML, sino que necesitamos hacer uso de `className`, la forma de declarar clases dada por React.

```jsx
import "./HouseCard.css";

const HouseCard = ({
  nombre,
  direccion,
  precio,
  características,
  disponibilidad,
  funcionBoton,
}) => {
  return (
    <div className="houseCard">
      {" "}
      {/* Siempre se usa className, ya que si usamos simplemente class nos dará un error en consola */}
      <h1>{nombre}</h1>
      <h2>{direccion}</h2>
      <p>${precio}</p>
      <h3>Características</h3>
      <ul>
        <li>Tamaño: {características.tamaño}</li>
        <li>Habitaciones: {características.habitaciones}</li>
        <li>Mascotas: {características.mascotas ? "✔" : "❌"}</li>
      </ul>
      <p>Disponible: {disponibilidad ? "✔" : "❌"}</p>
      <button onClick={() => funcionBoton(nombre, precio)}>Contacto</button>
    </div>
  );
};

export default HouseCard;
```

Volviendo a aclarar que está basado en JavaScript podemos hacer que las clases sean dinámicas, agregándolas dentro de un ternario si son `true` o `false`, cambiando la clase en cada uno de ellos de la siguiente manera.

```jsx
const HouseCard = ({ nombre, direccion, precio, características, disponibilidad, funcionBoton }) => {
    return (
        [...]
            <li className={disponibilidad ? "text-disp" : "text-no-disp"}>Mascotas: {características.mascotas ? '✔' : '❌'}</li>
        </ul>
        <p className={disponibilidad ? "text-disp" : "text-no-disp"}>Disponible: {disponibilidad ? '✔' : '❌'}</p>
        [...]
    );
};

export default HouseCard;
```

Y agregando esa clase al archivo `css`.

```css
[...] .text-disp {
  color: green;
}

.text-no-disp {
  color: red;
}
```

## Paquetes

Ahora que empezamos a estilizar nuestra app podemos probar la instalación de un paquete de tercero gracias a `npm`. En este caso usaremos [`Sass`](https://sass-lang.com/), el cual es un pre-procesador de CSS que otorga más funcionalidades al mismo.  
Para ello lo instalamos en el proyecto con el siguiente comando.

```cmd
npm i sass
```

Ahora lo único que debemos hacer es cambiar la extension de nuestros archivos de `.css` a `.scss`, y en él podemos comenzar a trabajar con `Sass` sin ningún problema.

> Al cambiar la extension a `.scss` habrá que cambiarlo en todos los archivos donde llamemos a los estilos

Un ejemplo del cambio de sintaxis que tiene Sass es la posibilidad de anidar (nest) las diferentes clases para que no se repitan, ahorrando un poco mas de código. Para mostrar esto podemos ver como quedaría nuestro CSS implementando el nesting de Sass.

```scss
.houseCard {
  min-width: min-content;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 2px solid black;
  border-radius: 10px;
  padding: 10%;
  margin-bottom: 10px;
  background-color: #0d0d0d;
  color: white;

  h1 {
    // Directamente colocamos el h1 dentro, lo que equivale a ".class h1"
    font-family: "Courier New", Courier, monospace;
  }

  image {
    height: 100px;
    width: 100px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}

button {
  background-color: #2e2e2e;
  padding: 10px;
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: ease all 0.5s;
  margin-top: 15px;

  &:hover {
    // El símbolo & (and) marca que se toma el elemento como base
    scale: 1.1;
    background-color: #3e3e3e;
  }
}

.text-disp {
  color: green;
}

.text-no-disp {
  color: red;
}
```

Sass es solo un ejemplo de los paquetes que se pueden instalar, pero hay muchos mas [paquetes disponibles para usar](https://www.npmjs.com/).

## Map de array

En React podemos generar contenido de un componente en base a un array, cosa que usaremos bastante cuando se necesite pedir datos de una base de datos. De momento tendremos un ejemplo básico creando una array para tomarlo de base.  
Empezamos creando una nueva carpeta llamada `FoxCard` en la que tendremos un archivo `.jsx` y un `.scss` con el mismo nombre. Dentro de nuestro `jsx` agregaremos el componente base (`rafce` en este caso) y crearemos un array llamado `foxArray`, el cual contendrá nuestros zorros.

```jsx
import "./FoxCard.scss";

const FoxCard = () => {
  const foxArray = [
    {
      foxName: "Glimpsy",
      foxAge: 5,
    },
    {
      foxName: "Dixie",
      foxAge: 3,
    },
    {
      foxName: "Jackie",
      foxAge: 4,
    },
  ];

  return (
    <div>
      <h1>Fox Name</h1>
      <h3>Edad: </h3>
      <img src="" />
    </div>
  );
};
```

Para poder recorrer nuestro array debemos hacer uso del método `map`, el cual recorre cada elemento del array para generar nuestro código. El mismo, al ser código de JavaScript, se debe escribir entre llaves (`{}`).

```jsx
import "./FoxCard.scss";

const FoxCard = () => {
  const foxArray = [
    {
      foxName: "Glimpsy",
      foxAge: 5,
    },
    {
      foxName: "Dixie",
      foxAge: 3,
    },
    {
      foxName: "Jackie",
      foxAge: 4,
    },
  ];

  return (
    <>
      {foxArray.map(
        (
          fox,
          i, // Forma de escribir el map para generar el contenido
        ) => (
          <div key={i}>
            {" "}
            {/* La key se tiene que colocar en el contenedor padre cada vez que se usa el map */}
            <h1>{fox.foxName}</h1>
            <h3>Edad: {fox.foxAge}</h3>
            <img src="" />
          </div>
        ),
      )}
    </>
  );
};

export default FoxCard;
```

> La key debe ser única, no debe repetirse en ningún componente o genera un error, es común usar un `id` si el objeto en particular lo tiene, sino se hace uso del index

Si importamos el componente a nuestra `App.jsx` podemos ver como se genera en base a los objetos dentro de nuestro array.

## Fetch

Pero viendo esto podemos notar que nos hace falta la imagen, para esto podemos aprender algo muy importante de React y JavaScript que es el fetchAPI, y utilizarlo para traer una imagen desde una API publica.  
Para hacer esto necesitamos hacer uso de la funcion `fetch()`, la cual es recibe una url como parámetro y devuelve una promesa. Para este ejemplo usaremos la API [RandomFox](https://randomfox.ca).

```jsx
fetch("https://randomfox.ca/floof/") // Le pasamos la URL como parámetro
  .then((res) => res.json()) // Convertimos la respuesta a JSON
  .then((res) => console.log(res)) // Mostramos la respuesta en consola
  .catch((err) => console.error(err)); // Si hay un error, lo mostramos en consola
```

Si vemos la respuesta en la consola podremos ver que se nos devuelve un objeto con la imagen y el link, nosotros podemos pasar fácilmente esta imagen como `src` de nuestra etiqueta `img`, pero siendo que estamos trabajando con React es necesario hacer uso de los Hooks que nos provee React.
Esta forma de hacer fetch a los datos es la más simple, pero cuando el usuario puede manipular el fetch se tiene que crear una forma para cancelar el mismo, para ello se hace uso de la función de JavaScript `AbortController()` de la siguiente manera.

```jsx
useEffect(() => {
  const controller = new AbortController(); // Creamos el controlador
  const signal = controller.signal; // Y la señal

  fetch(`https://jsonplaceholder.typicode.com/users/${userID}`, { signal }) // Le pasamos la señal como parámetro
    .then((res) => res.json())
    .then((res) => setData([res]))
    .catch((err) => {
      if (err.name === "AbortError") {
        console.warn({ err, msg: "data aborted" }); // Manejamos el error cuando aborte
      } else {
        console.error({ err }); // Y el error general
      }
    });

  return () => {
    controller.abort(); // Limpiamos la llamada antes de hacer otra
  };
}, [userID]);
```

## Hooks

[Hooks](https://es.reactjs.org/docs/hooks-overview.html) se le llama a algunas funciones nativas de React que nos sirven para diferentes cosas, ya sea mantener variables, estados, contextos, entre otras. Estas se tienen que importar cada vez que necesitemos utilizarlas.
Uno de los hooks que usaremos será `useEffect`, el cual maneja los efectos secundarios que se hacen LUEGO de la generación del componente. El mismo puede ser llamado de 3 formas dependiendo de las veces que queramos que se utilicen.

```jsx
import { useEffect } from "react"; // Importamos useEffect de React

useEffect(() => {
  // Llamamos al useEffect
  console.log("Hola"); // Aca va todo nuestro código
}, []); // Indica que solo se llama una vez al generar el componente
```

> Al tener un array vacío (`[]`) solo se llama una vez y no vuelve a llamarse a menos que se recargue la página

```jsx
import { useEffect, useState } from "react"; // Importamos useEffect de React

const [data, setData] = useState(""); // Hook de estado que veremos mas adelante

useEffect(() => {
  // Llamamos al useEffect
  console.log("Hola"); // Aca va todo nuestro código
}, [data]); // Indica que esta atento a los cambios en data
```

> El mismo se vuelve a llamar cada vez que cambia el valor de lo que tenga dentro del array (en este caso el valor de `data`)

```jsx
import { useEffect } from "react"; // Importamos useEffect de React

useEffect(() => {
  // Llamamos al useEffect
  console.log("Hola"); // Aca va todo nuestro código
}); // Indica que se llama cada vez que cambia algo en la página
```

> Al no tener un array el mismo se llama cada vez que cambie algo en la página, lo cual puede ser peligroso si se esta llamando a una base de datos por un colapso de requests

Para este caso usaremos `useEffect` para el fetch de la siguiente forma.

```jsx
import { useEffect } from "react";
import "./FoxCard.scss";

const FoxCard = () => {
  const foxArray = [
    {
      foxName: "Glimpsy",
      foxAge: 5,
    },
    {
      foxName: "Dixie",
      foxAge: 3,
    },
    {
      foxName: "Jackie",
      foxAge: 4,
    },
  ];

  useEffect(() => {
    fetch("https://randomfox.ca/floof/")
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {foxArray.map((fox, i) => (
        <div key={i}>
          <h1>{fox.foxName}</h1>
          <h3>Edad: {fox.foxAge}</h3>
          <img src="" />
        </div>
      ))}
    </>
  );
};

export default FoxCard;
```

De momento, lo único que hace nuestro fetch es mostrar los datos por consola, pero lo que queremos hacer es poder usar la url que nos trae como src de nuestra imagen, para ello debemos guardarla en una variable. React tiene una forma particular de guardar las variables para su uso, esto es a traves del hook llamado [useState](https://es.reactjs.org/docs/hooks-overview.html#state-hook). Este es un hook que funciona como una variable normal, pudiendo cambiar su valor y usarla en nuestra página.  
Lo primero que debemos hacer es importarla junto al useEffect, y luego hacer uso de su sintaxis.

```jsx
import { useEffect, useState } from "react";
import "./FoxCard.scss";

const FoxCard = () => {

    const [foxImage, setFoxImage] = useState("");       // Se llama primero al nombre de la variable, luego a la funcion que inicia con set y camelCase, y al final se declara el valor inicial

    [...]

}
```

Teniendo la base del estado podemos guardar nuestra búsqueda en la misma haciendo uso de la funcion para cambiar el valor y enviar la variable al src de la imagen.

```jsx
import { useEffect, useState } from "react";
import "./FoxCard.scss";

const FoxCard = () => {
  const [foxImage, setFoxImage] = useState(""); // Lo iniciamos como un string vació

  const foxArray = [
    {
      foxName: "Glimpsy",
      foxAge: 5,
    },
    {
      foxName: "Dixie",
      foxAge: 3,
    },
    {
      foxName: "Jackie",
      foxAge: 4,
    },
  ];

  useEffect(() => {
    fetch("https://randomfox.ca/floof/")
      .then((res) => res.json())
      .then((res) => setFoxImage(res.image)) // Cambiamos el valor de la variable a la imagen
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {foxArray.map((fox, i) => (
        <div key={i}>
          <h1>{fox.foxName}</h1>
          <h3>Edad: {fox.foxAge}</h3>
          <img src={foxImage} />{" "}
          {/* Usamos la variable para generar la imagen */}
        </div>
      ))}
    </>
  );
};

export default FoxCard;
```

En este caso la imagen siempre sera la misma, ya que lo que hacemos es buscar una sola vez y guardar la imagen para reutilizarla las veces que sean necesarias, pero lo importante es ver el funcionamiento y la implementación de los hooks.
Hay algunos hooks más, como pueden ser el [`useContext`](https://es.reactjs.org/docs/hooks-reference.html#usecontext), el cual nos sirve para guardar estados que se usen en toda la página, pero estos lo usaremos mas adelante en otros proyectos.

## Navbar

Para que el navbar no quede por sobre el contenido se deberá crear la variable que contenga su height, para ello empezaremos creando el mismo en el CSS principal del proyecto.

```css
:root {
  --navbar-height: 70px;
}
```

En el mismo deberemos indicar que haya un padding cuando se haga scroll hacia un componente en particular de la siguiente manera.

```css
html {
  scroll-padding-top: var(--navbar-height);
}
```

Y por ultimo debemos crear la función que tome la altura del navbar cuando se genere. Normalmente lo haremos en el componente principal (`App.jsx`), quedando el mismo de la siguiente manera.

```jsx
useEffect(() => {
  const height = document.getElementById("nav").offsetHeight;
  document.documentElement.style.setProperty("--navbar-height", height + "px");
}, []);
```

Con esto siempre generará el padding necesario para que el navbar no tape los elementos en pantalla.

## Hooks circunstanciales

Hay ciertas funciones y hooks que solo debemos utilizar en momentos específicos, ya sea porque tienen asignada una función puntual o porque su implementación solamente sería de ayuda cuando se cumplen ciertos parámetros de bajo rendimiento.

### useTransition()

Este hook nos ayuda a dar prioridad a ciertas funciones para que el usuario no tenga una mala experiencia con nuestro proyecto.
Por ejemplo, si necesitamos buscar entre una lista de miles de productos por cada cambio en un input podemos utilizar el hook para indicar que la prioridad la tiene lo que el usuario ingresa en el input, y que la búsqueda solo se muestre cuando se termine.

```jsx
function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState(largeList)
  const [isPending, startTransition] = useTransition()

  function handleChange(e) {
    setName(e.target.value)
    startTransition(() => {
      setList(largeList.filter(item => item.name.includes(e.target.value)))
    })
  }

  return (
    <>
      <input type="text" value={name} onChange={handleChange} />
      {isPending ? (
        <div>Loading...</div>
      ) : (
        list.map(item => <ListComponent key={item.id} item={item} />)
      )}
    </>
  )
})
```

## useRef

Este hook nos ayuda a seleccionar un elemento puntual del DOM, pudiendo acceder a sus respectivos atributos e interactuar con él.

```jsx
import { useRef } from "react";

export default function App() {
  const mainButton = useRef(null); // Creamos la referencia

  const handleButtonClick = () => {
    mainButton.current.innerHTML = "Thanks!"; // Accedemos al elemento y cambiamos su valor
  };

  return (
    <div>
            
      <button
        ref={mainButton} // Indicamos el nombre de la referencia
        onClick={handleButtonClick}
      >
                click me!       
      </button>
          
    </div>
  );
}
```

> Si no se puede pasar el ref como parámetro o hay un error se debe utilizar `forwardRef`

## useMemo

Este hook se encarga de memorizar cierto valor en el componente para que no se vuelva a renderizar, se utiliza mayormente para funciones con cargas pesadas de trabajo, ya sea en cantidad o tiempo.

## Referencias

- [React Documentation 🔗](https://react.dev/learn)
- [UseEffect mistakes (fetch) by Lama Dev 🔗](https://youtu.be/QQYeipc_cik?si=aA6gaqyu--D00vNd)
