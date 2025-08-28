# Server

Este proyecto es el backend para el sistema de inventario. Está construido con Node.js, Express, y Sequelize.

## Prerrequisitos

Asegurese de tener instalado [Node.js](https://nodejs.org/) y [MySQL](https://www.mysql.com/) en su sistema.

## Instalación

1.  Navegue al directorio `server`:
    ```sh
    cd server
    ```
2.  Instale las dependencias del proyecto:
    ```sh
    npm install
    ```
3.  Configure las variables de entorno para la base de datos en el archivo `config/config.js`.


## Ejecutar el proyecto

Para iniciar el servidor, ejecute el siguiente comando:

```sh
npm run dev
```

Esto iniciará el servidor en modo de desarrollo con `nodemon`. El servidor estará disponible en `http://localhost:3000`

## Scripts disponibles

En el directorio del proyecto, puede ejecutar:

-   `npm run db:seed`: Ejecute el seeder para poblar la base de datos con datos iniciales.
-   `npm run dev`: Inicia el servidor en modo de desarrollo.

## Credenciales de Usuario

Después de ejecutar el seeder (`npm run db:seed`), puede usar las siguientes credenciales para probar la aplicación:

### Administrador
-   **Email:** `clauPerez@example.com`
-   **Contraseña:** `admin123`

### Cliente
-   **Email:** `joseGomez@example.com`
-   **Contraseña:** `client123`

