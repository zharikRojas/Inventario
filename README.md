
# Sistema de Inventario

Este es un sistema de inventario completo con un frontend de React (`client`) y un backend de Node.js (`server`), diseñado para gestionar productos, facturas y pedidos.

## Tecnologías Utilizadas

### Frontend (Client)
-   **Lenguaje:** JavaScript (ES6+)
-   **Framework/Librería:** React `^18.3.1`
-   **Bundler:** Vite `^7.1.2`
-   **UI Framework:** Ant Design `^5.27.1`
-   **Enrutamiento:** React Router DOM `^7.8.2`
-   **Estilos:** Sass `^1.91.0`

### Backend (Server)
-   **Entorno de ejecución:** Node.js (se recomienda v18.x o superior)
-   **Framework:** Express `^5.1.0`
-   **ORM:** Sequelize `^6.37.7`
-   **Base de Datos:** MySQL
-   **Driver MySQL:** mysql2 `^3.14.3`

## Instalación y Puesta en Marcha

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos
-   [Node.js](https://nodejs.org/) (v18.x o superior)
-   [Git](https://git-scm.com/)
-   Un servidor de base de datos [MySQL](https://www.mysql.com/) en ejecución.

### 1. Clonar el Repositorio
```sh
git clone https://github.com/zharikRojas/Inventario.git
cd Inventario
```

### 2. Configurar el Backend (Server)
1.  Navega al directorio del servidor:
    ```sh
    cd server
    ```
2.  Instala las dependencias:
    ```sh
    npm install
    ```
3.  Configura la conexión a tu base de datos en el archivo `server/config/config.js`.
4.  Ejecuta el *seeder* para poblar la base de datos con roles y usuarios de prueba:
    ```sh
    npm run db:seed
    ```

### 3. Configurar el Frontend (Client)
1.  Desde la raíz del proyecto, navega al directorio del cliente:
    ```sh
    cd ../client
    ```
2.  Instala las dependencias:
    ```sh
    npm install
    ```
3.  Crea un archivo `.env` en la raíz de la carpeta `client` y añade la siguiente variable de entorno para conectar con el backend:
    ```
    VITE_REACT_APP_API_URL=http://localhost:3000
    ```

## Ejecutar la Aplicación

Debes tener dos terminales abiertas, una para el servidor y otra para el cliente.

1.  **Iniciar el Servidor:**
    -   En el directorio `server`, ejecuta:
        ```sh
        npm run dev
        ```
    -   El servidor se iniciará en `http://localhost:3000`.

2.  **Iniciar el Cliente:**
    -   En el directorio `client`, ejecuta:
        ```sh
        npm run dev
        ```
    -   La aplicación de React se abrirá en `http://localhost:5173`.

## Credenciales de Usuario para Pruebas

Puedes usar las siguientes credenciales para iniciar sesión después de haber ejecutado el *seeder*:

-   **Administrador:**
    -   **Email:** `clauPerez@example.com`
    -   **Contraseña:** `admin123`
-   **Cliente:**
    -   **Email:** `joseGomez@example.com`
    -   **Contraseña:** `client123`

