---

title: "GraphQL"
tags: ["database", "back", 'code']
description: "GraphQL es un lenguaje de consulta a APIs que ayuda a que los usuarios pidan solamente los datos que sean necesarios, sin tener que pedir todo el objeto completo y luego utilizar solamente una propiedad del mismo.
GraphQL también tiene tipado, por lo que agrega una capa de seguridad por encima."
date: 1702422556000
icon: '/icons/graphql.svg'
color: "#F261C2"

---

## Instalación

Para empezar hay que crear el servidor (`npm init -y`) y luego instalar los paquetes necesarios, GraphQL y Apollo de la siguiente manera.

```bash
npm i apollo-server graphql
```

> Se utilizará `"type":"module"` en el `package.json`

## Coding

Para empezar crearemos el mockup de la base de datos en nuestro `index.js` para poder crear las llamadas de GraphQL, quedando de la siguiente manera.

```js
const users = [
  {
    name: "Mattia",
    surname: "Parisi",
    phone: "119285475",
    city: "London",
    email: "mattiaparisi@gmail.com",
    id: "af7c1fe6-d669-414e-b066-e9733f0de7a8",
  },
  {
    name: "Alessia",
    surname: "Ciccarello",
    phone: "199951244",
    city: "Manchester",
    email: "alessiaciccarello@gmail.com",
    id: "08c71152-c552-42e7-b094-f510ff44e9cb",
  },
  {
    name: "Ciccio",
    surname: "Belo",
    phone: "0980981",
    city: "Buenos Aires",
    email: "cicciobelo@gmail.com",
    id: "c558a80a-f319-4c10-95d4-4282ef745b4b",
  },
  {
    name: "Santo",
    surname: "Terranova",
    phone: "81686585",
    city: "San Francisco",
    email: "santoterranova@gmail.com",
    id: "1ad1fccc-d279-46a0-8980-1d91afd6ba67",
  },
  {
    name: "Damiano",
    surname: "Pulvirenti",
    phone: "99991294919",
    city: "Dubai",
    email: "damianopulvirenti@gmail.com",
    id: "5108babc-bf35-44d5-a9ba-de08badfa80a",
  },
  {
    name: "Enrico",
    surname: "Bruno",
    city: "Barcelona",
    email: "enricobruno@gmail.com",
    id: "2d790a4d-7c9c-4e23-9c9c-5749c5fa7fdb",
  },
];
```

## TypeDefs

Cada pedido que se hace a la base de datos se hace en base a un tipo definido de dato, para esto se utilizan los `TypeDefs`, gracias a estos podemos definir el tipo de datos que pediremos de la siguiente manera.

```js
import { gql } from "apollo-server"

const users = [...];

const typeDefs = gql `
    type User {
        name: String!
        surname: String!
        phone: String
        city: String!
        email: String!
        id: ID!
    }

    type Query {
        allUsers: [User]!
        oneUser: User!
        userCounter: Int!
    }
`
```

Como se puede ver, para definir los tipos de datos de la base de datos se utiliza un nombre cualquiera (`User` en este caso), cada uno de los datos que se devuelve tiene un tipado, sumado a esto tenemos que crear los llamados, para esto se utiliza el nombre reservado `Query`, dentro del cual indicamos los nombres de las llamadas y el tipo que de dato que devuelven.

## Resolvers

Anteriormente creamos las llamadas para las peticiones, con esto hecho será necesario crear estas llamadas, a estas mismas se le llaman `resolvers`, y se crean usando la palabra reservada indicada anteriormente.

```js
const resolvers = {
  Query: {
    allUsers: () => users,
    userCounter: () => users.length,
  },
};
```

Debemos indicar en cada uno que es lo que hace la petición, es por eso que se utiliza una función y el `return` para devolver los datos

## Servidor

Por ultimo debemos iniciar nuestro servidor de Apollo, para esto debemos crear el mismo, pasándole los tipos y resolvers de la siguiente manera.

