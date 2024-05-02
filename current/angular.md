---
title: "Angular"
tags: ["front", "back", "code", "node"]
date: 1713198727656
description: "Angular es un framework desarrollado por Google, tomando de base HTML y Javascript (Typescript). Este es uno de los frameworks más importantes actualmente junto a React, Vue y Svelte"
icon: "/icons/angular.svg"
color: "#C50836"
---

## Instalación

Para comenzar con Angular lo primero que se tiene que hacer es instalar su CLI, el cual será la base para toda la creación de la aplicación, desde levantar el servidor hasta la creación de los componentes. Para ello debemos utilizar los comandos indicados por el mismo de la siguiente manera.

```bash
npm install -g @angular/cli
```

> A la fecha está publicada la versión 17 como ultima version del CLI, por lo que para esta parte se utilizará `npm install -g @angular/cli@16.2.10 -g` para instalar la versión anterior de la misma

Esto nos instalará Angular como dependencia global en nuestro dispositivo, por lo que podremos utilizarlo para crear todos los componentes de una manera mas simple.

## Inicio del proyecto

Luego de haber instalado debemos empezar a crear nuestro proyecto, para eso haremos uso del CLI que instalamos, con su respectivo comando.

```bash
ng new nombre-de-la-app
```

## Archivos base

Cuando creamos la app se nos generan diferentes archivos, siendo algunos de los mas importantes.

### index.html

El archivo HTML principal en donde colocaremos la base de nuestro componente, este es el que contiene todo el HTML base para cimentar el resto de la app, pudiendo agregar en este las tags del head.

### main.ts

Es el componente que carga toda la aplicación, en esta se carga todo el resto de aplicación.

### app/app-routing.module.ts

Es el modulo que se encarga de las rutas que utilizaremos en nuestra app.

### app/app.component.ts

Es el componente principal de nuestra app, es el que se importa en el HTML. En este podemos ver organiza un componente simple en Angular.

### app/app.module.ts

Es el archivo que contiene los datos de nuestro módulo principal.

## Organización del código

Angular al ser un framework tiene su propia forma de organizar el código, más allá de los componentes visuales. Esto ayuda a mantener una guía en cuanto a como se tiene que desarrollar el código con Angular.

### Módulos

Un proyecto de Angular se puede dividir en diferentes módulos, es decir, en "partes" que organizan el proyecto las cuales contienen diferentes funcionalidades. Por ejemplo, al tener una tienda que está abierta para el usuario y para los administradores del mismo el proyecto se puede dividir en dos, el módulo de la tienda para los usuarios, y el módulo para que los administradores puedan cargar los productos, esto beneficia a la hora de organizar el proyecto porque ambos lados pueden tener componentes o funcionalidades para los libros, con el mismo nombre, pero realizan funciones diferentes (compra y carga).
Para generar un módulo se utiliza el siguiente comando.

```bash
ng generate module nombre-del-modulo
```

> También es posible utilizar `ng g m nombre-del-modulo` como abreviatura.

### Servicios

Los servicios son porciones de código (lógica) a los que se pueden acceder desde diferentes componentes, pudiendo mantenerse aun cuando el ciclo de vida de los mismos se cumpla. Además, al ser reutilizable, ayudan a que el código sea más ordenado y se evite el código repetido.
Para generar un servicio con el CLI de Angular utilizaremos el siguiente comando.

```bash
ng generate service nombre-del-servicio
```

> También se puede utilizar `ng g s nombre-del-servicio` como abreviatura.

### Componentes

Los componentes, como en React, son porciones de código (mayormente visual, UI) que se utilizan para conformar toda la aplicación. Estos tienen el beneficio de ser reutilizables, además de que sirven para ordenar mejor todo el código de la aplicación de una manera más efectiva y con coherencia.
Para generar un componente con el CLI de Angular utilizaremos el siguiente comando.

```bash
ng generate component nombre-del-modulo
```

> También es posible utilizar `ng g c nombre-del-componente` como abreviatura.

Al generar el componente se crean 4 archivos diferentes

| file                   | description                                             |
| ---------------------- | ------------------------------------------------------- |
| file.component.ts      | Es el archivo que tiene toda la lógica del componente   |
| file.component.html    | Es la plantilla HTML del componente                     |
| file.component.css     | Es el archivo de estilos que afectan a este componente  |
| file.component.spec.ts | Es el archivo para las pruebas unitarias del componente |

### Directivas

Las directivas sirven para agregarle cierto tipo de interacción y funcionalidad extra a ciertos elementos presentes en el DOM de manera declarativa. Angular ya ofrece ciertas directivas, pero también ofrece la opción de crear directivas personalizadas a traves del CLI de la siguiente manera.

```bash
ng generate directive nombre-de-la-directiva
```

> También es posible utilizar `ng g d nombre-de-la-directiva`

### Pipes

Los pipes son filtros que modifican ciertos datos de la vista del usuario sin modificar el dato principal, es decir, sirven puntualmente para mejorar la navegación y del usuario final. Al igual que las directivas, Angular provee ciertos pipes y su forma de generar una pipe personalizada con el CLI.

```bash
ng generate pipe nombre-del-pipe
```

> También es posible utilizar `ng g p nombre-del-pipe`

## Iniciar el servidor

Con esto explicado podemos levantar nuestro servidor para ver la app y los cambios que haremos al mismo, para ello debemos utilizar el paquete que instalamos anteriormente de la siguiente manera.

```bash
ng serve --open
```

> En este caso la flag `--open` nos abrirá directamente el servidor en nuestro navegador predeterminado.

## Modificación de la aplicación

Para empezar a crear nuestra aplicación y ver los cambios podemos empezar modificando el archivo `app.component.html` de la siguiente manera.

```html
<h1>Hola desde Angular</h1>

<!-- <router-outlet />  -->
```

Al mismo podemos agregarle estilos simples en el archivo `app.component.css` de la siguiente manera.

```css
h1 {
  font-size: 1.5rem;
}
```

O globalmente en `styles.css`

```css
:root {
  color-scheme: light dark; /* Generamos un modo oscuro provisional */
}

html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
```

## Binding de datos

Es posible pasarle datos a nuestro HTML, y utilizarlo con `{{}}`. Para ello debemos indicar el mismo en nuestro `app.component.ts` de la siguiente manera.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  framework = "Angular"; // Indicamos el nombre de la variable con su valor
}
```

Y llamamos a la variable en el HTML que pusimos como template de la siguiente manera.

```html
<h1>Hola desde {{ framework }}</h1>

<!-- <router-outlet /> -->
```

> Esta variable se trata como una variable de JS normal, por lo que se pueden utilizar los métodos correspondientes al tipo de valor indicado.

También es posible pasar funciones que modifiquen estos datos. Para hacer esto primero debemos crear un componente con el CLI de Angular [como vimos anteriormente](#componentes). Esto nos generará todos los archivos necesarios para el funcionamiento del mismo en su respectiva carpeta.  
Sumado a esto podemos ver como al crear el componente automáticamente el mismo se importa en nuestro `app.module.ts`, por lo que podemos utilizarlo directamente en el HTML principal (`app.component.html`) de la siguiente manera.

```html
<h1>Hola desde {{ framework }}</h1>
<app-counter />
<!-- Lo importamos como un componente normal con el tag del mismo -->

