---
title: "HTML"
tags: ["front", "code"]
description: "HTML (hyper text markup language) es un lenguaje standard para crear páginas web, es la base que se utiliza normalmente para crear todos los componentes de la misma, los mismos que luego se estilizarán gracias a CSS."
date: 1699910600000
icon: "/icons/html.svg"
color: "#FC4F13"
---

Este lenguaje se utiliza con base en nodos y parents, con sus respectivas etiquetas (`<etq>contenido</etq>`), las cuales indican el tipo de contenido y contexto que tendrán en el código.
Normalmente el primer archivo que se crea para un proyecto con HTML es el archivo llamado `index.html`, el cual contiene el código principal para que este funcione.

```HTML
<!DOCTYPE html>

<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML Example</title>
    </head>

    <body>
        <h1>Main title</h1>
        <h2>Subtitle test</h2>
    </body>

</html>
```

> Este simple ejemplo toma de base el layout standard del archivo `index.html` que proporciona Visual Studio Code con el Snippet `!`.

## Etiquetas

Como se puede ver en el ejemplo, ya se están utilizando diferentes etiquetas, como puede ser `<html>`, `<head>` y `<body>`, cada una de estas con su respectiva función semántica. Las etiquetas puede ser variadas, desde un simple `<div>` que cree un bloque de contenido, hasta algunas etiquetas mas puntuales como podrían ser `<form>` para crear un formulario o `<h1>` para indicar un titulo en la página.
La semántica en las etiquetas es importante, no solo para ayudar al SEO y los motores de búsqueda, sino que estas indican que tipo de contenido se está mostrando, siendo de ayuda para la interacción del usuario (y la accesibilidad).

Algunas de las etiquetas mas importantes y usadas son las siguientes.

### `<head></head>`

Es donde se coloca todo el contenido que informa al navegador, como pueden ser los metadatos o el titulo de la página.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
```

### `<body></body>`

Se encarga de englobar todo el contenido de la página.

```html
<body>
  <h1>Main title</h1>
  <h2>Subtitle test</h2>
</body>
```

### `<header></header>`

El header es el elemento en donde se proporciona la información sobre la navegación y los elementos que definen a la página, como puede ser el logo y el titulo de la misma.

```html
<header>
  <nav>
       
    <!-- Links de navegación -->
  </nav>
</header>
```

### `<nav></nav>`

Es el encargado de tener los links de navegación en la página, incluyendo los menús para la navegación mobile.

```html
<header>
  <nav>
    <ul>
      <li><a href="/"></a>Inicio</li>
      <li><a href="/users"></a>Usuarios</li>
      <li><a href="/help"></a>Ayuda</li>
    </ul>
  </nav>
</header>
```

> En este ejemplo se utilizan las listas para un mejor orden de los links

### `<main></main>`

Es la etiqueta que engloba todo el contenido principal de la página, este debe ser `ÚNICO` en cada uno de los archivos, siendo una de las etiquetas principales, al mismo nivel que el `header` y el `footer`

```html
<header>
  <!-- Contenido -->
</header>

<main>
  <div>
    <h1>Main title</h1>
    <h2>Subtitle test</h2>
  </div>
</main>
   
<footer>
  <!-- Contenido -->
</footer>
```

### `<section></section>`

Es la etiqueta que nos ayuda a dividir los diferentes contenidos de la página, siendo estos diferentes secciones en la misma.

```html
<main>
  <section>
    <h1>Main title</h1>
    <h2>Subtitle test</h2>
  </section>
  <section>
    <!-- Otra sección con contenido -->
  </section>
</main>
```

### `<div></div>`

Se encarga de dividir los diferentes bloques de contenido sin tener una semántica especifica.

```html
<main>
  <section>
    <div>
      <h1>Main title</h1>
      <h2>Subtitle test</h2>
    </div>
  </section>
  <section>
    <!-- Otra sección con contenido -->
  </section>
</main>
```

### `<h1></h1>`

Los headings son las diferentes etiquetas que se utilizan para crear títulos y subtítulos, estas mismas tienen un orden jerárquico marcado, yendo de la mas importante `<h1></h1>` hasta `<h6></h6>`.

```html
<main>
  <section>
    <div>
      <h1>Main title</h1>
      <h2>Subtitle test</h2>
      <h3>Heading 3</h3>
    </div>
  </section>
  <section>
    <!-- Otra sección con contenido -->
  </section>
</main>
```

### `<p></p>`

Es la etiqueta que se encarga de los bloques de texto.

```html
<section>
  <div>
    <h1>Main title</h1>
    <h2>Subtitle test</h2>
    <h3>Heading 3</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique et
      vero, ipsum sunt facilis temporibus nesciunt vitae nulla iste aperiam.
    </p>
  </div>
</section>
```

### `<span></span>`

Esta se utiliza mayormente dentro de la etiqueta `<p></p>`, pudiendo resaltar la misma para poder editarlo con CSS.

```html
<section>
  <div>
    <h1>Main title</h1>
    <h2>Subtitle test</h2>
    <h3>Heading 3</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      <span>Similique et vero</span>, ipsum sunt facilis temporibus nesciunt
      vitae nulla iste aperiam.
    </p>
  </div>