```js
import { gql, ApolloServer } from 'apollo-server'

const users = [...];

const typeDefs = gql `
    type User {
        name: String!
        surname: String!
        phone: String
        city: String!
        email: String!
        id: ID!
    }

    type Query {
        allUsers: [User]!
        oneUser: User!
        userCounter: Int!
    }
`

const resolvers = {
    Query: {
        allUsers: () => users,
        oneUser: (userID) => users.find(user => userID === user.id),
        userCounter: () => users.length
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log('listening on ' + url)
})
```

Esto nos dará lo necesario para hacer las primeras pruebas de queries en la url que nos generó.

## Root

Gracias a la propiedad `root` que nos facilitan en los resolvers, podemos crear nuevos datos en base a los datos que ya existen, como por ejemplo, crear el dato de `nombre completo` sumando el nombre y el apellido, o para datos numéricos podemos sumar un precio y los impuestos del mismo para crear el precio final. Esto se hace agregando los datos con su tipo en los `typeDefs`, y el método en el resolver de la siguiente manera.

```js
import { gql, ApolloServer } from 'apollo-server'


const users = [...];


const typeDefs = gql `
    type User {
        name: String!
        surname: String!
        fullName: String! # Agregamos el tipo de dato
        phone: String
        city: String!
        email: String!
        id: ID!
    }

    type Query {
        allUsers: [User]!
        oneUser(name : String!): User!
        userCounter: Int!
    }
`


const resolvers = {
    Query: {
        allUsers: () => users,
        oneUser: (root, args) => {
            const { name } = args
            return users.find(user => user.name === name) || {}
        },
        userCounter: () => users.length
    },
    User: { // Agregamos el tipo User como un resolver
        fullName: (root) => `${root.name}, ${root.surname}` // Y creamos el dato usando el root como base
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log('listening on ' + url)
})
```

## Mutations

Es posible agregar datos a nuestra base de datos, para esto será necesario usar las `mutations`, la cual es la forma que tiene GraphQL para manejar los datos.

```js
import { gql, ApolloServer, UserInputError } from 'apollo-server' // Importamos los módulos para manejar errores

const users = [...];

const typeDefs = gql `
    type User {
        name: String!
        surname: String!
        fullName: String!
        phone: String
        city: String!
        email: String!
        id: ID!
    }

    type Query {
        allUsers: [User]!
        oneUser(name : String!): User!
        userCounter: Int!
    }

    type Mutation { # Creamos la mutación
        addOneUser( # Con los datos que necesitamos
            name: String!
            surname: String!
            phone: String
            city: String!
            email: String!
        ) : User # Y el dato que devuelve
    }
`


const resolvers = {
    Query: {
        allUsers: () => users,
        oneUser: (root, args) => {
            const {
                name
            } = args
            return users.find(user => user.name === name) || {}

        },
        userCounter: () => users.length
    },
   
    Mutation: { // Creamos el resolver para las mutaciones
        addOneUser: (root, args) => {
            if (users.find(userInDb => userInDb.email === args.email)) {
                throw new UserInputError("User already exists in database") // Indicamos que devolvemos cuando ya existe el usuario
            }

            const newUser = {
                id: crypto.randomUUID(),
                ...args
            } // Sino lo creamos y lo subimos a la base de datos
            users.push(newUser)
            return newUser // Devolviendo el usuario
        }
    },
   
    User: {
        fullName: (root) => `${root.name}, ${root.surname}`
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log('listening on ' + url)
})
```

Sumado a esto también es posible usar el mutation para cambiar un dato, por ejemplo, si queremos cambiar el número de una persona podemos hacerlo de la siguiente manera.

```js
import { gql, ApolloServer, UserInputError } from 'apollo-server'


const users = [...];

const typeDefs = gql `
    type User {
        name: String!
        surname: String!
        fullName: String!
        phone: String
        city: String!
        email: String!
        id: ID!
    }

    type Query {
        allUsers(): [User]!
        oneUser(name : String!): User!
        userCounter: Int!
    }

    type Mutation {
        addOneUser(
            name: String!
            surname: String!
            phone: String
            city: String!
            email: String!
        ) : User
        changePhone(email: String!, phone: String!) : User
    }
