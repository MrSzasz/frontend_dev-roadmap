---
title: "GIT"
tags: ["linux", "terminal", "code"]
description: "GIT es un sistema de control de versiones el cual ayuda a mantener un orden entre todos los cambios y versiones de un código. Gracias a este se pueden realizar diferentes cambios o adiciones sin modificar o perjudicar al proyecto principal hasta que el mismo esté testeado."
date: 1700591140000
icon: "/icons/git.svg"
color: "#F15233"
---

## Instalación

Lo primero que se necesita hacer para trabajar con GIT es tenerlo instalado, para ello será necesario ir al [su página de descargas](https://git-scm.com/downloads), lo cual descargará todo lo necesario.

> Windows necesita instalar GIT Bash para un mejor funcionamiento del mismo

## Configuración

Lo primero que se deberá hacer luego de instalar GIT será configurar el mismo, por lo que debemos abrir la terminal de Bash y comprobar que tenemos instalado GIT.

```bash
git -v
```

Esto nos dirá la versión de Git que tenemos instalada, luego podemos empezar la configuración agregando nuestros datos de la siguiente manera.

```bash
git config --global user.name "Nombre de usuario"

// Respuesta //

git config --global user.email user@email.com

// Respuesta //

git config --global core.editor "code --wait"
```

> La flag `--global` indica que será en todos los proyectos, y el `code --wait` indica el editor predeterminado que usaremos, en este caso Visual Studio Code

Al trabajar con Windows los saltos de línea agregan dos caracteres extra al inicio de cada una de esta (CR LF), lo cual puede generar conflictos si los otros desarrolladores utilizan Mac o Linux, por lo que se tiene que configurar esto para que GIT lo cambie automáticamente.

```bash
git config --global core.autocrlf true
```

> En Linux/Mac será necesario cambiar el valor de `true` a `input`

## Flujo de trabajo

El flujo de trabajo con el que trabaja GIT se divide en 4 pasos.

|    Estado    | Descripción                                                     |
| :----------: | :-------------------------------------------------------------- |
| Código local | El código se modifica localmente en el dispositivo del Dev      |
|    Stage     | Se seleccionan los archivos para enviar al servidor             |
|    Commit    | Los archivos seleccionados finales se establecen para su subida |
|    Server    | Se suben los archivos al servidor                               |

## Comandos

La forma de trabajar con la terminal es en base a comandos, estos serán los que nos ayuden a realizar las acciones. en su mayoría son comandos que se comparten en Linux, por lo que saber estos será de gran ayuda.
Gracias a estos comandos podemos navegar entre carpetas, para ello utilizaremos `ls`, `cd`, `pwd`, y `mkdir` de la siguiente manera.

```bash
ls

// Lista de carpetas //

mkdir notas-git

// Crea la carpeta en cuestión //

cd notas-git

// Ingresamos a la carpeta //

pwd

// Nos indica el directorio donde estamos actualmente //
```

> Para salir del directorio en el que estamos debemos hacer uso de `cd ..`, y nos devolverá al directorio superior.

Con esta carpeta hecha podemos iniciar Git en el mismo con el comando `git init`, el cual creará la carpeta necesaria para el funcionamiento del mismo.

## Código

Para empezar a trabajar con GIT debemos inicializarlo, como ya estamos en la carpeta de `/notas-git` primero deberemos abrir la misma en el edito de código (`code .`) y luego creamos dos archivos llamados `notes1.txt` y `notes2.txt` (agregando un texto simple a ambos) para ver el funcionamiento de GIT.

```bash
git status

// Indica el estado de GIT en el proyecto, mostrando que el archivo no está agregado //

git add notes1.txt

// Agrega el archivo a la etapa de staging //

git status

// Nos indica que solo uno está en el estado de staging //

git add notes2.txt
```

> También es posible usar `*.txt` para agregar todos los que tengan esa extensión, agregar multiples archivos separados por un espacio y `.` para agregar todos, pero este ultimo puede generar problemas si se pierde el control de todos los archivos
> Es posible eliminar archivos de la etapa de staging con `git rm --cached nombre-del-archivo`

Ahora podemos hacer cambios en el contenido de los archivos, para poder ver como agregar los cambios.

```bash
git status -s

// Indica que tenemos archivos con cambios fuera de la etapa de staging //

git add notes1.txt notes2.txt

// Agregamos los cambios a la etapa de staging //

git rm notes2.txt

// Elimina el archivo y automáticamente hace un staging del cambio //

git mv notes1.txt notes.txt
```

> La flag `-s` nos muestra el estado en su versión resumida

## Archivos ocultos

También es posible ignorar archivos, es decir, que no se vayan al commit y por ende, no se suban al servidor. Esto se hace mayormente para los datos privados o de producción, como pueden ser certificados para una base de datos. Para hacer esto debemos crear un archivo privado como prueba y luego utilizar `.gitignore` de la siguiente manera.

```bash
touch secret-notes.txt

// Creamos el archivo que queremos que sea secreto //

touch .gitignore

// Creamos el ignore para los archivos //

ls -a

// Vemos todos los archivos, incluyendo los archivos ocultos //

git add .gitignore

// Agregamos el archivo al staging //

git commit -m 'gitignore added'

// Y hacemos un commit del mismo //
```

> `touch` sirve para crear archivos como `mkdir` crea carpetas
> La flag `-a` muestra todos los archivos ocultos

Ahora que tenemos el archivo creado podemos agregarlo en el mismo todo lo que se quiera ocultar.

```.gitignore
// Se pueden agregar archivos puntuales //

secret-note.txt

// Carpetas con todo su contenido //

secret-folder/*

// Extensiones //

*.secret
```

Al agregar los archivos ignorados en el `.gitignore` se deberá agregar el mismo con el comando que venimos usando anteriormente de la siguiente manera.

```bash
git add .gitignore

// Agregamos los cambios en el staging //

git commit -m 'secret note added to ignore'

// Hacemos el commit para que los archivos queden ignorados por completo //
```

## Cambios

Es posible ver los cambios que hay entre una versión y otra antes de subirse al staging, para ello debemos modificar el archivo `notes.txt` y usar el siguiente comando.

```bash
git diff

// Muestra los cambios actuales del archivo //

git add notes.txt

// Agregamos los cambios al staging //

git diff --staged

// Muestra los cambios de los archivos en la version de staging //
```

## Historial

Es posible ver todo el historial de cambios que llevamos hechos en nuestro proyecto gracias a Git, es decir, un `log` de todos estos, de la siguiente manera.

```bash
git log --oneline

// Muestra los mensajes de los commits junto a su referencia //
```

> Si no se utiliza la flag `--oneline` se mostraran mas datos sobre el desarrollador que lo subió, fecha, etc.

## Branches

Uno de los recursos que nos entrega Git es la posibilidad de crear ramificaciones del código de modo que los cambios o funcionalidades nuevas que querramos agregar no afecten a la rama principal, estas se llaman `branch`.
Las branches se pueden tratar como código aparte del principal, y luego se pueden agregar a la misma cuando ya hayan pasado los tests. Esto se hace de la siguiente manera.

```bash
git branch features/new-feature

// Creamos la nueva branch //

git branch

// Vemos las branchs que existen actualmente //

git checkout features/new-feature

// Nos "movemos" a la branch para seguir con el proyecto //
```

> También podemos crear y movernos con un solo comando, siendo `git checkout -b nombre-de-la-rama`

Con esta nueva branch hecha podemos hacer los cambios necesarios para agregar una nueva funcionalidad, de momento podemos crear un archivo nuevo para probar el funcionamiento.

```bash
touch newfile.txt

// Creamos el archivo //

git add newfile.txt

git commit -m "new file added to branch"

// Lo agregamos al staging y hacemos el commit //

git checkout main

// Volvemos a la rama principal //

ls

// Comprobamos que no existe el archivo newfile //

git merge features/new-feature

// Combinamos la nueva branch con la principal //

ls

// Comprobamos que el archivo se encuentra actualmente en nuestra branch principal //

git branch -d features/new-feature

// Eliminamos la branch que ya quedó obsoleta //
```

> La rama principal se llama normalmente `main`, pero también se puede encontrar como `master` en ciertos proyectos
> Las branchs que se hicieron un merge se pueden eliminar, pero al trabajar en un proyecto grande ciertas se pueden renombrar de ser necesario, en vez de eliminarlas por completo

También es posible hacer un add y commit en un solo comando, usando la flag `-am`

```bash
git commit -am 'add all + commit'

// Agrega todos los archivos y hace el commit //
```

> La desventaja de esto es que al hacer un `git add .` no se tiene control de cada uno de los archivos que se añaden

## Editar commits

Hay veces que por error se agrega un mensaje con un typo o simplemente un mensaje equivocado, esto se puede cambiar siempre y cuando sea el ultimo commit que se realizo, lo cual se puede hacer de la siguiente manera.

```bash
git commit -am 'commit'

// Agrega el commit con el typo //

git commit --amend -m 'new commit'

// Solo cambia el mensaje del ultimo commit //
```

Esto no solamente sirve para cambiar el mensaje, sino que se puede agregar otros archivos al ultimo commit con el mismo comando.

```bash
git add .

// Agregamos todos los archivos al commit //

git commit --amend --no-edit

// Agregamos el nuevo commit con los archivos //
```

> La flag `--no-edit` indica que el ultimo mensaje se mantiene

## Alias

Es posible crear un "script" y guardarlo para su uso, por ejemplo, si queremos añadir los nuevos archivos y crear un commit podemos hacerlo de la siguiente manera.

```bash
git config --global alias.addcommit '!git add -a && git commit -m'
```

## Revert

Si necesitamos revertir un cambio de un commit podemos hacerlo de dos formas, sabiendo el código del commit o usando HEAD de la siguiente manera.

```bash
git log --oneline

// Vemos el log y elegimos el código del commit //

git revert código-del-commit

// Nos indica si queremos cambiar el mensaje y revierte el commit //

git revert HEAD

// Revierte el ultimo commit que hicimos //
```

## Stash

Si estamos trabajando en un desarrollo y tenemos que cambiar de branch para realizar unos cambios podemos "guardar" nuestros cambios temporalmente en el dispositivo sin la necesidad de subirlo a ningún lado, para esto usaremos el comando `stash` de la siguiente manera.

```bash
git stash

// Guarda los cambios temporalmente //

git stash pop

// Devuelve los cambios en los que estábamos trabajando //
```

## Github Repo - Push

Por ultimo podemos crear un repositorio en GitHub al cual subiremos el proyecto de la siguiente manera.

```bash
git remote add origin link-del-repo

// Agregamos el repositorio como origin //

git push -u origin main

// Subimos y creamos la rama principal en el repositorio //
```

Con esto ya tenemos nuestro repositorio configurado y linkeado, cada vez que necesitemos subir un cambio al mismo utilizaremos `git push`, y `git push -u origin nueva-branch` para subir una nueva branch.

## Github Repo - Pull

Normalmente al trabajar en un proyecto con otros desarrolladores se deberá tener en local la versión actualizada de la rama principal, por lo que se deberá pedir la misma al servidor de la siguiente manera.

```bash
git pull origin main

// Pedimos al servidor la rama principal actualizada //
```

> Normalmente se puede hacer solamente `git pull` para pedir la rama en la que se está trabajando actualmente

## Fuentes

- [Curso GIT by HolaMundo](https://youtu.be/VdGzPZ31ts8?si=Qj8jMlz-JTirN4uS)
- [Advanced Git commands by Fireship](https://youtu.be/ecK3EnyGD8o?si=7kRQL6uQ7DKZjCZv)
