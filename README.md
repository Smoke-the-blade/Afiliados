# 👥 Afiliados — Backend + Frontend

Proyecto simple para gestionar afiliaciones desde un formulario web, servido por un backend Node.js/Express en un único servidor. Incluye:

- Formulario para crear nuevas afiliaciones con validación en el navegador.
- Modal de éxito al crear una afiliación.
- Vista de listado para ver todas las afiliaciones guardadas en JSON.
- API REST con endpoints para verificar credenciales y crear/listar afiliados.

## 🚀 Estructura

```
Afiliados/
├─ backend/
│  └─ src/
│     ├─ app.js                # Configuración de Express y rutas
│     ├─ server.js             # Arranque del servidor y logs de URLs
│     ├─ routes/               # Routers de API
│     │  ├─ credenciales.routes.js
│     │  └─ afiliados.routes.js
│     ├─ controllers/          # Controladores de cada feature
│     │  ├─ credencialesController.js
│     │  └─ afiliadosController.js
│     ├─ services/             # Lógica de negocio y acceso a datos
│     │  ├─ companeroService.js
│     │  └─ afiliadosService.js
│     ├─ utils/                # Utilidades (validación)
│     │  └─ validation.js
│     ├─ middleware/           # Middlewares globales
│     │  ├─ errorHandler.js
│     │  └─ notFound.js
│     └─ data/
│        ├─ companeros.json    # Datos de referencia para verificación
│        └─ afiliados.json     # Afiliaciones creadas desde el front
└─ front/
   ├─ index.html               # Formulario, modal y vista de listado
   ├─ main.js                  # Validación, envío y renderizado
   └─ styles.css               # Estilos del sitio y del modal
```

## 📦 Dependencias

- Node.js 18+ (recomendado) y npm.
- En el `backend`:
  - `express`
  - `cors`
  - `dotenv`
  - `nodemon` (desarrollo)

Instalación de dependencias del backend:

```
cd backend
npm install
```

## 🔧 Configuración

- Variables de entorno (opcional):
  - `PORT` para cambiar el puerto (por defecto `3000`).
  - Archivo `.env` en `backend` (se carga automáticamente si existe).

## ▶️ Cómo levantar el servidor y ver la página

Desarrollo (recarga automática):

```
cd backend
npm run dev
```

- La terminal mostrará:
  - `URL: http://localhost:3000/`
  - `Front: http://localhost:3000/`
  - `Verificación: POST http://localhost:3000/credenciales/verificar`
- Abre `http://localhost:3000/` en el navegador para ver el formulario.

Producción (sin nodemon):

```
cd backend
npm start
```

## 🧩 API

Rutas principales:

- `POST /credenciales/verificar`
  - Body JSON:
    ```json
    {
      "numero_afiliado": 123,
      "nombre": "Juan",
      "apellido": "Pérez",
      "tipo": "permanente" // o "parcial"
    }
    ```
  - 200 OK si coincide con `companeros.json`. 400 si no coincide.

- `GET /afiliados`
  - Devuelve el contenido de `src/data/afiliados.json`.

- `POST /afiliados`
  - Crea una afiliación nueva y la persiste en `src/data/afiliados.json`.
  - Validaciones:
    - `numero_afiliado`: entero positivo, único (no duplicado).
    - `nombre`, `apellido`: texto no vacío (>= 2 chars).
    - `tipo`: `permanente` o `parcial`.
  - Respuesta 201 con el objeto creado.

## 🖥️ Uso desde el Front

- Completa el formulario y pulsa “Enviar afiliación”.
  - Si todo es correcto, se muestra un modal de éxito y se limpia el formulario.
- Pulsa “Ver lista completa” para ver todas las afiliaciones guardadas.
- Pulsa “Volver al formulario” para regresar a la pantalla inicial.

## 🛡️ Errores comunes

- `net::ERR_CONNECTION_REFUSED` al abrir `/afiliados`:
  - El servidor puede estar reiniciándose (nodemon) o caído. Verifica la terminal; reinicia `npm run dev` si es necesario.
- El modal aparece al inicio o no se cierra:
  - La clase `hidden` está aplicada a `#successModal`. Los estilos incluyen `.modal-overlay.hidden { display:none; }` para garantizar el ocultamiento.

## 📄 Licencia

Proyecto de práctica (dev/QA). Uso libre con fines educativos.
