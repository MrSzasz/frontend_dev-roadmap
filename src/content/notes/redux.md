---
title: "Redux"
tags: ["front", "code"]
description: "Redux es una herramienta de gestión de estados framework agnostic (es decir, que se puede usar con diferentes frameworks), la cual nos ayuda a manejar mejor los estados, evitando los problemas a futuro junto al debugging.  
Para esta guía crearemos un proyecto básico en el que podremos agregar películas a una lista de películas favoritas y de películas vistas."
date: 1700164800000
icon: '/icons/redux.svg'
color: "#7A50Ae"
---

## Instalación

Para este caso usaremos Redux con React, para ello comenzaremos creando un nuevo proyecto de React, luego de ello abriremos nuestro proyecto en el editor de código.

> Para este proyecto vamos a usar [Tailwind](https://tailwindcss.com/)

Hecho esto, empezaremos con la instalación de [Redux Toolkit](https://redux-toolkit.js.org/), el cual nos ayudará a configurar Redux en nuestro proyecto. Para ello abriremos la consola y usaremos el comando que nos proporciona la [documentación](https://redux-toolkit.js.org/tutorials/quick-start#install-redux-toolkit-and-react-redux).

```npm
npm i @reduxjs/toolkit react-redux
```

Sumado a esto podemos instalar una extensión que nos ayudará con el debugging de Redux, la cual está disponible para [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/) y [otros navegadores](https://github.com/reduxjs/redux-devtools/tree/main/extension#installation).

## Store

Para empezar a usar Redux es necesario crear nuestro `store`, que será donde guardaremos todos nuestros estados. Para ello debemos crear una carpeta dentro de `src` llamada `app` y dentro de ella un archivo llamado `store.js`, y dentro del mismo crearemos nuestro store con el siguiente código.

```jsx
import { configureStore } from "@reduxjs/toolkit"; // Importamos lo necesario de Redux

const store = configureStore({
  // Creamos nuestra store
  reducer: {},
});

export default store; // La exportamos
```

Con nuestra store creada debemos indicarle a nuestra app cual será el store que usaremos, para ello iremos a nuestro `main.jsx` y allí usaremos el `Provider` que nos facilita Redux de la siguiente manera.

```jsx
import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux"; // Importamos el provider de Redux
import store from "./app/store"; // Importamos la store que creamos anteriormente

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Usamos el provider para envolver nuestra app y le pasamos la store como prop */}
      <App />
    </Provider>
  </React.StrictMode>,
);
```

## Slice

Luego de crear nuestro store será necesario crear nuestro `slice`, es decir, nuestro modificador de estados. Para ello crearemos una carpeta `features` dentro de la carpeta `src`, dentro de la misma crearemos la carpeta `movies` y por ultimo el archivo `favMovieListSlice.js` en la que tendremos nuestro slice.

> Una forma fácil de hacer esto sería escribir `features/movies/favMovieListSlice.js` dentro de `src`

Hecho esto agregamos el código en nuestro archivo

```jsx
import { createSlice } from "@reduxjs/toolkit"; // Importamos lo necesario para crear el slice

const initialState = [
  {
    // Creamos el estado inicial
    id: "hq",
    name: "scarface",
    desc: "Tells the story of Cuban refugee Tony Montana (Al Pacino), who arrives penniless in Miami during the Mariel boatlift and becomes a powerful and extremely homicidal drug lord.",
  },
];

export const favMovieListSlice = createSlice({
  // Exportamos el slice que crearemos
  name: "favMovieList", // Le asignamos un nombre
  initialState, // Le pasamos el estado inicial
  reducers: {}, // Y los reducers que crearemos luego
});

export default favMovieListSlice.reducer; // Exportamos los reducers
```

Y por ultimo importamos este slice en nuestro store de la siguiente manera

```jsx
import { configureStore } from "@reduxjs/toolkit";
import favMovieListSlicer from "../features/movies/favMovieListSlice"; // Importamos el slice

const store = configureStore({
  reducer: {
    favMovieList: favMovieListSlicer, // Y lo asignamos con el nombre que queremos
  },
});

export default store;
```

Con esto hecho tendremos la configuración de nuestro store completo.

## Uso del estado

Con nuestro estado configurado podemos empezar a utilizarlo. Para ello lo llamaremos en nuestro `App.jsx` de la siguiente manera.

```jsx
import "./App.scss";
import { useSelector } from "react-redux"; // Importamos la función que llama al estado

function App() {
  const favMovieListArray = useSelector((state) => state.favMovieList); // Usamos la función especificando el estado y lo guardamos en una constante

  console.log(favMovieListArray); // Imprimimos la constante en la consola para comprobar que funciona

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
```

## Agregar datos

Ya podemos llamar los datos, ahora es momento de agregar datos, para ello crearemos la función necesaria en nuestro `favMovieListSlice.js` como un `reducer` de la siguiente manera.

```jsx
import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = [{
    id: "hq"
    name: 'scarface',
    desc: 'Tells the story of Cuban refugee Tony Montana (Al Pacino), who arrives penniless in Miami during the Mariel boatlift and becomes a powerful and extremely homicidal drug lord.'
}];

export const favMovieListSlice = createSlice({
    name: 'favMovieList',
    initialState,
    reducers: {
        addMovie: (state, action) => {          // Le asignamos un nombre al reducer
            state.push(action.payload)          // Y usamos push para mandarlos al array
        }
    }
})

export const {
    addMovie
} = favMovieListSlice.actions                   // Exportamos la acción para usarla en otro lado
export default favMovieListSlice.reducer;
```

Para crear el id de cada uno de nuestros datos de momento utilizaremos [`uuid`](https://www.npmjs.com/package/uuid), el cual instalaremos de la siguiente manera.

```bash
npm i uuid
```

Luego de esto podemos crear el resto de las funciones para generar la película.

```jsx
import "./App.scss";
import $ from "jquery"; // Utilizamos jQuery para agilizar la explicación de js
import { useSelector, useDispatch } from "react-redux"; // Importamos el dispatch para llamar a la acción
import { addMovie } from "./features/movies/favMovieListSlice"; // Importamos la acción
import { v4 as uuid } from "uuid"; // Importamos uuid

function App() {
  const favMovieListArray = useSelector((state) => state.favMovieList);

  const dispatch = useDispatch(); // Llamamos al useDispatch y la guardamos en una constante

  const handleSubmit = (e) => {
    // Creamos un handleSubmit para obtener y guardar los datos
    e.preventDefault();
    dispatch(
      // Utilizamos el dispatch y le pasamos el objeto como parámetro para guardar
      addMovie({
        id: uuid(),
        name: $("#movieName").val(),
        desc: $("#movieDesc").val(),
      }),
    );
  };

  return (
    <div className="flex h-fit min-h-screen flex-col gap-8 bg-gray-900 p-4 text-center text-white">
      <form
        className="mx-auto flex w-1/4 flex-col gap-4 text-black"
        onSubmit={handleSubmit}
      >
        {" "}
        {/* Creamos el form para guardar los datos */}
        <input
          className="rounded p-2"
          type="text"
          placeholder="movie name"
          id="movieName"
          required
        />
        <textarea
          className="rounded p-2"
          name="desc"
          id="movieDesc"
          cols="30"
          rows="5"
          placeholder="description"
        ></textarea>
        <button
          className="mx-auto w-1/2 rounded border-2 border-black bg-purple-600 px-6 py-3 text-white transition-all   hover:scale-105"
          type="submit"
        >
          SAVE
        </button>
      </form>
      <div>
        {" "}
        {/* Creamos el div que contendrá nuestra lista */}
        <h1 className="pb-4 text-2xl font-bold uppercase underline">
          fav movies
        </h1>
        <div className="flex flex-wrap items-center justify-center">
          {favMovieListArray.map((movie, i) => (
            <div
              key={i}
              className="flex w-1/4 flex-col items-center justify-center gap-6 self-stretch rounded border-2 border-black bg-gray-500 p-4"
            >
              <h3 className="font-bold uppercase underline">{movie.name}</h3>
              <p className="flex h-full items-center">{movie.desc}</p>
              <button className="mx-auto w-1/2 min-w-fit rounded border-2 border-black bg-red-600 px-4 py-2 transition-all hover:scale-105">
                DELETE
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
```

Con esto hecho podemos agregar películas y ver como se actualiza en el momento.

## Eliminar datos

Ya tenemos los datos creados y guardados, pero va a ser necesario poder eliminar los datos del array, para esto crearemos otro reducer de la siguiente manera.

```jsx
[ ... ]             // Resto del código

export const favMovieListSlice = createSlice({

    name: 'favMovieList',

    initialState,

    reducers: {
        addMovie: (state, action) => {
            state.push(action.payload)
        },

        deleteMovie: (state, action) => {           // Le asignamos el nombre
            const movieInList = state.find(movie => movie.id === action.payload)        // Usamos ".find()" para buscar el id en el array
            state.splice(state.indexOf(movieInList), 1)         // Y buscamos el index para poder usar ".splice()"
        }
    }
})

export const {
    addMovie,
    deleteMovie,                // Lo importamos para usarlo luego
} = favMovieListSlice.actions

export default favMovieListSlice.reducer;
```

Ahora podemos llamarlo en nuestra `App.jsx` y asignarlo al botón correspondiente.

```jsx
import "./App.scss";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { addMovie, deleteMovie } from "./features/movies/favMovieListSlice";        // Importamos el delete
import { v4 as uuid } from "uuid";

function App() {
    [ ... ]

    const handleDelete = (id) => {
        dispatch(deleteMovie(id));        // Creamos el dispatch y le pasamos el id
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen h-fit text-center flex flex-col gap-8 p-4">
            [ ... ]
            <div className="flex justify-center items-center flex-wrap">
                {favMovieListArray.map((movie, i) => (
                    <div
                     key={i}
                     className="w-1/4 bg-gray-500 flex flex-col justify-center items-center p-4 gap-6 border-2 border-black  rounded self-stretch"
                        >
                        <h3 className="font-bold uppercase underline">{movie.name}</h3>
                        <p className="h-full flex items-center">{movie.desc}</p>
                        <button onClick={()=> handleDelete(movie.id)}             // Le pasamos el id de la película
                                className="py-2 px-4 bg-red-600 rounded min-w-fit w-1/2 mx-auto border-2 border-black transition-all hover:scale-105">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
```

## Editar datos

El proximo paso para completar nuestro CRUD con Redux será la posibilidad de editar nuestras películas, más allá de que luego no lo usemos en el producto final. Para ello crearemos nuestro reducer llamado `updateMovie` de la siguiente manera.

```jsx
[ ... ]

export const favMovieListSlice = createSlice({

    name: 'favMovieList',

    initialState,

    reducers: {
        [ ... ]

        updateMovie: (state, action) => {
            const { id, name, desc } = action.payload                       // Hacemos un destructuring de los datos que enviaremos
            const movieToUpdate = state.find(movie => movie.id === id)      // Buscamos por el ID la película
            movieToUpdate.name = name                                       // Cambiamos los datos que existen por los que enviamos
            movieToUpdate.desc = desc
        },

        [ ... ]
    }
})

export const {
    addMovie,
    updateMovie,                // Lo exportamos para su uso luego
    deleteMovie,
} = favMovieListSlice.actions
export default favMovieListSlice.reducer;
```

Luego de esto será necesario crear el componente `Edit.jsx` para poder pasar los datos, quedando el mismo de la siguiente manera.

```jsx
import $ from "jquery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateMovie } from "../../features/movies/favMovieListSlice";

const Edit = () => {
    const [movieToEdit, setMovieToEdit] = useState({});         // Creamos el estado que guardará nuestra película
    const { id } = useParams();                             // Tomamos el id que pasamos por parámetro
    const dispatch = useDispatch();
    const navigate = useNavigate();                                     // Usamos el useNavigate para poder redireccionar la página
    const moviesArray = useSelector((state) => state.favMovieList);     // Nos traemos la película

    const handleUpdate = (id, name, desc) => {              // Creamos la función para poder hacer el update
        dispatch(updateMovie({ id, name, desc }));          // Le pasamos los datos para el update
        navigate("/");                                      // Y al final redirigimos al inicio
    };

    useEffect(() => {
        setMovieToEdit(moviesArray.find((movie) => movie.id === id));           // Buscamos la película dentro del array
    }, []);

    return (
        <div className="bg-zinc-900 text-white min-h-screen h-fit text-center flex flex-col gap-8 p-4">
            <Link
                to={"/"}
                className="py-3 px-6 text-white bg-blue-600 rounded w-1/2 mx-auto border-2 border-black transition-all hover:scale-105"
                    type="submit"
            >
                ⬅ BACK
            </Link>             {/* Creamos el link para volver al inicio */}
            <form className="flex flex-col w-1/4 mx-auto text-black gap-4">
                <input
                className="rounded p-2"
                name="nameUpdate"
                type="text"
                id="movieNameUpdate"
                defaultValue={movieToEdit.name}         {/* Le pasamos el dato que obtuvimos como valor por defecto */}
                />
                <textarea
                className="rounded p-2"
                name="descUpdate"
                id="movieDescUpdate"
                cols="30"
                rows="5"
                defaultValue={movieToEdit.desc}
                ></textarea>
                    <button
                        onClick={() =>
                            handleUpdate(
                                id,
                                $("#movieNameUpdate").val(),
                                $("#movieDescUpdate").val()
                            )                   {/* Le pasamos los datos de los input como valores a cambiar */}
                        }
                        className="py-3 px-6 text-white bg-purple-600 rounded w-1/2 mx-auto border-2 border-black transition-all hover:scale-105">
                        SAVE ➕
                    </button>
            </form>
        </div>
    );
};

export default Edit;
```

> Todo este componente se puede modularizar, pero para el resultado final se eliminará, por lo que no es completamente necesario

Con esto hecho tenemos completado nuestro CRUD con Redux.

## Mantener el estado

Lo proximo que debemos hacer es mantener el estado, algo similar como lo que se hace con el `localstorage`, para ello usaremos un paquete llamado [redux-persist](https://github.com/rt2zz/redux-persist), instalando de la siguiente manera.

```cmd
npm install redux-persist
```

`redux-persist` nos ayuda a la hora de crear un storage persistente, ya que no es posible usar localstorage dentro de redux. Para comenzar con la configuración debemos ir a nuestro `store.js`, el cual cambiaremos como nos indica la documentación, quedando de la siguiente manera

```js
import { combineReducers, configureStore } from "@reduxjs/toolkit"; // Importamos lo necesario de redux

import {
  persistReducer, // Importamos la función principal de redux-persist
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, // Así como ciertas configuraciones para evitar errores
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // Y el storage

import favMovieListSlicer from "../features/movies/favMovieListSlice";

const persistConfig = {
  // Creamos la función
  key: "moviesInStorage", // Le pasamos el nombre de la key
  storage, // Y el storage como parámetros
};

const reducer = combineReducers({
  // Usamos el combineReducers y lo guardamos en una constante
  favMovieList: favMovieListSlicer,
});

const persistedReducer = persistReducer(persistConfig, reducer); // Y paramos ambos como parámetros de la función

const store = configureStore({
  reducer: persistedReducer, // Le pasamos el persistedReducer que creamos como reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Y creamos el middleware que evita los errores
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Pasando lo que pedimos desde redux-persist
      },
    }),
});

export default store;
```

Hecho esto podemos pasar a nuestro `main.jsx` y terminar de configurar lo necesario para que funcione de la siguiente manera.

```jsx
import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react"; // Importamos PersistGate desde redux-persist para React
import { persistStore } from "redux-persist"; // Y la función persistStore

const persistor = persistStore(store); // Utilizamos la función y le pasamos como parámetro el mismo store que utilizamos para el Provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          {" "}
          {/* Envolvemos nuestro componente principal con el PersistGate que importamos anteriormente, pasando el persistor como prop */}
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
```

Con esto configurado tenemos nuestro estado persistente.

## Fuentes

- [Redux documentation 🔗](https://redux.js.org/introduction/getting-started)
