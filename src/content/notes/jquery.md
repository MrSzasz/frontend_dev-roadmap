---
title: "JQuery"
tags: ["front", "code"]
description: "jQuery es una biblioteca de JavaScript creada en el año 2006, la cual es una /'compilación/' de funciones de JavaScript que ayuda con la integración entre diferentes navegadores. Actualmente hay paginas que siguen usando jQuery, pero su uso es cada vez menor."
date: 1700171071000
icon: "/icons/jquery.svg"
color: "#0F1B2B"
---

## Instalación

Para empezar a usar jQuery en nuestro proyecto debemos [instalarlo](https://jquery.com/download/), para lo cual existen diferentes formas de hacerlo. Podemos hacer uso de `npm` (npm i jquery) o en su defecto, usar un [`CDN`](https://developer.mozilla.org/es/docs/Glossary/CDN).

Para ello debemos crear nuestro archivo base en HTML (en VSC podemos escribir `!` (signo de exclamación) y nos creará automáticamente la base de nuestro HTML) y al final del body agregar el link al CDN.

```HTML
<body>
 <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</body>
```

## Coding

Hecho esto podemos empezar a probar nuestro jQuery. Para ello crearemos un archivo `.js` que importaremos debajo de la importación de jQuery.

En el archivo que creamos iniciamos jQuery y creamos un `console.log` para ver si todo esta funcionando bien.

```js
$(document).ready(function () {
  console.log("Hola Mundo, con jQuery");
});
```

> El archivo js con jQuery siempre utiliza `document.ready` al iniciar el código, ya que indica que se realizan las acciones solamente cuando termine de cargar la página

En VSC hay una extensión llamada [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), la cual nos ayuda brindándonos un servidor para poder probar nuestro proyecto, y es el que usaremos actualmente para probar si todo funciona.

## Selectores

Con esto hecho podemos empezar a ver como seleccionar elementos en el HTML, empezamos creando 3 botones para ver las diferentes manera de interactuar con los mismos.

```HTML
<main>
 <button>
  Primer botón
 </button>

 <button class="btn">
  Segundo botón
 </button>

 <button class="btn" id="btnID">
  Tercer botón
 </button>

 <ul>
  <li>1</li>
        <li data-position="2nd">2</li>
        <li>3</li>
        <li>4</li>
    </ul>
</main>
```

En nuestro archivo js podemos hacer uso de los selectores de jQuery. Los selectores empiezan siempre con el símbolo `$` (dólar), seguido por un paréntesis (`()`) en el cual pondremos un string de lo que querramos seleccionar en el HTML.

```js
$(document).ready(function () {
  $("button").html("Estos son botones"); // Al no indicar un punto (.) o un numeral (#) toma todos los elementos del tipo button
});
```

Esta linea de código toma todos los elementos de tipo `button` de la pagina y cambia su contenido HTML (en este caso el texto) por el texto que le pasamos como parámetro, si no le pasamos nada simplemente los obtiene, lo que nos da la oportunidad de guardarlo en una variable y utilizarlo para otras cosas.

Hay varias formas de usar los [selectores](https://www.w3schools.com/jquery/jquery_ref_selectors.asp), pero en este caso veremos los mas comunes siendo estos los siguientes.

```js
$(document).ready(function () {
  // $('button').html('Estos son botones')
  $(".btn").html("seleccionado con clase"); // Seleccionamos en base a su clase
  $("#btnID").html("seleccionado con ID"); // Seleccionamos en base a su ID
  $("ul li[data-position='2nd']").html("este es el item con valor 2"); // Seleccionamos el item con el data que creamos en el HTML
  $("ul li:first").html("este es el primer item"); // Seleccionamos el primer li que encontramos
  $("ul li:last").html("este es el primer item"); // Seleccionamos el ultimo li que encontramos
});
```

> En el caso de los `ul li` estamos indicando que solo tomaremos los `li` que estén dentro de un elemento `ul`

## Eventos

Ahora podemos agregar eventos a los botones para que podamos interactuar con los mismos. Empezamos con el evento más básico, un evento `click` para, como su nombre lo indica, detectar cuando el usuario hizo un click en nuestro botón.

```js
$(document).ready(function () {
  $(".btn").click(() => {
    alert("Soy una alerta!");
  });
});
```

Con esto lo que hacemos es que se envíe una alerta cada vez que hacemos click en el botón que tiene la clase `btn`, usando el evento `click`, el cual es solo uno de los tantos [eventos de jQuery](https://api.jquery.com/category/events/), pero es uno de los mas utilizados junto al `dblclick`, el cual solo se inicia cuando se hace doble click sobre el elemento seleccionado.

## CSS

También es posible manipular los estilos y combinarlos con los eventos, haciendo que cambie el estilo dependiendo de lo que hagamos. Por ejemplo, crearemos un simple `p` y dos botones para cambiarle el color a la fuente.

```HTML
<main>
    <p id="text">Hola soy un párrafo</p>
    <button id="rojo">rojo</button>
    <button id="azul">azul</button>
    <button id="varios">color y upper</button>
</main>
```

Y ahora podemos seleccionarlo en nuestro js, agregando los eventos correspondientes.

```js
$(document).ready(function () {
  let textP = $("#text"); // Seleccionamos el elemento y lo guardamos en una variable
  $("#rojo").click(() => {
    textP.css("color", "red"); // Cambiamos el CSS del elemento al hace click
  });
  $("#azul").click(() => {
    textP.css("color", "blue");
  });
  $("#varios").click(() => {
    textP.css({
      // Para pasar mas de un modificador lo hacemos en forma de objeto
      color: "blue",
      "text-transform": "uppercase", // Transformamos el texto a mayúsculas
    });
  });
});
```

## Input

Podemos recuperar el valor de un input en base a los diferentes eventos de javaScript, pero para este caso no usaremos `.html()`, sino que haremos uso del método `.val()`. Para ello creamos un input básico en nuestro HTML con el id `jqInput` y un botón que sea de tipo submit, todo esto de un elemento `form`, luego los llamamos en nuestro archivo js.

```js
$(document).ready(function () {
  let inputOnHTML = $("#jqInput"); // Llamamos al input y lo guardamos en una variable
  inputOnHTML.keyup((e) => {
    // Indicamos que detecte cuando se ingresa una tecla
    console.log(inputOnHTML.val()); // Imprimimos en consola el valor total del input
  });
  $("button[type='submit']").click((e) => {
    // Llamamos al botón aprovechando el tipo del botón
    e.preventDefault(); // Indicamos que no se cumpla el submit normal
    alert(inputOnHTML.val()); // Hacemos un alert del valor del input
  });
});
```

## Animaciones base

Podemos hacer uso de las animaciones base que tiene jQuery para ocultar y mostrar ciertos elementos, siendo estas las `slide` y los `toggle`. Para empezar crearemos un elemento que usaremos de base para modificar, además de los diferentes botones en el HTML.

```HTML
<main>
    <div class="buttons">
        <button id="Hide">Hide</button>
        <button id="Show">Show</button>
        <button id="ToggleHS">ToggleHS</button>
        <button id="FadeOut">FadeOut</button>
        <button id="FadeIn">FadeIn</button>
        <button id="ToggleF">ToggleF</button>
        <button id="SlideUp">SlideUp</button>
        <button id="SlideDown">SlideDown</button>
        <button id="ToggleS">ToggleS</button>
    </div>
    <img src="https://i.kym-cdn.com/entries/icons/original/000/029/849/drax.jpg" alt="invisible">
</main>
```

Y llamamos a cada uno de los botones con sus respectivos id en js, usando los métodos necesarios.

```js
$(document).ready(function () {
  let image = $("img");
  $("#Hide").click(() => image.hide()); // Oculta el elemento
  $("#Show").click(() => image.show()); // Muestra el elemento
  $("#ToggleHS").click(() => image.toggle()); // Varia entre mostrar y ocultar el elemento
  $("#FadeIn").click(() => image.fadeIn()); // Muestra el elemento con un efecto de aparición
  $("#FadeOut").click(() => image.fadeOut()); // Oculta el elemento con un efecto de desvanecimiento
  $("#ToggleF").click(() => image.fadeToggle()); // Varia entre mostrar y ocultar el elemento con los efectos
  $("#SlideUp").click(() => image.slideUp()); // Oculta el elemento subiéndolo
  $("#SlideDown").click(() => image.slideDown()); // Muestra el elemento bajándolo
  $("#ToggleS").click(() => image.slideToggle()); // Alterna entre los dos anteriores
});
```

## Animate

También es posible crear nuestras propias animaciones con el método `animate()`, pudiendo modificar un elemento a elección, para ello crearemos un elemento simple y dos botones, uno para una animación simple de un solo parámetro, y otra para multiples parámetros.

```html
<main>
     
  <div class="buttons">
            <button id="big">++</button>        
    <button id="multiple">animado</button>    
  </div>

     
  <img
    src="https://i.kym-cdn.com/entries/icons/original/000/029/849/drax.jpg"
    alt="invisible"
  />
</main>
```

Y luego nos vamos a nuestro js para poder agregar las funciones a los botones.

```js
$(document).ready(function () {
  let image = $("img");
  $("#large").click(() => {
    image.animate({
      // Usamos el método "animate" para animar el elemento
      width: "+=100px", // Y pasamos lo que queremos cambiar como método
    });
  });

  $("#multiple").click(() => {
    image.animate(
      {
        width: "-=20px",
        opacity: "-=.05",
      },
      500, // Podemos poner el tiempo que tardará en hacerse
      () => {
        // Podemos pasar un callback para generarse al terminar la animación
        console.log("animación completa");
      },
    );
  });
});
```

## AJAX

Con jQuery podemos hacer pedidos AJAX usando el método `get()`, el cual nos trae los datos de un archivo o base de datos par poder mostrarlos en pantalla sin la necesidad de recargar la misma. Para mostrarlo crearemos un archivo llamado `data.json` con un array de datos.

```json
[
  {
    "name": "joseph",
    "surname": "joestar"
  },
  {
    "name": "jotaro",
    "surname": "kujo"
  },
  {
    "name": "josuke",
    "surname": "higashikata"
  }
]
```

Y en nuestro HTML agregaremos un botón para tomar los datos más un ul para poder mostrarlos de la siguiente forma.

```HTML
<main>
    <button id="getData">get data</button>
    <ul id="data"></ul>
</main>
```

Por ultimo hacemos uso de nuestro js, en el cual llamaremos a los datos y luego los mostraremos en pantalla.

```js
$("#getData").click(() => {
  $.get("data.json", (data) => {
    // Usamos el método para obtener los datos
    $.each(data, function (i, item) {
      // Creamos un forEach de jQuery en donde i es el index y item el elemento
      $("#data").append(`
            <li>Nombre: ${item.name}<br>
            Apellido: ${item.surname}<br>
            Posición: N${i}</li><hr>`); // Hacemos un append para crear cada item en base a los datos
    });
  });
});
```

> También se le pueden pasar [diferentes parámetros](https://api.jquery.com/jQuery.get/) dependiendo de lo que necesitemos saber, como el estado de la petición

## Fuentes

- [JQuery docs 🔗](https://api.jquery.com/)
