# UCB Proyecto Final — Full Stack Mod 1

Sistema web full stack desarrollado como proyecto final académico.  
El proyecto está organizado en dos partes principales: un **Backend** encargado de la lógica del servidor y conexión con base de datos, y un **Frontend** encargado de la interfaz de usuario.

<!-- BADGE_CI -->

---

## 🚀 Descripción del proyecto

Este repositorio contiene una aplicación web full stack construida con tecnologías modernas de JavaScript/TypeScript.

El sistema permite trabajar con una arquitectura separada entre cliente y servidor:

- **Frontend:** interfaz web para el usuario.
- **Backend:** API REST para gestionar la lógica de negocio y la comunicación con la base de datos.
- **Base de datos:** PostgreSQL configurado mediante variables de entorno.

---

## 📁 Estructura del proyecto

```bash
UCB-Proyecto-final---FullStack-Mod1/
│
├── Backend/          # Servidor, API y conexión a base de datos
├── Frontend/         # Aplicación web del lado del cliente
├── .gitignore        # Archivos y carpetas ignoradas por Git
└── README.md         # Documentación principal del proyecto
```

---

## 🛠️ Tecnologías utilizadas

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT para autenticación
- Variables de entorno con `.env`

### Frontend

- React
- TypeScript
- Vite
- CSS
- Consumo de API REST

### Herramientas de desarrollo

- Git
- GitHub
- Visual Studio Code
- npm

---

## ⚙️ Instalación local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina.

---

### 1. Clonar el repositorio

Abre una terminal en la carpeta donde quieras guardar el proyecto y ejecuta:

```bash
git clone https://github.com/JhousefSilva1/UCB-Proyecto-final---FullStack-Mod1.git
```

Luego entra a la carpeta del proyecto:

```bash
cd UCB-Proyecto-final---FullStack-Mod1
```

---

### 2. Verificar la estructura del proyecto

Dentro del repositorio deberías ver una estructura similar a esta:

```bash
UCB-Proyecto-final---FullStack-Mod1/
│
├── Backend/
├── Frontend/
├── .gitignore
└── README.md
```

---

## 🔧 Instalación y ejecución del Backend

### 1. Entrar a la carpeta del backend

```bash
cd Backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

Dentro de la carpeta `Backend`, crea un archivo llamado `.env`.

En Git Bash o Linux:

```bash
touch .env
```

En Windows PowerShell:

```powershell
New-Item .env
```

Agrega las siguientes variables:

```env
DATABASE_URL=
JWT_SECRET=
PORT=
```

Ejemplo de formato para `DATABASE_URL`:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos
JWT_SECRET=clave_secreta
PORT=3000
```

> Importante: no subas valores reales del archivo `.env` al repositorio.

### 4. Ejecutar el backend

```bash
npm run dev
```

El backend debería levantarse en el puerto configurado en el archivo `.env`.

Ejemplo:

```txt
http://localhost:3000
```

---

## 🎨 Instalación y ejecución del Frontend

### 1. Volver a la raíz del proyecto

Si estás dentro de `Backend`, ejecuta:

```bash
cd ..
```

### 2. Entrar a la carpeta del frontend

```bash
cd Frontend
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Crear archivo `.env`

Dentro de la carpeta `Frontend`, crea un archivo llamado `.env`.

En Git Bash o Linux:

```bash
touch .env
```

En Windows PowerShell:

```powershell
New-Item .env
```

Agrega la siguiente variable:

```env
VITE_API_URL=
```

Ejemplo:

```env
VITE_API_URL=http://localhost:3000
```

> La variable `VITE_API_URL` debe apuntar a la URL donde se está ejecutando el backend.

### 5. Ejecutar el frontend

```bash
npm run dev
```

Vite mostrará una URL parecida a esta:

```txt
http://localhost:5173
```

Abre esa URL en tu navegador.

---

## ▶️ Ejecución completa del proyecto

Para ejecutar el sistema completo necesitas tener **dos terminales abiertas**.

### Terminal 1 — Backend

Desde la raíz del proyecto:

```bash
cd Backend
npm install
npm run dev
```

### Terminal 2 — Frontend

Desde la raíz del proyecto:

```bash
cd Frontend
npm install
npm run dev
```

Luego abre el frontend en el navegador:

```txt
http://localhost:5173
```

---

## 📌 Resumen rápido de instalación

```bash
git clone https://github.com/JhousefSilva1/UCB-Proyecto-final---FullStack-Mod1.git
cd UCB-Proyecto-final---FullStack-Mod1
```

Terminal 1:

```bash
cd Backend
npm install
npm run dev
```

Terminal 2:

```bash
cd Frontend
npm install
npm run dev
```

---

## 📜 Comandos disponibles

### Backend

| Comando | Descripción |
|---|---|
| `npm install` | Instala las dependencias del backend |
| `npm run dev` | Levanta el servidor en modo desarrollo |
| `npm run build` | Genera el build de producción del backend |
| `npm test` | Corre pruebas automatizadas, pendiente para la Sesión 3 |

### Frontend

| Comando | Descripción |
|---|---|
| `npm install` | Instala las dependencias del frontend |
| `npm run dev` | Levanta la aplicación web en modo desarrollo |
| `npm run build` | Genera el build de producción del frontend |
| `npm test` | Corre pruebas automatizadas, pendiente para la Sesión 3 |

---

## 🗄️ Base de datos

El backend utiliza **PostgreSQL** como sistema de base de datos.

La conexión se configura mediante la variable de entorno:

```env
DATABASE_URL=
```

Ejemplo de formato:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos
```

> Este valor es solo una referencia de formato. No colocar credenciales reales dentro del README.

---

## 🔐 Seguridad y control de versiones

Este proyecto utiliza un archivo `.gitignore` para evitar subir archivos sensibles o innecesarios al repositorio.

Archivos y carpetas ignoradas:

```bash
node_modules/
.env
.env.local
.env.*.local
dist/
build/
.vscode/
.idea/
.DS_Store
*.log
```

También se ignoran específicamente los archivos sensibles dentro de:

```bash
Backend/.env
Frontend/.env
Backend/node_modules/
Frontend/node_modules/
Backend/dist/
Frontend/dist/
```

---

## 🔄 Integración continua

Este repositorio está siendo preparado para trabajar con CI/CD.

En próximas sesiones se agregará un pipeline con GitHub Actions para ejecutar automáticamente procesos como:

- Instalación de dependencias.
- Build del proyecto.
- Ejecución de pruebas.
- Validaciones antes de integrar cambios a `main`.

El marcador siguiente será reemplazado por el badge del pipeline:

```md
<!-- BADGE_CI -->
```

---

## 👨‍💻 Autor

**Jhousef Silva**  
Proyecto académico — Universidad Católica Boliviana  
Módulo 4: Integración y Despliegue Continuo

---

## ✅ Estado del laboratorio

- [x] Repositorio organizado en Backend y Frontend
- [x] `.gitignore` configurado
- [x] Archivos `.env` excluidos del control de versiones
- [x] `README.md` documentado
- [ ] Rama `main` protegida
- [ ] Pipeline CI configurado