<!-- <router-outlet /> -->
```

Al tenerlo importado podemos crear los datos que modificaremos en el componente, por lo que el archivo `counter.component.ts` nos quedará de la siguiente manera.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.css"],
})
export class CounterComponent {
  initialValue = 0; // Creamos el valor inicial del contador

  addToCounter = () => {
    this.initialValue = this.initialValue + 1; // Creamos la función que agrega al contador
  };

  subtractFromCounter = () => {
    this.initialValue = this.initialValue - 1; // Creamos la función que resta al contador
  };

  resetCounter = () => {
    this.initialValue = 0; // Y por ultimo creamos la función que reinicia el contador
  };
}
```

Teniendo esto podemos enviar los datos a la plantilla de la siguiente manera.

```html
<div class="counterContainer">
  <div class="counter">
    <button (click)="subtractFromCounter()">-</button>
    <!-- Indicamos que utilizaremos la función al hacer click -->
    <span>{{ initialValue }}</span>
    <!-- Y le pasamos el valor inicial -->
    <button (click)="addToCounter()">+</button>
  </div>
  <button (click)="resetCounter()">Reset</button>
</div>
```

Además de esto podemos aprovechar los estilos de la siguiente manera.

```css
.counterContainer {
  width: fit-content;
  display: flex;
  flex-direction: column;
}

.counter {
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 1em;
  border: 2px solid wheat;
  margin-bottom: 1em;
}

.counter span {
  font-weight: bold;
  padding: 0.5em;
  font-size: 2em;
}

.counter button {
  font-size: 1.5em;
  padding: 0.5em 1em;
}

button {
  background-color: wheat;
  color: #131313;
  border: 2px solid #131313;
  padding-inline: 1.5em;
  padding-block: 0.5em;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: ease all 0.25s;
}

button:hover {
  box-shadow: 5px 5px 0px 0px wheat;
}
```

## Binding de datos entre jerarquías

Es posible pasar datos desde un elemento padre a un elemento hijo y viceversa. Cada una de las formas varia dependiendo desde donde y hacia donde se hace el intercambio de datos.

### Padre - Hijo

Para pasarle un dato de un elemento padre a un elemento hijo se hace a traves de un `@Input`. Para ello debemos crear el componente hijo y configurarla para recibir los datos en el `.ts` de la siguiente manera.

```ts
import { Component, Input } from "@angular/core"; // Importamos el Input

@Component({
  selector: "app-counter-message",
  templateUrl: "./counter-message.component.html",
  styleUrls: ["./counter-message.component.css"],
})
export class CounterMessageComponent {
  @Input() currentValue?: number; // Y lo iniciamos indicando el nombre de la variable junto al tipo de dato
}
```

> También es posible indicar un valor por defecto `@Input currentValue: number = 0`

Con esto hecho debemos ir al HTML del mismo e indicar como lo utilizaremos.

```html
<p>El valor actual del contador es: {{ currentValue }}</p>
```

Por ultimo debemos importarlo en el HTML del padre de la siguiente manera.

```html
<div class="counterContainer">
  <div class="counter">
    <button (click)="subtractFromCounter()">-</button>
    <span>{{ initialValue }}</span>
    <button (click)="addToCounter()">+</button>
  </div>
  <button (click)="resetCounter()">Reset</button>
</div>

<app-counter-message [currentValue]="initialValue"></app-counter-message>
<!-- Indicamos el nombre de la variable en el hijo y el valor del dato que le pasamos -->
```

Al estar pasando un valor que va cambiando al momento que se interactúa en el padre, el mismo se cambiará automáticamente en el hijo gracias a un re-render del mismo.

### Hijo - Padre

Para pasar los datos desde el elemento hijo al elemento padre se utiliza un `@Output`, el cual manejará un evento y devolverá un dato hacia el elemento padre. Para ello debemos empezar creando este output en el elemento hijo de la siguiente manera.

```ts
import { Component, EventEmitter, Input, Output } from "@angular/core"; // Importamos los módulos necesarios

@Component({
  selector: "app-counter-message",
  templateUrl: "./counter-message.component.html",
  styleUrls: ["./counter-message.component.css"],
})
export class CounterMessageComponent {
  @Input() currentValue?: number;

  @Output() resetValueOnCounter = new EventEmitter<number>(); // Creamos el Event Emitter para enviar el valor al padre

  resetValue = 0;

  resetCounter() {
    // Y creamos la función para enviar el dato
    this.resetValueOnCounter.emit(this.resetValue); // Incluyendo el valor que enviaremos
  }
}
```

Hecho esto debemos crear el botón en el HTML que usaremos para tomar el evento de la siguiente manera.

```HTML
<p>El valor actual del contador es: {{ currentValue }}</p>
<button (click)="resetCounter()">Reset</button> <!-- La función emitirá el evento al hacer click -->
```

Con esto hecho podemos modificar el TS del padre para recibir el valor que enviamos desde el evento.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.css"],
})
export class CounterComponent {
  initialValue = 0;

  addToCounter = () => {
    this.initialValue = this.initialValue + 1;
  };

  subtractFromCounter = () => {
    this.initialValue = this.initialValue - 1;
  };

  resetCounter = (newValue: number) => {
    // Indicamos el valor que recibirá como parámetro
    this.initialValue = newValue; // Y lo asignamos como cambio del valor inicial
  };
}
```

Por ultimo debemos cambiar el HTML del padre para tomar el evento que enviamos desde el hijo y que se realizará cuando este se reciba.

```html
<div class="counterContainer">
  <div class="counter">
    <button (click)="subtractFromCounter()">-</button>
    <span>{{ initialValue }}</span>
    <button (click)="addToCounter()">+</button>
  </div>
</div>

<app-counter-message
  [currentValue]="initialValue"
  (resetValueOnCounter)="resetCounter($event)"
></app-counter-message>
<!-- Indicamos que evento tomaremos desde el hijo, y que función realizará el padre, tomando el valor que devuelve el mismo evento -->
```

### Misma jerarquía

Para compartir datos entre componentes de la misma jerarquía será necesario utilizar un Service, por lo que debemos [crear un servicio como lo vimos anteriormente](#servicios), en el cual declararemos lo que utilizaremos de la siguiente manera.

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ActualTimeService {
  actualTime?: Date; // Creamos el dato principal

  getActualTime(): Date | undefined {
    // El método para obtener el dato guardado
    return this.actualTime;
  }

  setActualTime(newDate: Date): void {
    // El método para actualizar el dato con el valor que le indiquemos
    this.actualTime = newDate;
  }

  formatTime(currentDate: Date | undefined): string {
    // El método que nos transformará el valor del dato
    if (!currentDate) {
      return "No data to format";
    }
    const formattedDate = currentDate.toLocaleString();
    return formattedDate;
  }

  showOnConsole(message: any): void {
    // Y por último un método para mostrar algo en consola
    console.log(message);
  }

  constructor() {}
}
```

Con esto hecho podemos ir a cualquiera de nuestros componentes e inyectar el mismo en el componente que vayamos a utilizar, en este caso empezaremos por el componente `app.component.ts` de la siguiente manera.

