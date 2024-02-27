# Prueba Técnica

## Descripción

Desarrollar una aplicación web para una ips que permita la gestión de pacientes, registros médicos y exámenes de laboratorio.
El sistema cuenta con manejo de sesiones, roles y permisos. Los roles son: Administrador, Doctor y Especialista.
Los Administradores serán los encargados de crear a los demás usuarios y asignarles un rol.
Los Doctores podrán registrar a los pacientes y los registros médicos.
Los Especialistas podrán registrar los exámenes de laboratorio.

## Características

-   El sistema cuenta con un login para el acceso.
-   El sistema cuenta con un panel de administración para la creación de usuarios y asignación de roles.
-   El sistema cuenta con un panel de gestión de pacientes, registros médicos y exámenes de laboratorio.
-   El sistema cuenta con un panel de gestión de roles y permisos.

## Tecnologías

-   [React](https://reactjs.org/)
-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [JWT](https://jwt.io/)
-   [jspdf](https://parall.ax/products/jspdf)

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias del cliente y del servidor
3. Crear un archivo .env en la carpeta frontend con las siguientes variables de entorno:

```
VITE_API_URL = "http://localhost:3000/api"
```

4. Crear un archivo .env en la carpeta backend con las siguientes variables de entorno:

```
MONGODB_NAME = "ips-geo"
MONGODB_URI = "mongodb://localhost:27017/ips-geo"

SECRET_KEY = "vtpY863IlN0x"
```

5. Ejecutar el servidor

```
npm run dev
```

6. Ingresar a la dirección http://localhost:3000/api/createDefaultAdmin para crear un usuario administrador por defecto con las siguientes credenciales:

```
email: admin@admin.com
password: jp5yZciY3pn756O2
```

7. Iniciar el cliente

```
npm run dev
```

8. Ingresar a la dirección http://localhost:5173 y utilizar las credenciales del usuario administrador para ingresar al sistema.

## Cosas a tener en cuenta

-   El flujo de la información de los paciente es: Crear Paciente -> Crear Registro Médico (Sin solicitar exámen) o Crer Paciente -> Crea Registro Médico (Solicitar exámen) -> Marcar exámen como realizado -> Dar resultado del exámen.