`


const resolvers = {
    Query: {
        allUsers: () => users,
        oneUser: (root, args) => {
            const {
                name
            } = args
            return users.find(user => user.name === name) || {}
        },
        userCounter: () => users.length
    },
    Mutation: {
        addOneUser: (root, args) => {
            if (users.find(userInDb => userInDb.email === args.email)) {
                throw new UserInputError("User already exists in database")
            }

            const newUser = {
                id: crypto.randomUUID(),
                ...args
            }
            users.push(newUser)
            return newUser
        },
        changePhone: (root, {
            email,
            phone
        }) => {
            const userIndexInDB = users.findIndex(user => user.email === email)

            if (userIndexInDB === -1) return null

            const userFromDB = users[userIndexInDB]

            userFromDB.phone = phone

            users[userIndexInDB] = userFromDB

            return userFromDB
        }
    },
    User: {
        fullName: (root) => `${root.name}, ${root.surname}`
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log('listening on ' + url)
})
```

## Enums

Es posible crear cierto rango de datos posibles para los parámetros que se le pasen a una query, para esto se hace uso de los enums, los cuales definen que valores puede recibir, eliminando la posibilidad de que puedan variar.

```js
import { gql, ApolloServer, UserInputError } from 'apollo-server'


const users = [...];

const typeDefs = gql `
    enum YesNo { # Creamos el enum con sus opciones
        YES
        NO
    }

    type User {
        name: String!
        surname: String!
        fullName: String!
        phone: String
        city: String!
        email: String!
        id: ID!
    }

    type Query {
        allUsers(phone: YesNo): [User]! # Indicamos que podemos pasarle un dato
        oneUser(name : String!): User!
        userCounter: Int!
    }

    type Mutation {
        addOneUser(
            name: String!
            surname: String!
            phone: String
            city: String!
            email: String!
        ) : User
        changePhone(email: String!, phone: String!) : User
    }
`


const resolvers = {
    Query: {
        allUsers: (root, { phone }) => { // Creamos el resolver

            if (!phone) return users // Si no se pasa el enum, se envía todo

            return users.filter(user => phone === "YES" ? user.phone : !user.phone) // Sino se filtran los resultados
           
            /*

            En este caso tendría el mismo resultado


            if (phone === "YES") {
                return users.filter(user => user.phone)
            } else {
                return users.filter(user => !user.phone)
            }
            */
        },
        oneUser: (root, args) => {
            const {
                name
            } = args
            return users.find(user => user.name === name) || {}

        },
        userCounter: () => users.length
    },
    Mutation: {
        addOneUser: (root, args) => {
            if (users.find(userInDb => userInDb.email === args.email)) {
                throw new UserInputError("User already exists in database")
          }


            const newUser = {
                id: crypto.randomUUID(),
                ...args
            }
            users.push(newUser)
            return newUser
        },

        changePhone: (root, { email, phone }) => {
            const userIndexInDB = users.findIndex(user => user.email === email)

            if (userIndexInDB === -1) return null


            const userFromDB = users[userIndexInDB]

            userFromDB.phone = phone

            users[userIndexInDB] = userFromDB

            return userFromDB
        }
    },
    User: {
        fullName: (root) => `${root.name}, ${root.surname}`
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({
    url
}) => {
    console.log('listening on ' + url)
})
```

## Instalación del client

Con esto hecho podemos crear nuestro cliente para hacer los pedidos desde el front. Para empezar creamos un mockup de la base de datos que creamos con el paquete `json-server` de la siguiente manera.

```bash
npm i json-server
```

Lo siguiente sería crear un archivo `bd.json` a la altura de la raíz con nuestros datos.