```ts
import { Component, inject, OnInit } from "@angular/core"; // Importamos los métodos necesarios
import { ActualTimeService } from "./actual-time.service"; // Y el servicio que utilizaremos

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  // Indicamos que utilizaremos el método OnInit
  framework = "Angular";
  currentTimeFromService?: string | undefined; // Creamos el valor para guardar el tiempo actual

  private _actualTimeService = inject(ActualTimeService); // Inyectamos el servicio que creamos anteriormente

  ngOnInit() {
    this._actualTimeService.setActualTime(new Date()); // Indicamos que tomaremos el tiempo en el que se creó el componente en el servicio
    this.currentTimeFromService = this._actualTimeService.formatTime(
      this._actualTimeService.getActualTime(),
    ); // Y lo formateamos para guardarlo en el componente
  }
}
```

> `OnInit` indica que el componente hará algo al iniciarse

Luego de esto mostramos el resultado en el HTML del componente principal.

```html
<h1>Hola desde {{ framework }}</h1>
<h2>La fecha actual es {{ currentTimeFromService }}</h2>
<!-- Mostramos el valor en el componente -->
<app-counter />
<!-- <router-outlet /> -->
```

Y para mostrar que el mismo funciona en diferentes componentes independientemente de su jerarquía podemos ir al componente `counter-message` y creamos una función para utilizar el método que muestra un dato en consola.

```ts
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { ActualTimeService } from "../actual-time.service";

@Component({
  selector: "app-counter-message",
  templateUrl: "./counter-message.component.html",
  styleUrls: ["./counter-message.component.css"],
})
export class CounterMessageComponent {
  @Input() currentValue?: number;
  @Output() resetValueOnCounter = new EventEmitter<number>();

  resetValue = 0;

  private _actualTimeService = inject(ActualTimeService);

  resetCounter() {
    this.resetValueOnCounter.emit(this.resetValue);
  }

  showMessage(): void {
    // Creamos la función
    this._actualTimeService.showOnConsole(
      this._actualTimeService.getActualTime(),
    ); // Y tomamos el método que muestra en consola lo que le pasemos como parámetro
  }
}
```

Y creamos el botón para el mismo en su respectiva plantilla de la siguiente manera.

```html
<p>El valor actual del contador es: {{ currentValue }}</p>
<button (click)="resetCounter()">Reset counter</button>
<button (click)="showMessage()">Look at the console</button>
<!-- Creamos el botón para llamar a la función que creamos anteriormente -->
```

## Formato para usuarios

Hay diferentes maneras de formatear los datos para mejorar la experiencia del usuario, como vimos anteriormente podemos hacerlo manualmente a traves de una función creada por nosotros, pero también podemos utilizar [directivas](#directivas) o [pipes](#pipes).
Para comenzar con esto crearemos un nuevo componente que tendrá datos en forma de strings para aplicar el formato de la siguiente manera.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-directives-and-pipes",
  templateUrl: "./directives-and-pipes.component.html",
  styleUrls: ["./directives-and-pipes.component.css"],
})
export class DirectivesAndPipesComponent {
  dataWithoutDirective = "No tiene directiva";
  dataWithDirective = "Este tiene directiva aplicada";
  // **************************************************** //
  dataWithoutPipe = "No tiene pipe";
  dataWithCustomPipe = "Tiene pipe";
  dataWithUpperDirective = "Tiene directiva desde Angular";
  dataWithLowerCase = "Tiene directiva desde Angular";
  dataCurrentDateWithPipe = new Date();
  dataCurrencyWithPipe = 1000.5;
  dataDecimalWithPipe = Math.PI;
  dataPercentageWithPipe = 0.5;
}
```

Hecho esto modificamos el HTML para mostrar los datos.

```html
<div>
  <h1>Directivas</h1>
  <ul>
    <li>{{ dataWithoutDirective }}</li>
    <li>{{ dataWithDirective }}</li>
  </ul>

  <h1>Pipes</h1>
  <ul>
    <li>{{ dataWithoutPipe }}</li>
    <li>{{ dataWithCustomPipe }}</li>
    <li>{{ dataWithUpperDirective }}</li>
    <li>{{ dataWithLowerCase }}</li>
    <li>{{ dataCurrentDateWithPipe }}</li>
    <li>{{ dataCurrencyWithPipe }}</li>
    <li>{{ dataDecimalWithPipe }}</li>
    <li>{{ dataPercentageWithPipe }}</li>
  </ul>
</div>
```

Le agregamos CSS.

```css
ul {
  list-style-type: none;
  font-weight: bold;
  color: #131313;
  line-height: 1.5em;
  background-color: wheat;
  border-radius: 0.5em;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 2px solid #131313;
  width: fit-content;
}

ul li {
  padding: 0.5em;
}
```

Y lo importamos al final de nuestro componente principal.

```html
<h1>Hola desde {{ framework }}</h1>
<h2>La fecha actual es {{ currentTimeFromService }}</h2>
<app-counter />
<app-directives-and-pipes />
<!-- <router-outlet /> -->
```

### Formato - Directivas

Como vimos anteriormente, podemos crear una directiva para cambiar cierta propiedad de un componente, en este caso lo usaremos para cambiar el fondo del dato que indica el uso de una directiva de la siguiente manera.

```ts
import { Directive, ElementRef } from "@angular/core"; // Importamos el módulo para tomar la referencia

@Directive({
  selector: "[appCustomDirective]",
})
export class CustomDirectiveDirective {
  constructor(private elementForDirective: ElementRef) {
    // Le pasamos el elemento como parámetro
    elementForDirective.nativeElement.style.color = "#9025e0"; // E indicamos que cambiaremos el color del mismo
  }
}
```

Por ultimo debemos indicar la directiva en el HTML de la siguiente manera.

```html
<div>
  <h1>Directivas</h1>
  <ul>
    <li>{{ dataWithoutDirective }}</li>
    <li appCustomDirective>{{ dataWithDirective }}</li>
    <!-- La directiva se aplica directamente en el tag del elemento -->
  </ul>

  <h1>Pipes</h1>
  <ul>
    <li>{{ dataWithoutPipe }}</li>
    <li>{{ dataWithCustomPipe }}</li>
    <li>{{ dataWithUpperDirective }}</li>
    <li>{{ dataWithLowerCase }}</li>
    <li>{{ dataCurrentDateWithPipe }}</li>
    <li>{{ dataCurrencyWithPipe }}</li>
    <li>{{ dataDecimalWithPipe }}</li>
    <li>{{ dataPercentageWithPipe }}</li>
  </ul>
</div>
```

### Formato - Pipes

Otra manera de crear formatos para los usuarios es utilizar un pipe personalizado o creado por Angular, por lo que podemos empezar creando un pipe para mostrar los datos del valor invertido.

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customPipe",
})
export class CustomPipePipe implements PipeTransform {
  transform(value: string): string {
    // Indicamos que valor toma y que valor devuelve
    return value.split("").reverse().join(); // Y lo modificamos
  }
}
```

Y por ultimo lo aplicamos a nuestro HTML, además de aplicar otras directivas que vienen por parte de Angular de la siguiente manera.

