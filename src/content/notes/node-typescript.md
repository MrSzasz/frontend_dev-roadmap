---
title: "Node TypeScript"
tags: ["back", "code", "node", "typescript"]
description: "NodeJS es un entorno de ejecución en el lado del servidor el cual actualmente no tiene soporte oficial de TypeScript, pero con ciertas configuraciones se puede utilizar sin mayores problemas."
date: 1703529928000
icon: "/icons/node-typescript.svg"
color: "#088483"
---

## Instalación

Para iniciar hay que instalar Node desde su [página oficial](https://nodejs.org/en), siempre intentando instalar la version LTS, que es la versión más estable. Hecho esto se puede comprobar si se instalo con el siguiente comando.

```cmd
node -v
```

> Esto devolverá la versión actual de Node.

## Express + CORS

[ExpressJS](https://expressjs.com/) es un framework diseñado para crear aplicaciones con Node, siendo uno de los más importantes actualmente. Cors es un paquete que nos ayuda con el manejo de los CORS como su nombre lo indica. Para instalar el mismo debemos utilizar el siguiente comando.

```bash
npm i express cors express-async-handler
```

```bash
pnpm add express cors express-async-handler
```

> `express-async-handler` nos ayudará a manejar las respuestas asíncronas de las llamadas

Sumado a esto, al trabajar con [[TypeScript]] se deberán instalar sus tipos.

```bash
npm i -D @types/express @types/cors
```

```bash
pnpm add -D @types/express @types/cors
```

## Configuración del entorno

Para comenzar a utilizar Node con Express y Typescript debemos configurar un entorno de pruebas. Para ello empezaremos creando una carpeta dedicada a nuestro entorno y utilizar el siguiente comando para iniciar el entorno.

```cmd
npm init -y
```

```cmd
pnpm init
```

Este comando creará nuestro archivo `package.json`, este contiene toda la configuración y datos de nuestro proyecto, desde el nombre del autor hasta los paquetes que utilizaremos en el mismo.

## Typescript

Para agregar [[TypeScript]] a nuestro proyecto debemos instalar y configurar el mismo. Lo primero que hay que hacer es instalar el paquete necesario con el siguiente comando.

```bash
npm i typescript
```

```bash
pnpm add typescript
```

Luego debemos agregar un script a nuestro `package.json`.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "tsc": "tsc",
    "start": "tsc && node dist/index.js",
}
```

Y ejecutar el comando para agregar las configuraciones de TS a nuestro proyecto.

```bash
npm run tsc -- --init
```

```bash
pnpm tsc --init
```

Se creará el archivo `tsconfig.json`, el cual podremos cambiar a gusto, quedando el mismo de la siguiente manera.

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true
  }
}
```

## Nodemon + ts-node

Uno de los paquetes más importantes para trabajar con Node es `Nodemon`, el cual es un paquete que mantiene una vista constante del proyecto en el que se trabaja, refrescando cada vez que se hace un cambio, sumado a esto se puede instalar el paquete `ts-node`, el cual trabaja en conjunto con nodemon. Para instalarlos se deberá utilizar el siguiente comando.

```cmd
npm i nodemon ts-node -D
```

```cmd
pnpm add nodemon ts-node -D
```

Luego deberemos crear el script para iniciar Nodemon en nuestro `package.json` de la siguiente manera.

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "tsc": "tsc",
    "start": "tsc && node dist/index.js",
    "dev": "nodemon"
  },
```

Por ultimo se deberá agregar un archivo `nodemon.json` con sus respectivas configuraciones.

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```

## Coding

Luego de todas las configuraciones debemos crear el archivo `src/index.ts` para poder crear nuestro servidor de la siguiente manera.

```ts
import express from "express"; // Importamos lo necesario
import cors from "cors";

const app = express(); // Creamos la app

// Server

const server = 5000;


// Middlewares

app.use(express.json()); // Aceptamos el JSON
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Y los datos del body


// Routes

app.get("/", (_req, res) => { // Creamos la ruta con _ en el request
  res.json({ message: "working" }); // Y creamos la respuesta
});


// Server Init

app.listen(server, () => {
  console.log(`server running on port ${server}`
}) // Iniciamos el servidor
```

## Routing

Una de las mejores formas de organizar el proyecto es con rutas separadas, para esto creamos el archivo para las rutas del usuario en la direccion `src/routes/users/usersRoutes.ts`, el cual va a contener las rutas de la siguiente manera.

