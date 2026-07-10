# UCB Proyecto Final — Full Stack Mod 1

Aplicación web Full Stack desarrollada como proyecto académico.  
El sistema está dividido en dos partes: un Backend para la lógica del servidor y un Frontend para la interfaz del usuario.


[![.github/workflows/ci.yml](https://github.com/JhousefSilva1/UCB-Proyecto-final---FullStack-Mod1/actions/workflows/ci.yml/badge.svg)](https://github.com/JhousefSilva1/UCB-Proyecto-final---FullStack-Mod1/actions/workflows/ci.yml)

## 🚀 Instalación local

Clona el repositorio en tu máquina:

```bash
git clone https://github.com/JhousefSilva1/UCB-Proyecto-final---FullStack-Mod1.git
cd UCB-Proyecto-final---FullStack-Mod1
```

Instala las dependencias del Backend:

```bash
cd Backend
npm install
```

Vuelve a la raíz del proyecto:

```bash
cd ..
```

Instala las dependencias del Frontend:

```bash
cd Frontend
npm install
```

## ⚙️ Ejecución local

Para ejecutar el proyecto completo, abre dos terminales.

### Terminal 1 — Backend

```bash
cd Backend
npm run dev
```

### Terminal 2 — Frontend

```bash
cd Frontend
npm run dev
```

El Frontend normalmente estará disponible en:

```bash
http://localhost:5173
```

El Backend se ejecutará en el puerto configurado en el archivo `.env`.

## 🔐 Variables de entorno

Crear un archivo `.env` dentro de la carpeta `Backend` con las siguientes claves, sin valores reales en este documento:

```env
DATABASE_URL=
JWT_SECRET=
PORT=
```

Crear un archivo `.env` dentro de la carpeta `Frontend` con la siguiente clave:

```env
VITE_API_URL=
```

Ejemplo de referencia:

```env
VITE_API_URL=http://localhost:3000
```

> Importante: los archivos `.env` no deben subirse al repositorio.

## 📜 Comandos disponibles

### Backend

| Comando | Descripción |
|---|---|
| `npm install` | Instala las dependencias del Backend |
| `npm run dev` | Levanta el Backend en entorno de desarrollo |
| `npm run build` | Genera el build de producción del Backend |
| `npm test` | Corre las pruebas automatizadas, pendiente — Sesión 3 |

### Frontend

| Comando | Descripción |
|---|---|
| `npm install` | Instala las dependencias del Frontend |
| `npm run dev` | Levanta el Frontend en entorno de desarrollo |
| `npm run build` | Genera el build de producción del Frontend |
| `npm test` | Corre las pruebas automatizadas, pendiente — Sesión 3 |

## 🗄️ Base de datos

El Backend utiliza PostgreSQL como base de datos.

La conexión se configura mediante la variable de entorno:

```env
DATABASE_URL=
```

Ejemplo de formato:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos
```

No colocar credenciales reales dentro del README.

## 📁 Estructura del proyecto

```bash
UCB-Proyecto-final---FullStack-Mod1/
│
├── Backend/
├── Frontend/
├── .gitignore
└── README.md
```

## 🔄 Integración continua

Este repositorio está preparado para trabajar con CI/CD.

En la siguiente sesión se agregará el pipeline de GitHub Actions y el badge de estado será colocado en el marcador:

[![.github/workflows/ci.yml](https://github.com/JhousefSilva1/UCB-Proyecto-final---FullStack-Mod1/actions/workflows/ci.yml/badge.svg)](https://github.com/JhousefSilva1/UCB-Proyecto-final---FullStack-Mod1/actions/workflows/ci.yml)