```html
<div>
  <h1>Directivas</h1>
  <ul>
    <li>{{ dataWithoutDirective }}</li>
    <li appCustomDirective>{{ dataWithDirective }}</li>
  </ul>

  <h1>Pipes</h1>
  <ul>
    <li>{{ dataWithoutPipe }}</li>
    <li>{{ dataWithCustomPipe | customPipe }}</li>
    <!-- Indicamos nuestro pipe personalizado después de un | -->
    <li>{{ dataWithUpperDirective | uppercase }}</li>
    <!-- Indicamos que se transforme en mayúsculas -->
    <li>{{ dataWithLowerCase | lowercase }}</li>
    <!-- Indicamos que se transforme en minúsculas -->
    <li>{{ dataCurrentDateWithPipe | date : "dd / MM / yy" }}</li>
    <!-- Indicamos el formato de la fecha -->
    <li>{{ dataCurrencyWithPipe | currency : "CAD" }}</li>
    <!-- Indicamos el formato de la moneda -->
    <li>{{ dataDecimalWithPipe | number : "1.2-2" }}</li>
    <!-- Indicamos el formato de los decimales -->
    <li>{{ dataPercentageWithPipe | percent }}</li>
    <!-- Indicamos el formato de los porcentajes -->
  </ul>
</div>
```

## Instalación de paquetes externos