```ts
import { Router } from "express"; // Importamos el router

const usersRoutes = Router(); // Y lo inicializamos

usersRoutes.get("/users", (_req, res) => {
  // Creamos la ruta
  res.json({ message: "users page working" }); // Y la respuesta
});

export default usersRoutes; // Exportamos las rutas
```

Hecho esto podemos importarlas en nuestro `index.ts` de la siguiente manera.

```ts
import express from 'express'
import cors from 'cors'
import usersRoutes from './routes/users/usersRoutes' // Importamos las rutas

const app = express()

// Server

const server = 5000

// Middlewares

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Routes

// ===== / =====
app.get('/', (_req, res) => {
  res.json({ message: 'working' })
})

// ===== /users =====
app.use('/users', usersRoutes) // Y las usamos con la base "/users"

// Server Init

app.listen(server, () => {
  console.log(`server running on port ${server}`
})
```

## Controladores

Las rutas utilizan controladores para funcionar, por lo que estos se pueden separar en otro componente, para estos debemos crear su respectivo archivo en la dirección `src/controllers/users/usersControllers.ts`, quedando el mismo de la siguiente manera.

```ts
import { type Response } from "express"; // Importamos los tipos de Express

export const usersControllers = {
  // Creamos la función principal
  GET_AllUsers: (res: Response) => {
    // Y cada una de sus respuestas
    res.json({ message: "users page working" });
  },
};
```

Hecho esto podemos reemplazar los mismos en la ruta de usuarios.

```ts
import { Router } from "express";
import { usersControllers } from "../../controllers/users/usersControllers"; // Importamos los controladores

const usersRoutes = Router();

usersRoutes.get("/users", usersControllers.GET_AllUsers); // Y los utilizamos

export default usersRoutes;
```

## Datos desde Params

Es posible recibir datos del usuario por medio de la URL, gracias a los `params`, estos son los datos que se escriben después de la base que utilizamos `/notes/{params}`, pudiendo recibirlos de la siguiente manera.

```ts
  GET_getOneNote: asyncHandler(async (req: Request, res: Response) : Promise<any> => { // Envolvemos la respuesta asíncrona

    const noteID = req.params.id // Tomamos los params

    if (noteID === undefined) { // Si no existe el id
      return res
        .status(400) // Devolvemos el error y el código de estado
        .json({ message: "data must contain 'id' and 'title' and 'content" })
    }

    try {
      /*
     
      Search note by id and return note if found
     
      */
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error })
    }
  }),
```

Y esto lo debemos configurar en la ruta de la siguiente manera.

```ts
import { Router } from "express";
import notesController from "../../controllers/notes/notesControllers";

const notesRoutes = Router();

notesRoutes.get("/", notesController.GET_getAllNotes);
notesRoutes.get("/:id", notesController.GET_getOneNote);

export default notesRoutes;
```

> Es posible tomar más de un dato desde los params, indicandolo al momento de crear la ruta.

## Datos desde Query

Otra forma de tomas los datos es desde las queries, las cuales se indican con `key=value` en la url, sin la necesidad de agregarlo a la hora de crear la ruta, por la que la misma debe quedar de la misma manera `/notes`, y luego se toman esos valores en el back de la siguiente manera.

```ts
  GET_getOneNote: asyncHandler(async (req: Request, res: Response) : Promise<any> => { // Envolvemos la respuesta asíncrona

    const noteID = req.query.id // Tomamos los params

    if (noteID === undefined) { // Si no existe el id
      return res
        .status(400) // Devolvemos el error y el código de estado
        .json({ message: "data must contain 'id' and 'title' and 'content" })
    }

    try {
      /*
     
      Search note by id and return note if found
     
      */
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error })
    }
  }),
```

> Los parámetros se pasan indicandolo de la siguiente manera `/notes/id=moon`, y se puede pasar mas de uno agregando un `&` entre ellos

## Datos desde Body

Si se quiere pasar los parámetros sin que quede en el historial de la URL se puede utilizar el `body` de la petición, la cual se tiene que componer en la misma llamada, y se toma en el back de la siguiente manera.