```json
{
  "users": [
    {
      "name": "Mattia",
      "surname": "Parisi",
      "phone": "119285475",
      "city": "London",
      "email": "mattiaparisi@gmail.com",
      "id": "af7c1fe6-d669-414e-b066-e9733f0de7a8"
    },
    {
      "name": "Alessia",
      "surname": "Ciccarello",
      "phone": "199951244",
      "city": "Manchester",
      "email": "alessiaciccarello@gmail.com",
      "id": "08c71152-c552-42e7-b094-f510ff44e9cb"
    },
    {
      "name": "Ciccio",
      "surname": "Belo",
      "phone": "0980981",
      "city": "Buenos Aires",
      "email": "cicciobelo@gmail.com",
      "id": "c558a80a-f319-4c10-95d4-4282ef745b4b"
    },
    {
      "name": "Santo",
      "surname": "Terranova",
      "phone": "81686585",
      "city": "San Francisco",
      "email": "santoterranova@gmail.com",
      "id": "1ad1fccc-d279-46a0-8980-1d91afd6ba67"
    },
    {
      "name": "Damiano",
      "surname": "Pulvirenti",
      "phone": "99991294919",
      "city": "Dubai",
      "email": "damianopulvirenti@gmail.com",
      "id": "5108babc-bf35-44d5-a9ba-de08badfa80a"
    },
    {
      "name": "Enrico",
      "surname": "Bruno",
      "city": "Barcelona",
      "email": "enricobruno@gmail.com",
      "id": "2d790a4d-7c9c-4e23-9c9c-5749c5fa7fdb"
    }
  ]
}
```

Con el archivo creado podemos organizar mejor las carpetas para crear el front, quedando las mismas de la siguiente manera.

```text
server
 |
 |-> /node_modules
 |-> bd.json
 |-> index.js
 |-> package-lock.json
 |-> package.json
client
```

Ahora debemos abrir una consola en la raíz para crear el cliente con Vite.

```bash
npm create vite@latest
```

Indicamos que será React con TypeScript y que la carpeta será `/client`.
Por ultimo debemos instalar los paquetes necesarios para el cliente de Apollo en el front.

```bash
npm i @apollo/client graphql
```

## Apollo-client

Luego de instalar el paquete deberemos ir a nuestro `main.ts` e importar el cliente de Apollo de la siguiente manera.

```tsx
import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "./index.css";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client"; // Importamos los módulos

const client = new ApolloClient({
  // Creamos el cliente
  cache: new InMemoryCache(), // Con la cache en memoria
  link: new HttpLink({
    uri: "http://localhost:4000", // Y le pasamos la url del servidor
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    {" "}
    {/* Envolvemos la app con el Provider */}    <React.StrictMode>
            <App />   {" "}
    </React.StrictMode> {" "}
  </ApolloProvider>,
);
```

> La uri normalmente se debería pasar como una variable de entorno

## Query de client

Apollo client nos da ciertos hooks para poder hacer queries desde el front, para ello será necesario usar `useQuery` en nuestro `App.tsx` de la siguiente manera.

```ts
import './App.css'
import { gql, useQuery } from '@apollo/client' // Importamos el hook
import type { UserFromDB } from './dict/Users'

const query = gql` # Creamos la query
  query {
    allUsers {
      fullName
      id
      phone
    }
  }
`

function App() {
  const { data, error, loading } = useQuery(query) // Tomamos las respuestas del hook

  return (
    <div>
      <h1>users</h1>
      {loading ? (
        <div>loading...</div> {/* Mostramos el componente si está cargando */}
      ) : (
        data?.allUsers.map((user: UserFromDB) => ( {/* O los datos */}
          <p key={user.id}>
            {user.fullName} - {user.phone}
          </p>
        ))
      )}
      {error && <div>{error.message}</div>}
    </div>
  )
}

export default App
```

Esta query se hace automáticamente cuando se inicia el proyecto, si queremos que la misma se haga solamente cuando nosotros los decidamos haremos uso del hook `useLazyQuery` de la siguiente manera.

```tsx
import "./App.css";
import { gql, useLazyQuery } from "@apollo/client";
import type { UserFromDB } from "./dict/Users";
import { useEffect, useRef, useState } from "react";

const query = gql`
  query findUserByName($userNameToSearch: String!) { # Creamos la query con las variables
    oneUser(name: $userNameToSearch) {
      fullName
      id
      phone
      city
      email
    }
  }