Angular nos permite trabajar con diferentes módulos externos, no solamente los que vienen incluidos en el mismo o los que nosotros creamos con anterioridad, es decir que podemos instalar diferentes paquetes externos que nos ayuden con la creación de nuestra aplicación. Para este ejemplo crearemos una aplicación nueva a la que instalaremos el paquete de [Daisy UI](https://daisyui.com/), el cual nos ayuda con la creación de componentes estilizados y además utiliza [Tailwind](https://tailwindcss.com/) por debajo del mismo.

> Para este caso utilizaremos pnpm como package manager, por lo que el comando para crear el nuevo proyecto es `ng new nombre-de-la-app --package-manager=pnpm`.

Para empezar con esto en el nuevo proyecto que creamos debemos instalar primeramente Tailwind entrando en el proyecto y luego haciendo uso del siguiente comando.

```bash
pnpm add -D tailwindcss postcss autoprefixer
```

E iniciamos la configuración de Tailwind con el siguiente comando.

```bash
pnpm dlx tailwindcss init
```

Al crearse el archivo de configuración debemos agregar los estilos de Tailwind en el archivo `tailwind.config.js` de la siguiente manera.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Y las directivas de CSS al archivo de CSS global de la siguiente manera.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Con esto hecho podemos continuar con la instalación de Daisy UI con el siguiente comando.

```bash
pnpm add -D daisyui@latest
```

Y agregamos el plugin `daisyui` a la configuración de Tailwind (`tailwind.config.js`).

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
```

Con esto hecho tendremos configurado la aplicación con Tailwind y Daisy UI. Para probar su correcto funcionamiento podemos agregar un [tema personalizado](https://daisyui.com/docs/themes/) al mismo en el archivo de configuración de Tailwind.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["synthwave"],
  },
};
```

Y luego lo activamos en el HTML de la siguiente manera.

```html
<!doctype html>
<html lang="en" data-theme="synthwave">
  <!-- Lo agregamos como un data attribute -->
  <head>
    <meta charset="utf-8" />
    <title>Angular with DaisyUI</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

## Routing

Al crear una aplicación con diferentes páginas será necesario conectar las mismas a la página principal dando a cada una su ruta correspondiente. Esto se maneja en Angular a traves del routing que proporciona el mismo al crearse el proyecto. Para empezar con este podemos crear una barra de navegación (gracias a Daisy UI) en el HTML principal de la siguiente manera.

```html
<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a>Home</a></li>
      <li><a>About</a></li>
      <li><a>FAQ</a></li>
      <li><a>Books</a></li>
      <li><a>Contact</a></li>
    </ul>
  </div>
</div>

<router-outlet></router-outlet>
```

Con esto hecho podemos crear 4 componentes diferentes, el componente `about`, `faq`, `books`, `book-detail` y `contact` como vimos anteriormente, lo que nos dará la posibilidad de generar las rutas. Para esto necesitaremos crear las rutas con su respectivo componente en el archivo llamado `app-routing.module.ts` de la siguiente manera.

```ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component"; // Importamos los componentes que utilizaremos
import { FaqComponent } from "./faq/faq.component";
import { BooksComponent } from "./books/books.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";
import { ContactComponent } from "./contact/contact.component";

const routes: Routes = [
  { path: "about", component: AboutComponent }, // Y creamos la ruta para cada uno de los componentes
  {
    path: "faq",
    component: FaqComponent,
  },
  {
    path: "books",
    component: BooksComponent,
  },
  {
    path: "books/:id", // Incluyendo su respectivo parámetro en la ruta para los detalles
    component: BookDetailComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  { path: "**", redirectTo: "" }, // Y por ultimo creamos la redirección para cuando no exista una ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Y cambiamos las rutas en el navbar, quedando el mismo de la siguiente manera.

```html
<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a routerLink="">Home</a></li>
      <!-- Agregamos la ruta con el método `routerLink` -->
      <li><a routerLink="about">About</a></li>
      <li><a routerLink="faq">FAQ</a></li>
      <li><a routerLink="books">Books</a></li>
      <li><a routerLink="contact">Contact</a></li>
    </ul>
  </div>
</div>

<router-outlet></router-outlet>
```

Para seguir con la ruta podemos generar diferentes cards para mostrar los libros en el componente `books`, para lo que necesitaremos un array con todos los libros. Para ello podemos crear un Service en el que tendremos los datos del libro junto a sus getters de la siguiente manera.

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BooksStoreService {
  books: bookInfo[] = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      id: "c72fd84e-92c0-4c67-982d-bb39bc883158",
      isAvailable: true,
      stars: 4.5,
      price: 12.99,
      image:
        "https://i.insider.com/518296d969beddd06d000001?width=640&format=jpeg",
      description:
        "A novel by F. Scott Fitzgerald about the American Dream and the Roaring Twenties.",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      id: "3e01f4b7-47f4-4e5d-b9e4-5b6c6d4be98b",
      isAvailable: true,
      stars: 4.8,
      price: 10.49,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/1200px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
      description:
        "Harper Lee's classic novel depicting racial injustice in the American South during the 1930s.",
    },
    {
      title: "1984",
      author: "George Orwell",
      id: "d2e4d5fb-bf95-4c2a-9823-63a7b91468c3",
      isAvailable: true,
      stars: 4.7,
      price: 9.99,
      image: "https://images.booksense.com/images/333/869/9781328869333.jpg",
      description:
        "George Orwell's dystopian novel exploring themes of totalitarianism, surveillance, and propaganda.",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      id: "eccfa6b9-9a68-4a71-9e01-28eb18969f58",
      isAvailable: false,
      stars: 4.6,
      price: 11.79,
      image:
        "https://images.squarespace-cdn.com/content/v1/58c180edff7c50dd0e51a2ad/1596042032039-IN7LLXRVDKGVC854LVHE/9780241375273.jpg",
      description:
        "Jane Austen's romantic novel set in rural England, focusing on themes of marriage, love, and social status.",
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      id: "08d05f0b-8b3a-4e09-8aa3-7d2bb2493b6a",
      isAvailable: true,
      stars: 4.4,
      price: 13.29,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/640px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
      description:
        "J.D. Salinger's coming-of-age novel narrated by Holden Caulfield, a disillusioned teenager.",
    },
    {
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      id: "d3274cfc-70f2-4138-b18c-5c2124f73e3a",
      isAvailable: false,
      stars: 4.9,
      price: 15.99,
      image:
        "https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF894,1000_QL80_.jpg",
      description:
        "The first book in J.K. Rowling's Harry Potter series, following the young wizard Harry Potter's journey at Hogwarts School of Witchcraft and Wizardry.",
    },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      id: "dfc02b6b-dc4e-4b10-92f0-dbd3d090df49",
      isAvailable: true,
      stars: 4.9,
      price: 18.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoyUcnImygY3h7UcHQaUs1J5NXgEEpdpIio7B5kSdicg&s",
      description:
        "J.R.R. Tolkien's epic fantasy novel set in the fictional world of Middle-earth, chronicling the quest to destroy the One Ring.",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      id: "bfb04d5e-0b0f-4b6a-a932-408af1783275",
      isAvailable: true,
      stars: 4.7,
      price: 14.99,
      image:
        "https://i.pinimg.com/originals/27/cf/91/27cf91f605923223613909c7b9d2219f.jpg",
      description:
        "J.R.R. Tolkien's classic children's novel following the journey of Bilbo Baggins, a hobbit, as he sets out on an adventure to reclaim the Lonely Mountain.",
    },
    {
      title: "The Da Vinci Code",
      author: "Dan Brown",
      id: "7c0a8a8f-7927-40cb-86d0-6803a16a44a1",
      isAvailable: true,
      stars: 4.3,
      price: 12.49,
      image: "https://images.penguinrandomhouse.com/cover/9780307277671",
      description:
        "Dan Brown's thriller novel featuring symbologist Robert Langdon, who investigates a murder in the Louvre Museum and discovers a series of clues leading to a secret society.",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      id: "f8e4ad0d-8f94-4b59-97d4-4e32dfc3f4f0",
      isAvailable: true,
      stars: 4.8,
      price: 11.99,
      image:
        "https://m.media-amazon.com/images/I/81FPzmB5fgL._AC_UF1000,1000_QL80_.jpg",
      description:
        "Paulo Coelho's allegorical novel following Santiago, an Andalusian shepherd boy, on his journey to find a hidden treasure in Egypt.",
    },
    {
      title: "The Hunger Games",
      author: "Suzanne Collins",
      id: "fa3ab56c-ee17-4844-9e7d-ee6d3816df55",
      isAvailable: true,
      stars: 4.6,
      price: 9.99,
      image:
        "https://m.media-amazon.com/images/I/71un2hI4mcL._AC_UF1000,1000_QL80_.jpg",
      description:
        "Suzanne Collins' dystopian novel set in a post-apocalyptic nation where children are forced to participate in a televised fight to the death.",
    },
    {
      title: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
      id: "52c4dd4b-9b3a-4a5e-884a-854b168f201a",
      isAvailable: true,
      stars: 4.4,
      price: 14.29,
      image:
        "https://m.media-amazon.com/images/I/61Qs-hoZ-TL._AC_UF1000,1000_QL80_.jpg",
      description:
        "Stieg Larsson's mystery thriller novel featuring journalist Mikael Blomkvist and hacker Lisbeth Salander as they investigate a decades-old disappearance.",
    },

    {
      title: "The Help",
      author: "Kathryn Stockett",
      id: "fce96c58-9208-4d14-a11b-697934924118",
      isAvailable: true,
      stars: 4.7,
      price: 12.99,
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1622355533i/4667024.jpg",
      description:
        "Kathryn Stockett's novel set in 1960s Mississippi, exploring the relationships between African-American maids and their white employers during the Civil Rights Movement.",
    },
  ];

  getAllBooks() {
    return this.books;
  }

  getBookById(id: string) {
    return this.books.find((book) => book.id === id);
  }

  constructor() {}
}
```

> En este caso el tipo `bookInfo` es un objeto con las propiedades de cada libro declarado en el archivo `types/types.d.ts`.

Teniendo el Service generado podemos llamarlo en el ts del componente books de la siguiente manera.

```ts
import { Component, OnInit, inject } from "@angular/core"; // Importamos los módulos necesarios
import { BooksStoreService } from "../books-store.service"; // Y el servicio

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit {
  books: {
    title: string;
    description: string;
    author: string;
    stars: number;
    price: number;
    image: string;
    id: string;
  }[] = []; // Creamos el array de libros vacío

  private _booksService = inject(BooksStoreService); // Inyectamos el servicio en el componente

  ngOnInit(): void {
    this.books = this._booksService.getAllBooks(); // Y le pasamos los datos al array
  }
}
```

Y con esto hecho podemos renderizar los mismos en el HTML de la siguiente manera.

```html
<div class="flex flex-wrap items-center justify-center gap-4">
  <div
    class="card bg-base-100 size-96 shadow-xl"
    *ngFor="let bookDetails of books"
  >
    <!-- utilizamos ngFor="" para recorrer el array -->
    <figure>
      <img
        src="{{ bookDetails.image }}"
        alt="{{ bookDetails.title }}"
        class="h-48 w-full object-cover"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ bookDetails.title }}</h2>
      <p class="line-clamp-2">{{ bookDetails.description }}</p>
      <div class="card-actions justify-end">
        <a class="btn btn-primary" [routerLink]="['/books', bookDetails.id]"
          >See more</a
        >
        <!-- Indicamos que iremos a la ruta con el id generado automáticamente con los datos del libro -->
      </div>
    </div>
  </div>
</div>
```

Teniendo esto podemos ir al componente de los detalles para recibir los datos del id que recibimos por el parámetro para renderizar el contenido del libro de la siguiente manera.

```ts
import { Component, OnInit, inject } from "@angular/core";
import { BooksStoreService } from "../books-store.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.css"],
})
export class BookDetailComponent implements OnInit {
  bookDetails?: bookInfo; // Declaramos el valor para los datos del libro
  bookID: string = ""; // Y el ID del libro que extraemos de la ruta

  private _booksService = inject(BooksStoreService); // Inyectamos el servicio que guarda los libros

  constructor(private _route: ActivatedRoute) {} // Llamamos al constructor para tomar los datos de la ruta

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      // Y lo recuperamos desde los parámetros
      this.bookID = params["id"]; // Guardándolo como el ID
    });
    this.bookDetails = this._booksService.getBookById(this.bookID); // Y con el mismo ID extraemos los datos del libro
  }
}
```

Por ultimo crearemos un template simple para mostrar los datos en el HTML de la siguiente manera.

```html
<div class="mx-auto my-8 w-3/4 bg-slate-700">
  <div class="flex">
    <picture>
      <img src="{{ bookDetails?.image }}" alt="{{ bookDetails?.title }}" />
    </picture>

    <div class="flex flex-col justify-between p-8">
      <div>
        <h1 class="text-3xl font-bold">{{ bookDetails?.title }}</h1>
        <small class="text-sm">{{ bookDetails?.author }}</small>
        <p class="mt-4 text-balance">{{ bookDetails?.description }}</p>
      </div>
      <div class="flex justify-between">
        <span>Rating: {{ bookDetails?.stars }}/5</span>
        <span class="text-xl font-bold"
          >{{ bookDetails?.price | currency }}</span
        >
      </div>
    </div>
  </div>