</section>
```

### `<a></a>`

Esta etiqueta es la necesaria para crear links, pudiendo asignarle diferentes parámetros como `target=_blank` para que se abra en otra pestaña o `download` para generar una descarga.

```html
<header>
  <nav>
    <ul>
      <li><a href="/"></a>Inicio</li>
      <li><a href="/users"></a>Usuarios</li>
      <li><a href="/help"></a>Ayuda</li>
    </ul>
  </nav>
</header>
```

### `<img>`

Esta tag es la encargada de las imágenes, ya sea en formato estático (png, jpeg, etc.) o de gifs. También puede tener diferentes atributos, pero los mas importantes son `src` para indicar la ruta de la imagen y `alt` para generar un texto que explique la imagen cuando no se pueda ver (ya sea por falla de carga o por una discapacidad visual de usuario).

```html
<section>
  <img src="assets/image.png" alt="image description" />
</section>
```

### `<ul></ul>`

Nos ayuda con la creación de listas, estas constan de dos partes, `<ul>` para indicar que tipo de lista será, y `<li>` para los items dentro de la misma lista.

```html
<ul>
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
</ul>
```

> En este caso se utilizó `<ul>` como ejemplo para mostrar una lista sin orden, pero con `<ol>` se pueden crear listas ordenadas

### `<details></details>`

Gracias a esta etiqueta podemos crear "acordeones" de forma nativa, los cuales se pueden estilizar gracias a CSS.

```html
<details>
  <summary>¿Que lenguaje es?</summary>
  <p>HTML puro</p>
</details>
```

### `<form></form>`

Una de las tags mas importantes es la tag utilizada para formularios, permitiendo crear los mismos de una manera simple y rápida, con sus respectivos atributos para el usuario y para el Back-end, pudiendo tomar los datos ingresados en el mismo.
El bloque de formulario se divide en dos partes, `<form>` para englobar todo el formulario, y el tag `<input>` para generar los campos a rellenar.

```html
<form>
  <label for="form_name">Nombre</label>
  <input type="text" name="form_name" id="form_name" placeholder="Nombre" />
  <label for="form_number">Tel.</label>
  <input
    type="number"
    name="form_number"
    id="form_number"
    placeholder="11400988"
  />
  <label for="form_message"></label>
  <textarea
    name="form_message"
    id="form_message"
    cols="30"
    rows="10"
    placeholder="Ingrese el mensaje"
  ></textarea>
  <input type="submit" value="send" />
</form>
```

En este caso cada input tiene su atributo `name` para indicar el nombre del mismo, este se utiliza por el `<label>` para mostrar el nombre en pantalla, y a su vez ayuda a tomar mejor el dato del mismo por el Back-end.

### `<datalist></datalist>`

Esta etiqueta nos ayuda a genera una lista para autocompletar un input, pudiendo pasar los datos necesarios.

```html
<form>
  <label for="form_name">Nombre</label>
  <input
    type="text"
    name="form_name"
    id="form_name"
    placeholder="Nombre"
    list="form_name_list"
  />
  <datalist id="form_name_list">
    <option value="Leo">Principal</option>
    <option value="Jack" />
    <option value="Michelle" />
  </datalist>
  <label for="form_number">Tel.</label>
  <input
    type="number"
    name="form_number"
    id="form_number"
    placeholder="11400988"
  />
  <label for="form_message"></label>
  <textarea
    name="form_message"
    id="form_message"
    cols="30"
    rows="10"
    placeholder="Ingrese el mensaje"
  ></textarea>
  <input type="submit" value="send" />
</form>
```

### `<footer></footer>`

Es el pie de página, el cual está al mismo nivel del `<header>` y el `<main>`.

```html
<body>
  <header>
    <!-- [...] -->
  </header>

  <main>
    <!-- [...] -->
  </main>

  <footer>
    <img src="assets/logo.png" alt="brand logo" />
    <ul>
      <li><a href="#top">go up</a></li>
    </ul>
  </footer>
</body>
```

### `<dialog></dialog>`

Este elemento se utiliza para crear un popup de manera sencilla, el cual se puede controlar mediante JavaScript, pero que viene con cierto CSS predefinido para que su funcionamiento sea optimo.
Para abrir el mismo se necesita de la función `showModal()` (o solamente `show()` para que funcione como un dialog), y `close()` para cerrarlo.

```html
<body>
  <button id="openButton">open</button>
  <dialog id="modal">
    <h1>hola</h1>
    <button id="closeButton">close</button>
  </dialog>
</body>

<script>
  const modal = document.querySelector("#modal");
  const openModal = document.querySelector("#openButton");
  openModal.addEventListener("click", () => {
    modal.showModal();
  });
  const closeModal = document.querySelector("#closeButton");
  closeModal.addEventListener("click", () => {
    modal.close();
  });
</script>
```

> En este caso se utiliza la etiqueta `<script>` solo para el ejemplo, pero esto se debe hacer en el archivo de Js.

## Fuentes

- [Dialog element on HTML by WDS](https://youtu.be/ywtkJkxJsdg?si=CJ-TnN9AvkWpY26y)
- [New-ish HTML tags by Laracast](https://youtu.be/ywtkJkxJsdg?si=CJ-TnN9AvkWpY26y)