`;

function App() {
  const [selectedUser, setSelectedUser] = useState<UserFromDB | null>(null);
  const usernameInput = useRef<HTMLInputElement | null>(null);
  const [oneUser, result] = useLazyQuery(query);

  const handleSearch = (e: React.MouseEvent<HTMLElement>, userName: string) => {
    // Creamos la función para buscar el usuario
    e.preventDefault();
    oneUser({ variables: { userNameToSearch: userName } }); // Y usamos la función de búsqueda con los parámetros como variables
  };

  useEffect(() => {
    if (result.data) setSelectedUser(result.data.oneUser); // Si existe el usuario se guarda en el estado
  }, [result.data]);

  if (selectedUser)
    return (
      <div>
               {" "}
        <h2>
                    {selectedUser.fullName} - 🌎 {selectedUser.city}       {" "}
        </h2>
                <span>{selectedUser.email}</span>
                <br />        <small>{selectedUser.phone}</small>       {" "}
        <button
          onClick={() => {
            setSelectedUser(null);
          }}
        >
                    close        {" "}
        </button>
             {" "}
      </div>
    );

  return (
    <div>
            <h1>users</h1>     {" "}
      <form>
                {result.error && <div>{result.error.message}</div>}{" "}
        {/* Si hay un error se muestra en pantalla */}
                <input type="text" ref={usernameInput} />        <button
          onClick={(e) =>
            handleSearch(e, usernameInput.current?.value as string)
          }
        >
          {" "}
          {/* Cuando se hace click se ejecuta la query */}          search      
           {" "}
        </button>     {" "}
      </form>
         {" "}
    </div>
  );
}

export default App;
```

## Mutation del cliente

También es posible acceder a las mutaciones desde el cliente, de la misma forma que se hizo con las queries.

```tsx
import "./App.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import type { UserFromDB } from "./dict/Users";
import { useState } from "react";

const ADD_ONE_USER = gql` # Creamos la query para crear el usuario con sus variables
  mutation addOneUserToDB(
    $name: String!
    $surname: String!
    $phone: String
    $city: String!
    $email: String!
  ) {
    addOneUser(
      name: $name
      surname: $surname
      phone: $phone
      city: $city
      email: $email
    ) {
      id
      fullName
      city
      phone
      email
    }
  }
`;

const GET_ALL_USERS = gql` # Y la query para traer los datos
  query {
    allUsers {
      fullName
      email
      id
      city
      phone
    }
  }