</div>
```

## Estructuras de control

Como vimos anteriormente, gracias a `ngFor` pudimos recorrer el array de libros y mostrar cards con los datos de cada uno de ellos, pero eso no es lo único que se puede hacer para controlar el render de los componentes.

### ngIf else

Es posible renderizar una porción de código unicamente si se cumple una condición puntual, en este caso podemos tomar el ejemplo que tenemos de la disponibilidad de los libros y mostrarlo en el botón de la siguiente manera.

```html
<div class="flex flex-wrap items-center justify-center gap-4">
  <div
    class="card bg-base-100 size-96 shadow-xl"
    *ngFor="let bookDetails of books"
  >
    <figure>
      <img
        src="{{ bookDetails.image }}"
        alt="{{ bookDetails.title }}"
        class="h-48 w-full object-cover"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ bookDetails.title }}</h2>
      <p class="line-clamp-2">{{ bookDetails.description }}</p>
      <div class="card-actions justify-end">
        <a
          class="btn btn-primary"
          [routerLink]="['/books', bookDetails.id]"
          *ngIf="bookDetails.isAvailable; else elseComponent"
          >See more
          <!-- Indicamos que se mostrará este componente cuando está disponible, sino mostramos el template indicado en el else -->
        </a>
        <ng-template #elseComponent>
          <!-- Creamos el template para renderizar cuando la condición no se cumple -->
          <span
            class="btn btn-error cursor-default"
            *ngIf="!bookDetails.isAvailable"
          >
            Not Available
          </span>
        </ng-template>
      </div>
    </div>
  </div>
</div>
```

### ngClass / ngStyle

De la forma que podemos renderizar bloques de código cuando se cumple una condición, también podemos renderizar ciertas clases cuando esto sucede, para ello utilizamos `ngClass` (o `ngStyle` en caso de ser necesario solamente cambiar los valores de los estilos). Para probar esto podemos cambiar la opacidad del card dependiendo de su disponibilidad de la siguiente manera.

```html
<div class="flex flex-wrap items-center justify-center gap-4">
  <div
    class="card bg-base-100 size-96 shadow-xl"
    *ngFor="let bookDetails of books"
    [ngClass]="{ 'opacity-50': !bookDetails.isAvailable }"
  >
    <!-- utilizamos `ngClass` para renderizar la clase unicamente si no se cumple la condición -->
    <figure>
      <img
        src="{{ bookDetails.image }}"
        alt="{{ bookDetails.title }}"
        class="h-48 w-full object-cover"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ bookDetails.title }}</h2>
      <p class="line-clamp-2">{{ bookDetails.description }}</p>
      <div class="card-actions justify-end">
        <a
          class="btn btn-primary"
          [routerLink]="['/books', bookDetails.id]"
          *ngIf="bookDetails.isAvailable; else elseComponent"
          >See more
        </a>
        <ng-template #elseComponent>
          <span
            class="btn btn-error cursor-default"
            *ngIf="!bookDetails.isAvailable"
          >
            Not Available
          </span>
        </ng-template>
      </div>
    </div>
  </div>
</div>
```

## NgContainer

El `ngContainer` nos permite renderizar el contenido de un componente sin necesidad de crear un elemento de etiqueta HTML, por lo que no afecta al DOM de la aplicación, simplemente es una forma de organizar el código (algo parecido a lo que hacen los `<></>` en React). Para esto podemos forzar a esperar cierto tiempo para que el componente tome los datos de los libros utilizando un timeout en el ts de los libros de la siguiente manera.

```ts
import { Component, OnInit, inject } from "@angular/core";
import { BooksStoreService } from "../books-store.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit {
  books: bookInfo[] = [];
  isLoading: boolean = true; // Creamos el estado de carga de la aplicación

  private _booksService = inject(BooksStoreService);

  ngOnInit(): void {
    this.books = this._booksService.getAllBooks();

    setTimeout(() => {
      // Y lo cambiamos con un timeout de 1.5 segundos
      this.isLoading = false;
    }, 1500);
  }
}
```

Con esto configurado podemos modificar el componente de la siguiente manera.

```html
<ng-container *ngIf="isLoading">
  <!-- Creamos un container que se renderiza unicamente cuando el componente está cargando -->
  <div class="flex h-full items-center justify-center">
    <span class="animate-pulse">Loading...</span>
  </div>
</ng-container>

<ng-container *ngIf="!isLoading">
  <!-- Hasta que cambia el estado, por lo que renderiza este componente con los datos -->
  <div class="flex flex-wrap items-center justify-center gap-4">
    <div
      class="card bg-base-100 size-96 shadow-xl"
      *ngFor="let bookDetails of books"
      [ngClass]="{ 'opacity-50': !bookDetails.isAvailable }"
    >
      <figure>
        <img
          src="{{ bookDetails.image }}"
          alt="{{ bookDetails.title }}"
          class="h-48 w-full object-cover"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ bookDetails.title }}</h2>
        <p class="line-clamp-2">{{ bookDetails.description }}</p>
        <div class="card-actions justify-end">
          <a
            class="btn btn-primary"
            [routerLink]="['/books', bookDetails.id]"
            *ngIf="bookDetails.isAvailable; else elseComponent"
            >See more
          </a>
          <ng-template #elseComponent>
            <span
              class="btn btn-error cursor-default"
              *ngIf="!bookDetails.isAvailable"
            >
              Not Available
            </span>
          </ng-template>
        </div>
      </div>
    </div>
  </div>
</ng-container>
```

## Formularios

Angular tiene dos formas para manejar los formularios, la forma basada en templates (`template-driven`) y la forma reactiva (`reactive`). Cada uno de ellos tiene su sintaxis y forma de aplicación particular.

### Formularios template-driven

Esta forma de manejar los formularios se basa en crear un HTML en el que se manejen los datos y el submit de la misma. Es una forma más cerca de los formularios clasicos de HTML, por lo que es mas intuitiva en cuanto a su aplicación. Para comenzar con este debemos importar `FormsModule` en el archivo principal de Angular (`app.module.ts`) de la siguiente manera.

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms"; // Importamos el módulo necesario para el manejo de formularios

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./about/about.component";
import { FaqComponent } from "./faq/faq.component";
import { BooksComponent } from "./books/books.component";
import { ContactComponent } from "./contact/contact.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FaqComponent,
    BooksComponent,
    ContactComponent,
    BookDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule], // Y lo indicamos en los imports
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Hecho esto podemos ir a nuestro componente de contacto y generar un formulario base con los datos que necesitaremos del usuario de la siguiente manera.

```html
<div class="container mx-auto mt-20 max-w-md">
  <form class="form form-gap" #contactForm="ngForm" (ngSubmit)="handleSubmit()">
    <!-- Creamos el form incluyendo el ngForm y la función para enviar el formulario -->
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input
        type="text"
        name="name"
        id="name"
        [(ngModel)]="user.name"
        class="input input-bordered"
        placeholder="Name"
        required
      />
      <!-- Asignamos el nombre de la propiedad asociada en el objeto del usuario que utilizaremos para guardar los datos en el ngModel -->
    </div>

    <div class="form-control mt-4 w-full max-w-xs">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        [(ngModel)]="user.email"
        placeholder="Email"
        class="input input-bordered"
        required
      />
    </div>

    <div class="form-control mt-4 w-full max-w-xs">
      <label class="label">
        <span class="label-text">Message</span>
      </label>
      <textarea
        name="message"
        id="message"
        [(ngModel)]="user.message"
        class="textarea textarea-bordered h-24"
        placeholder="Message"
        required
      ></textarea>
    </div>

    <div class="mt-4">
      <button class="btn btn-primary" type="submit">Send</button>
    </div>
  </form>