```ts
  GET_getOneNote: asyncHandler(async (req: Request, res: Response) : Promise<any> => { // Envolvemos la respuesta asíncrona

    const noteID = req.body.id // Tomamos los params

    if (noteID === undefined) { // Si no existe el id
      return res
        .status(400) // Devolvemos el error y el código de estado
        .json({ message: "data must contain 'id' and 'title' and 'content" })
    }

    try {
      /*
     
      Search note by id and return note if found
     
      */
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error })
    }
  }),
```

## LowDB

Se puede agregar una base de datos local para hacer las pruebas de la API, una de estas es [lowdb](https://github.com/typicode/lowdb), la cual agrega una base de datos gracias al manejo de un archivo .json. Para instalarlo se utiliza el siguiente comando.

```bash
npm i lowdb
```

```bash
pnpm add lowdb
```

Con esto hecho se debe crear un iniciador para la base de datos, para eso se crea el archivo en la ruta `src/data/database.ts`, en la misma crearemos y exportaremos la base de datos con su respectivo iniciador.

```ts
export const upDB = async (): Promise<any> => {
  const { JSONPreset } = await import("lowdb/node"); // Importamos el modulo

  const defaultData = { notes: [] }; // Indicamos la data
  const db = await JSONPreset("db.json", defaultData); // Y la creamos
  await db.write(); // Agregamos la data a la base de datos

  return db; // Y devolvemos la instancia
};
```

Con esto hecho podemos crear los handlers de la base de datos en el directorio `src/services/handleNotes.ts`, en el cual podemos manejar las funciones necesarias de estas de al siguiente manera.

```ts
import { type notesType } from "../../types/dict"; // Importamos los tipos
import { upDB } from "../data/database"; // Y el iniciador de la base de datos

export const getAllNotes = async (): Promise<notesType> => {
  // Creamos la función para traer todos los datos
  try {
    const notes = await upDB(); // Pedimos los datos

    return notes.data.notes; // Y devolvemos las notas
  } catch (error) {
    throw new Error("Something went wrong with the database"); // Manejamos el error si hubiese
  }
};

export const getOneNote = async (id: string): Promise<notesType> => {
  // Creamos la función para traer una sola nota
  const db = await upDB();

  try {
    const note = db.data.notes.find((note: notesType) => note.id === id); // La buscamos en la base de datos

    return note; // Y la devolvemos si la encontró
  } catch (error) {
    throw new Error("Note not found");
  }
};

export const createNote = async (note: notesType): Promise<notesType> => {
  // Creamos la nota en base a los datos enviados
  const db = await upDB();

  db.data.notes.push(note); // Agregamos la nueva nota

  await db.write(); // Guardamos los datos en el archivo

  return note; // Y devolvemos la nota
};

export const updateNote = async (
  // Creamos la función para editar la nota, recibiendo la nueva nota
  noteForUpdate: notesType,
): Promise<notesType | Error> => {
  const db = await upDB();

  const noteIndex = db.data.notes.findIndex(
    (note: notesType) => note.id === noteForUpdate.id, // Buscamos la nota por el ID
  );

  if (noteIndex === -1) {
    throw new Error("Note not found"); // Manejamos el error si no lo encuentra
  }

  db.data.notes[noteIndex] = noteForUpdate; // Y si lo encuentra lo editamos

  await db.write(); // Guardamos la nota editada

  return noteForUpdate; // Y la devolvemos
};

export const deleteNote = async (
  // Creamos la función para eliminar una nota por ID
  noteID: string,
): Promise<notesType | Error> => {
  const db = await upDB();

  const noteIndex = db.data.notes.findIndex(
    // Buscamos la nota por ID
    (note: notesType) => note.id === noteID,
  );

  const noteInDB = db.data.notes[noteIndex]; // Y la guardamos para devolverla

  if (noteIndex === -1) {
    throw new Error("Note not found");
  }

  db.data.notes.splice(noteIndex, 1); // Si existe la eliminamos

  await db.write(); // Y guardamos los cambios

  return noteInDB;
};
```

Por ultimo usamos estas para manejar las respuestas de la API.

```ts
import type { Request, Response } from "express"; // Importamos los tipos
import asyncHandler from "express-async-handler"; // Importamos el handler para las llamadas asíncronas
import {
  // Y las funciones
  createNote,
  deleteNote,
  getAllNotes,
  getOneNote,
  updateNote,
} from "../../services/handleNotes";
import type { notesType } from "../../../types/dict";
import { isValid } from "../../services/functions"; // Además de la función para comprobar si es un dato valido

const notesController = {
  // ==================== GET ====================

  // Get all notes

  GET_getAllNotes: asyncHandler(async (_req, res, _next): Promise<any> => {
    // Envolvemos la función en el handler
    try {
      const notesFromDB = await getAllNotes(); // Utilizamos la función
      return res.json(notesFromDB);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error });
    }
  }), // Get one note

  GET_getOneNote: asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const noteID = req.params.id;

      if (noteID === undefined) {
        return res
          .status(400)
          .json({ message: "data must contain 'id' and 'title' and 'content" });
      }

      try {
        const foundNote = await getOneNote(noteID);

        return res.json({ message: "Note found", note: foundNote });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
      }
    },
  ), // ==================== POST ==================== // Create new note

  POST_createNote: asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { title, content } = req.body;

      if (title === undefined || content === undefined) {
        // Si no hay datos
        return res
          .status(400)
          .json({ message: "data must contain 'title' and 'content" }); // Devolvemos el error
      }
      try {
        const newNote = { id: crypto.randomUUID(), title, content }; // Creamos el ID automáticamente

        const createdNote = await createNote(newNote);

        return res
          .status(200)
          .json({ message: "Note created successfully", note: createdNote });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
      }
    },
  ), // ==================== PUT ==================== // Update one note

  PUT_updateNote: asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body: notesType = req.body;

      if (typeof body.id !== "string") {
        return res.status(400).json({ message: "'id' must be a string" });
      }

      if (!isValid(body)) {
        // Comprobamos que sea un dato válido
        return res
          .status(400)
          .json({ message: "id, title, and content must not be empty" });
      }

      try {
        const updatedNote = await updateNote(body);

        return res.json({
          message: "note updated successfully",
          note: updatedNote,
        });
      } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error });
      }
    },
  ), // ==================== DELETE ==================== // Delete one note

  DELETE_deleteNote: asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body: { id: string } = req.body;

      if (typeof body.id !== "string") {
        return res.status(400).json({ message: "'id' must be a string" });
      }

      if (body.id === undefined) {
        return res.status(400).json({ message: "id must not be empty" });
      }

      try {
        // Search by id, if note exist delete note, else return error
        const deletedNote = await deleteNote(body.id);
        return res.json({
          message: "Note deleted successfully",
          note: deletedNote,
        });
      } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error });
      }
    },
  ),
};

export default notesController;
```

Por ultimo la función para comprobar si es valido es la siguiente.

```ts
import { type notesType } from "../../types/dict"; // Importamos los tipos

function isNote(note: object | notesType): note is notesType {
  // Comprobamos qu sea una nota
  return (note as notesType).id !== undefined;
}

export const isValid = (args: object): boolean => {
  if (isNote(args)) {
    // Si es una nota valida
    if (typeof args.id !== "string") {
      // Buscamos que contenga un ID
      console.log("no string");
      return false;
    }
  }

  return Object.values(args).every(
    (value) => value !== null && value !== undefined && value?.trim() !== "", // Sino comprobamos que los datos sean validos
  );
};
```

## Testing

Siempre es buena practica crear tests para nuestra API, para ello crearemos los mismos en el directorio `src/__TESTS__/`.
Para empezar crearemos los tests de las rutas en el siguiente directorio `src/__TESTS__/routes/notesRoutes.test.ts`, el cual quedará de la siguiente manera.

```ts
import { spec, request } from "pactum"; // Importamos los módulos

describe("notes", async () => {
  request.setBaseUrl("http://localhost:5000"); // Creamos la base

  describe("GET /api/notes -- Get notes", () => {
    // Y las urls completas
    // Get all notes

    it("should return 200", async () => {
      const res = await spec().get("/api/notes").toss();

      expect(res.statusCode).toBe(200);
    });

    it("should return a json object", async () => {
      const res = await spec().get("/api/notes").toss();

      expect(res.headers["content-type"]).toContain("application/json");
    });
  });

  describe("POST /api/notes -- Create notes", () => {
    it("should throw if data is not passed", async () => {
      const res = await spec()
        .post("/api/notes")
        .withBody({ title: "test" })
        .toss();

      expect(res.statusCode).toBe(400);
    });
  });

  describe("PUT /api/notes/ -- Update notes", () => {
    it("should throw if id is not passed", async () => {
      const res = await spec().put("/api/notes").toss();
      expect(res.statusCode).toBe(400);
    });

    it("should throw if id is passed but note is not found", async () => {
      const res = await spec()
        .put("/api/notes")
        .withBody({ id: "1", title: "test", content: "test" });
      expect(res.statusCode).toBe(404);
    });

    it("should throw if data is invalid", async () => {
      const dataOptions = [
        {
          id: "fabb82f1-a689-4875-a3b4-f4550e9e7f57",
          title: "",
        },
        {
          id: "fabb82f1-a689-4875-a3b4-f4550e9e7f57",
          title: null,
        },
        {
          id: "fabb82f1-a689-4875-a3b4-f4550e9e7f57",
          content: "",
        },
        {
          id: "fabb82f1-a689-4875-a3b4-f4550e9e7f57",
          title: "",
          content: "",
        },
        {
          id: "fabb82f1-a689-4875-a3b4-f4550e9e7f57",
          title: "test",
          content: "",
        },
        {
          id: "fabb82f1-a689-4875-a3b4-f4550e9e7f57",
          title: "",
          content: "test",
        },
        {
          id: 1,
          title: "",
          content: "test",
        },
      ];

      for (let index = 0; index < dataOptions.length; index++) {
        const element = dataOptions;
        const res = await spec().put("/api/notes").withBody(element);
        expect(res.statusCode).toBe(400);
      }
    });
  });

  describe("DELETE /api/notes/ -- Delete notes", () => {
    it("should throw if id is not passed", async () => {
      const res = await spec().delete("/api/notes").toss();
      expect(res.statusCode).toBe(400);
    });

    it("should throw if note is not found", async () => {
      const res = await spec().delete("/api/notes").withBody({ id: "1" });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("Test full functionality", () => {
    it("should create, edit, and delete a note", async () => {
      // create a note

      const data = {
        title: "test",
        content: "test",
      };

      const createNoteRes = await spec()
        .post("/api/notes")
        .withBody(data)
        .toss();

      expect(createNoteRes.statusCode).toBe(200);
      expect(createNoteRes.body).toBeInstanceOf(Object); // get all notes

      const getNotesRes = await spec().get("/api/notes");

      expect(getNotesRes.statusCode).toBe(200);
      expect(getNotesRes.body).toBeInstanceOf(Array); // edit created note

      const dataToEdit = {
        id: createNoteRes.body.note.id,
        title: "edit",
        content: "edit",
      };

      const editNoteRes = await spec()
        .put("/api/notes")
        .withBody(dataToEdit)
        .toss();

      expect(editNoteRes.statusCode).toBe(200);
      expect(editNoteRes.body.note.title).toBe("edit"); // delete created note

      const deleteNoteRes = await spec()
        .delete("/api/notes")
        .withBody({ id: createNoteRes.body.note.id })
        .toss();

      expect(deleteNoteRes.statusCode).toBe(200);
      expect(deleteNoteRes.body).toBeInstanceOf(Object);
    });
  });
});
```

Además podemos comprobar la validación individualmente creando el directorio `__TESTS__/services/functions.test.ts`, el cual quedará de la siguiente manera.

```ts
import { isValid } from '../../services/functions' // Importamos la función

describe('functions', () => { // Creamos los tests

  it('should be false if data is not passed', () => { // Si no se pasa ningún dato
    expect(isValid({})).toBe(false)
  })

  it('should be false if data is empty or invalid', () => { // Si los datos son inválidos
    const dataOptions = [
      {
        title: '',
        content: 'test',
      },
      {
        title: '',
        content: '',
      },
      {
        title: null,
        content: '',
      },
      {
        title: '',
        content: null,
      },
      {
        title: 'valid',
        content: '',
      },
      {
        title: '',
        content: 'valid',
      },
      {
        title: null,
        content: 'valid',
      },
      {
        title: null,
        content: null,
      },
    ]

    dataOptions.forEach(data => {
      expect(isValid(data)).toBe(false)
    })
  })

  it('should be true if data is valid', () => { // Y si los datos son validos
    const testData = [
      {
        id: 'fabb82f1-a689-4875-a3b4-f4550e9e7f57',
        title: 'test',
        content: 'test',
      },
      {
        title: 'test',
        content: 'test',
      },
    ]

    expect(isValid(testData)).toBe(true)
  }
})
```