`;

function App() {
  const [selectedUser, setSelectedUser] = useState<UserFromDB | null>(null);
  const [userDataToDB_name, setUserDataToDB_name] = useState<string>("");
  const [userDataToDB_surname, setUserDataToDB_surname] = useState<string>("");
  const [userDataToDB_phone, setUserDataToDB_phone] = useState<string>("");
  const [userDataToDB_city, setUserDataToDB_city] = useState<string>("");
  const [userDataToDB_email, setUserDataToDB_email] = useState<string>(""); // Creamos los estados para los datos
  const [errorFromGQL, setErrorFromGQL] = useState<string>("");
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [addOneUserToDB] = useMutation(ADD_ONE_USER, {
    // Traemos la mutación y le pasamos la query
    refetchQueries: [{ query: GET_ALL_USERS }], // Le pasamos la query para traer los usuarios nuevamente cuando se hace la mutación
  });

  const handleSetUser = (user: UserFromDB): void => {
    setSelectedUser(user);
  };

  const handleAddUser = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    addOneUserToDB({
      // Utilizamos la mutación
      variables: {
        name: userDataToDB_name,
        surname: userDataToDB_surname,
        phone: userDataToDB_phone,
        city: userDataToDB_city,
        email: userDataToDB_email,
      }, // Con los datos del usuario
    })
      .then(() => {
        setUserDataToDB_name("");
        setUserDataToDB_surname("");
        setUserDataToDB_city("");
        setUserDataToDB_phone("");
        setUserDataToDB_email("");
      }) // Y reiniciamos los formularios
      .catch((error) => {
        setErrorFromGQL(error.message); // Si hay un error lo guardamos por 5"
        setTimeout(() => {
          setErrorFromGQL("");
        }, 5000);
      });
  };

  if (selectedUser)
    return (
      <div>
               {" "}
        <h2>
                    {selectedUser.fullName} - 🌎 {selectedUser.city}       {" "}
        </h2>
                <span>{selectedUser.email}</span>
                <br />        <small>{selectedUser.phone}</small>       {" "}
        <button
          onClick={() => {
            setSelectedUser(null);
          }}
        >
                    close        {" "}
        </button>
             {" "}
      </div>
    );

  return (
    <div>
            <h1>users</h1>     {" "}
      <form>
                {errorFromGQL && <div>{errorFromGQL}</div>}{" "}
        {/* Si hay un error lo mostramos */}
                <input
          type="text"
          placeholder="name"
          value={userDataToDB_name}
          onChange={(e) => {
            setUserDataToDB_name(e.target.value);
          }}
        />        <input
          type="text"
          placeholder="surname"
          value={userDataToDB_surname}
          onChange={(e) => {
            setUserDataToDB_surname(e.target.value);
          }}
        />        <input
          type="text"
          placeholder="phone"
          value={userDataToDB_phone}
          onChange={(e) => {
            setUserDataToDB_phone(e.target.value);
          }}
        />        <input
          type="text"
          placeholder="city"
          value={userDataToDB_city}
          onChange={(e) => {
            setUserDataToDB_city(e.target.value);
          }}
        />        <input
          type="text"
          placeholder="email"
          value={userDataToDB_email}
          onChange={(e) => {
            setUserDataToDB_email(e.target.value);
          }}
        />        <button onClick={(e) => handleAddUser(e)}>add</button>   
         {" "}
      </form>
            {loading ? (
        <div>loading...</div>
      ) : (
        data?.allUsers.map((user: UserFromDB) => (
          <p key={user.id} onClick={() => handleSetUser(user)}>
                        {user.fullName} - {user.phone}         {" "}
          </p>
        ))
      )}      {error && <div>{error.message}</div>}   {" "}
    </div>
  );
}

export default App;
```

## Organización

Teniendo todas las funcionalidades hechas podemos organizar todo en diferentes archivos, quedando los mismos de la siguiente manera.

```text
src
 |-> assets
 |-> components
   |-> UserInput
     |-> UserInput.tsx
 |-> custom-hooks
  |-> useUserData.ts
 |-> dict
 |-> users
   |-> graphql-mutations.ts
   |-> graphql-queries.ts
```

Con esto organizado cada archivo quedaría de la siguiente manera.

> _components/UserInput/UserInput.tsx_

```tsx
type UserInputType = {
  inputPlaceholder: string;
  inputValue: string;
  onChangeFn: (param: string) => void;
};

const UserInput = ({
  inputPlaceholder,
  inputValue,
  onChangeFn,
}: UserInputType) => {
  return (
    <input
      type="text"
      placeholder={inputPlaceholder}
      value={inputValue}
      onChange={(e) => onChangeFn(e.target.value)}
    />
  );
};

export default UserInput;
```

> _custom-hooks/useUserData.ts_

```ts
import { useState } from "react";

export const useUserData = () => {
  const [userDataToDB_name, setUserDataToDB_name] = useState<string>("");
  const [userDataToDB_surname, setUserDataToDB_surname] = useState<string>("");
  const [userDataToDB_phone, setUserDataToDB_phone] = useState<string>("");
  const [userDataToDB_city, setUserDataToDB_city] = useState<string>("");
  const [userDataToDB_email, setUserDataToDB_email] = useState<string>("");

  return {
    userData: {
      data: {
        name: userDataToDB_name,
        surname: userDataToDB_surname,
        phone: userDataToDB_phone,
        city: userDataToDB_city,
        email: userDataToDB_email,
      },
      functions: {
        setName: setUserDataToDB_name,
        setSurname: setUserDataToDB_surname,
        setPhone: setUserDataToDB_phone,
        setCity: setUserDataToDB_city,
        setEmail: setUserDataToDB_email,
      },
    },
  };
};
```

> _users/graphql-mutations.ts_