</div>
```

> Uno de los errores/problemas que se pueden encontrar con este formulario es que debe ser definido como `standalone`, para ello se puede sacar el formulario en otro componente o agregar `[ngModelOptions]="{standalone: true}"` en cada uno de los inputs que contienen `[(ngModel)]`.

Y luego de esto debemos generar en el ts los datos que tomaremos desde el formulario, incluyendo la función de submit del mismo.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent {
  public user = {
    // Creamos el objeto del usuario
    name: "",
    email: "",
    message: "",
  };

  handleSubmit() {
    // Y creamos la función para enviar el formulario
    console.log(this.user);
  }
}
```

### Formularios reactivos

La forma más utilizada para generar formularios es la forma reactiva. Esta se basa en generar los datos y comprobaciones directamente en el archivo ts del componente. Para ello debemos importar el modulo necesario en el archivo principal de Angular (`app.module.ts`) de la siguiente manera.

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms"; // Importamos el módulo necesario para el manejo de formularios

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./about/about.component";
import { FaqComponent } from "./faq/faq.component";
import { BooksComponent } from "./books/books.component";
import { ContactComponent } from "./contact/contact.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FaqComponent,
    BooksComponent,
    ContactComponent,
    BookDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule], // Incluimos el módulo para su uso
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Hecho esto podemos modificar nuestro archivo ts para generar el formulario con sus respectivas validaciones.

```ts
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms"; // Importamos los modulos necesarios para manejar el formulario

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent {
  contactForm: FormGroup; // Creamos el grupo del formulario

  constructor(private form: FormBuilder) {
    // Y su constructor
    this.contactForm = this.form.group({
      name: ["", Validators.required], // Iniciando el valor vacío pero indicando que será requerido
      email: ["", [Validators.email, Validators.required]], // También podemos pasar varios validadores dentro de un array
      message: ["", Validators.required],
    });
  }

  handleSubmit() {
    console.log(this.contactForm.value); // Y creamos la función que se ejecuta al enviar el formulario
  }

  hasError(controlName: string, errorName: string) {
    // Creamos el validador de errores con los valores del formulario como parámetros
    return (
      this.contactForm.get(controlName)?.hasError(errorName) &&
      this.contactForm.get(controlName)?.touched
    ); // Y devolvemos un boolean si el error existe
  }
}
```

Y luego debemos editar nuestro HTML con los controladores y los errores de la siguiente manera.

```html
<div class="container mx-auto mt-20 max-w-md">
  <form
    class="form form-gap"
    [formGroup]="contactForm"
    (ngSubmit)="handleSubmit()"
  >
    <!-- Agregamos el nombre del grupo al [formGroup] -->
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input
        type="text"
        name="name"
        id="name"
        formControlName="name"
        class="input input-bordered"
        placeholder="Name"
        [ngClass]="{ 'input-error': hasError('name', 'required') }"
        required
      />
      <!-- 
        Agregamos le nombre que asignamos en el ts al objeto dentro de la propiedad formControlName,
        además agregamos el [ngClass]="{ 'input-error': hasError('name', 'required') }" para indicar que se muestre el estilo unicamente cuando el error exista
      -->
      <small class="text-red-400" *ngIf="hasError('name', 'required')"
        >The name is required</small
      >
      <!-- Y agregamos el mensaje de error solamente si existe el error -->
    </div>

    <div class="form-control mt-4 w-full max-w-xs">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        formControlName="email"
        placeholder="Email"
        class="input input-bordered"
        [ngClass]="{
          'input-error':
            hasError('email', 'required') || hasError('email', 'email')
        }"
        required
      />
      <small class="text-red-400" *ngIf="hasError('email', 'required')"
        >The email is required</small
      >
      <small class="text-red-400" *ngIf="hasError('email', 'email')"
        >The email is invalid</small
      >
    </div>

    <div class="form-control mt-4 w-full max-w-xs">
      <label class="label">
        <span class="label-text">Message</span>
      </label>
      <textarea
        name="message"
        id="message"
        formControlName="message"
        placeholder="Message"
        class="textarea textarea-bordered h-24"
        [ngClass]="{ 'textarea-error': hasError('message', 'required') }"
        required
      ></textarea>
      <small class="text-red-400" *ngIf="hasError('message', 'required')"
        >The message is required</small
      >
    </div>

    <div class="mt-4">
      <button class="btn btn-primary" type="submit">Send</button>
    </div>
  </form>
</div>
```

Hay veces que queremos indicar un valor por defecto que viene desde una base de datos o deasde otro archivo, esto se puede hacer gracias a la propiedad `patchValue` del formulario de la siguiente manera.

```ts
import { Component, OnInit } from "@angular/core"; // Importamos el módulo OnInit
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  // Y lo implementamos
  contactForm: FormGroup;
  userDataFromDB = {
    email: "IiG7a@example.com", // Creamos el dato para el formulario
  };

  constructor(private form: FormBuilder) {
    this.contactForm = this.form.group({
      name: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      message: ["", Validators.required],
    });
  }

  handleSubmit() {
    console.log(this.contactForm.value);
  }

  hasError(controlName: string, errorName: string) {
    return (
      this.contactForm.get(controlName)?.hasError(errorName) &&
      this.contactForm.get(controlName)?.touched
    );
  }

  ngOnInit(): void {
    this.contactForm.patchValue({
      // Y cambiamos el valor al renderizar el componente
      email: this.userDataFromDB.email,
    });

    this.contactForm.get("email")?.disable(); // Ademas de deshabilitar el campo del email
  }
}
```

> Tambien es posible utilizar `this.contactForm.get('email')?.setValue(this.userDataFromDB.email)` para cambiar el valor del input.

Y por ultimo podemos suscribirnos a un input para ver los cambios en el mismo. Esto será importante cuando debamos cambiar algo de un componente a medida que el valor del mismo cambie.

```ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  userDataFromDB = {
    email: "IiG7a@example.com",
  };

  constructor(private form: FormBuilder) {
    this.contactForm = this.form.group({
      name: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      message: ["", Validators.required],
    });
  }

  handleSubmit() {
    console.log(this.contactForm.value);
  }

  hasError(controlName: string, errorName: string) {
    return (
      this.contactForm.get(controlName)?.hasError(errorName) &&
      this.contactForm.get(controlName)?.touched
    );
  }

  ngOnInit(): void {
    this.contactForm.patchValue({
      email: this.userDataFromDB.email,
    });

    this.contactForm.get("email")?.disable();

    this.contactForm.valueChanges.subscribe((value) => {
      // Indicamos la vista de los cambios del valor
      console.log(value); // Y que se realizarán con los mismos
    });
  }
}
```

## Ciclos de vida

Los componentes, como vimos anteriormente, tienen ciclos de vida, es decir, se puede ver cuando un componente se "inicia" o cuando se "destruye", y realizar diferentes funciones en base a cada uno de ellos.

### OnInit

Este es el primer ciclo de vida, cuando el componente se renderiza, siendo este el que se ejecuta la primera vez que se inicia el componente. Vimos algunos ejemplos de este ciclo de vida en los [formularios reactivos](#formularios-reactivos).

### OnDestroy

Es el ultimo ciclo de vida del componente, que se activa cuando el mismo se destruye. Para probar esto podemos utilizarlo en el componente de contacto como veniamos haciendo anteriormente de la siguiente manera.

```ts
import { Component, OnDestroy, OnInit } from "@angular/core"; // Importamos desde el core de Angular
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit, OnDestroy {
  // Lo implementamos en el componente
  contactForm: FormGroup;
  userDataFromDB = {
    email: "IiG7a@example.com",
  };

  constructor(private form: FormBuilder) {
    this.contactForm = this.form.group({
      name: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      message: ["", Validators.required],
    });
  }

  handleSubmit() {
    console.log(this.contactForm.value);
  }

  hasError(controlName: string, errorName: string) {
    return (
      this.contactForm.get(controlName)?.hasError(errorName) &&
      this.contactForm.get(controlName)?.touched
    );
  }

  ngOnInit(): void {
    this.contactForm.patchValue({
      email: this.userDataFromDB.email,
    });

    this.contactForm.get("email")?.disable();

    this.contactForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    // Y lo utilizamos, indicando un console.log cada vez que el componente se destruye
    console.log("component destroyed");
  }
}
```

Para probar esto debemos ir de una página a otra y ver como la consola imprime el texto `component destroyed` cada vez que salimos del mismo.

### NgOnChanges

Es el ciclo de vida que se activa cuando un componente @Input cambia. Para probar esto podemos crear un componente dentre de la ruta del contacto de la siguinte manera.

```bash
ng g c contact/input
```

En este crearemos un input de tipo toggle el cual usaremos para ver los cambios. Empezamos modificando el archivo `contact/input.component.ts` de la siguiente manera.

```ts

```

Y en el HTML crearemos el toggle de la siguiente manera.

```html

```

### NgDoCheck

Es el ciclo de vida que se activa cuando el componente se actualiza, lo cual permite realizar acciones de verificación adicionales. Hay que tener en cuenta que esta funcion es llamada cada vez que el componente se actualiza, por lo que su consumo es costoso. Es por esto que no se debe usar para funciones muy pesadas o de alto consumo, ya que puede llevar a un comportamiento inesperado de la página.

### NgAfterContentInit

Es el ciclo de vida que se activa cuando se proyecta el contenido en el componente, lo cual puede ser de ayuda cuando se quiere comprobar si un elemento condicional se renderiza o no, ya que el mismo proyecta si el elemento es visible.

### NgAfterContentChecked

Es el ciclo que se activa despues de verificar un contenido en el componente (similar al [NgAfterContentInit](#ngaftercontentinit), con la diferencia que este se activa cada vez que el contenido se actualiza).

### NgAfterViewInit

Es el ciclo de vida que se activa cuando se renderiza la vista del componente, es decir, el HTML del mismo. Al mostrarse solamente cuando se renderiza el HTML, se mostrará una sola vez.

### NgAfterViewChecked

Es el ciclo que se activa despues de verificar la vista renderizada, al igual que el [NgAfterContentChecked](#ngaftercontentchecked), este se renderiza cada vez que el HTML se actualiza, por lo que si no se utiliza con cuidado puede llevar a un comportamiento inesperado.

## Angular 17

A la fecha la ultima versión estable de Angular es la versión 17, la misma tiene varios cambios a comparación de la version anterior, por lo que empezaremos actualizando nuestro CLI con el siguiente comando.

<!-- ***************************************************************************** -->
<!-- ***************************************************************************** -->
<!-- ***************************************************************************** -->
<!-- ***************************************************************************** -->
<!-- ***************************************************************************** -->
<!-- ****************     ALL THE ANGULAR 17 CODE + NPM UPDATE     *************** -->
<!-- ***************************************************************************** -->
<!-- ***************************************************************************** -->
<!-- ***************************************************************************** -->
<!-- ***************************************************************************** -->
<!-- ***************************************************************************** -->

## Defer

Uno de los beneficios que ofrece Angular a la hora de cargar componentes es el `@defer`, el cual nos ayuda a cargar componentes de manera controlada, ya sea al final de la carga total de la página o solamente cuando el mismo esté en pantalla. Para probar esto podemos crear un componente llamado `big-chunk` de la siguiente manera.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-big-chunk",
  standalone: true,
  imports: [],
  templateUrl: "./big-chunk.component.html",
  styles: `
    img {
      max-width: 50%;
    }
  `, // Es posible colocar los estilos entre ``, al igual que el HTML
})
export class BigChunkComponent {}
```

Luego modificamos el HTML del mismo.

```html
<h3>Big Data</h3>
<img src="https://picsum.photos/1280/720" alt="image" />
```

Y en el HTML del componente app agregamos un texto que nos permita extender la página, a la vez que importamos el mismo dentro del defer de la siguiente manera.

```html
<h1>Hola desde {{ framework }}</h1>
<app-user
  app="{{framework}}"
  (addCurrentWatchingMovieEvent)="changeCurrentWatchingMovie($event)"
/>

@if (currentWatchingMovie) {
<h2>Viendo nuevamente: {{ currentWatchingMovie }}</h2>
}

<p>Big content o lorem1500</p>

@defer (on viewport){
<!-- agregamos el defer con el parámetro para que solo cargue cuando esté en pantalla -->
<app-big-chunk />
<!-- Llamamos al componente -->
} @placeholder {
<!-- Le indicamos un placeholder para el componente -->
<p>Skeleton</p>
} @loading {
<!-- Y le indicamos un componente que se mostrará mientras se carga el componente -->
<p>Cargando...</p>
}

<!-- <router-outlet /> -->
```

> También es posible indicar un tiempo mínimo de carga pasándole un parámetro al `@placeholder (1000)`

## Fuentes

- [Angular docs 🔗](https://angular.dev/overview)
- [Curso Angular by Sergie Code 🔗](https://youtu.be/soInCF7nbDw?si=R7vVfeNLdf8pLzWb)
- [Angular tutorial 🔗](https://angular.dev/tutorials/learn-angular)
- [Aprende Angular 17 by midudev 🔗](https://youtu.be/f7unUpshmpA?si=u9lIsRP2YT7iwv33)