```ts
import { gql } from "@apollo/client";

export const ADD_ONE_USER = gql`
  mutation addOneUserToDB(
    $name: String!
    $surname: String!
    $phone: String
    $city: String!
    $email: String!
  ) {
    addOneUser(
      name: $name
      surname: $surname
      phone: $phone
      city: $city
      email: $email
    ) {
      id
      fullName
      city
      phone
      email
    }
  }
`;
```

> _users/graphql-queries.ts_

```ts
import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query {
    allUsers {
      fullName
      email
      id
      city
      phone
    }
  }
`;

export const GET_ONE_USER = gql`
  query findUserByName($userNameToSearch: String!) {
    oneUser(name: $userNameToSearch) {
      fullName
      id
      phone
      city
      email
    }
  }
`;
```

> App.tsx

```tsx
import "./App.css";
import { useMutation, useQuery } from "@apollo/client";
import type { UserFromDB } from "./dict/Users";
import { useState } from "react";
import { GET_ALL_USERS } from "./users/graphql-queries";
import { ADD_ONE_USER } from "./users/graphql-mutations";
import { useUserData } from "./custom-hooks/useUserData";
import UserInput from "./components/UserInput/UserInput";

function App() {
  const [selectedUser, setSelectedUser] = useState<UserFromDB | null>(null);
  const [errorFromGQL, setErrorFromGQL] = useState("");
  const { userData } = useUserData();

  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [addOneUserToDB] = useMutation(ADD_ONE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  const handleSetUser = (user: UserFromDB): void => {
    setSelectedUser(user);
  };

  const handleAddUser = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    addOneUserToDB({
      variables: {
        name: userData.data.name,
        surname: userData.data.surname,
        phone: userData.data.phone,
        city: userData.data.city,
        email: userData.data.email,
      },
    })
      .then(() => {
        userData.functions.setName("");
        userData.functions.setSurname("");
        userData.functions.setCity("");
        userData.functions.setPhone("");
        userData.functions.setEmail("");
      })
      .catch((error) => {
        setErrorFromGQL(error.message);
        setTimeout(() => {
          setErrorFromGQL("");
        }, 5000);
      });
  };

  if (selectedUser)
    return (
      <div>
               {" "}
        <h2>
                    {selectedUser.fullName} - 🌎 {selectedUser.city}       {" "}
        </h2>
                <span>{selectedUser.email}</span>
                <br />        <small>{selectedUser.phone}</small>       {" "}
        <button
          onClick={() => {
            setSelectedUser(null);
          }}
        >
                    close        {" "}
        </button>
             {" "}
      </div>
    );

  return (
    <div>
            <h1>users</h1>     {" "}
      <form>
                {errorFromGQL && <div>{errorFromGQL}</div>}
                <UserInput
          inputPlaceholder="name"
          inputValue={userData.data.name}
          onChangeFn={userData.functions.setName}
        />        <UserInput
          inputPlaceholder="surname"
          inputValue={userData.data.surname}
          onChangeFn={userData.functions.setSurname}
        />        <UserInput
          inputPlaceholder="phone"
          inputValue={userData.data.phone}
          onChangeFn={userData.functions.setPhone}
        />        <UserInput
          inputPlaceholder="city"
          inputValue={userData.data.city}
          onChangeFn={userData.functions.setCity}
        />        <UserInput
          inputPlaceholder="email"
          inputValue={userData.data.email}
          onChangeFn={userData.functions.setEmail}
        />        <button onClick={(e) => handleAddUser(e)}>add</button>   
         {" "}
      </form>
            {loading ? (
        <div>loading...</div>
      ) : (
        data?.allUsers.map((user: UserFromDB) => (
          <p key={user.id} onClick={() => handleSetUser(user)}>
                        {user.fullName} - {user.phone}         {" "}
          </p>
        ))
      )}      {error && <div>{error.message}</div>}   {" "}
    </div>
  );
}

export default App;
```

## Fuentes

- [Curso GRAPHQL by Midudev 🔗](https://youtube.com/playlist?list=PL2i4CEznA8jWqp8nsonAjddiN4XctqIuh&si=YizVnRyIxCu7Bk5j)
