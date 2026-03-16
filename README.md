# 🐾 PetCare Backend

Sistema de gestión veterinaria - Microservicios con Node.js, TypeScript, PostgreSQL y Docker.

## 📋 Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [URLs de Producción](#urls-de-producción)
- [Configuración Inicial](#configuración-inicial)
- [Autenticación](#autenticación)
- [API Endpoints](#api-endpoints)
  - [Auth](#-auth-service)
  - [Clientes](#-client-service)
  - [Mascotas](#-pet-service)
  - [Citas](#-citas-service)
  - [Agenda](#-agenda-service)
  - [Historial](#-historial-service)
  - [Notificaciones](#-notification-service)
- [Base de Datos](#base-de-datos)
- [Workflow de Git](#workflow-de-git)
- [Testing](#testing)

---

## 🛠️ Stack Tecnológico

- **Runtime:** Node.js 20+
- **Lenguaje:** TypeScript
- **Framework:** Express
- **Base de Datos:** PostgreSQL 15
- **ORM:** Drizzle ORM
- **Autenticación:** JWT + bcrypt + Google OAuth
- **Almacenamiento:** Cloudinary (avatares)
- **Email:** Resend
- **Containerización:** Docker + Docker Compose

---

## 🏗️ Arquitectura

```
petcare-backend/
├── gateway/                  # Punto de entrada único (Puerto 3000)
├── services/
│   ├── auth-service/         # Autenticación (Puerto 3001)
│   ├── client-service/       # Gestión de clientes (Puerto 3002)
│   ├── pet-service/          # Gestión de mascotas (Puerto 3003)
│   ├── citas-service/        # Citas (Puerto 3004)
│   ├── agenda-service/       # Agenda veterinarios (Puerto 3005)
│   ├── historial-service/    # Historial médico (Puerto 3006)
│   └── notification-service/ # Notificaciones (Puerto 3007)
├── shared/                   # Código compartido
├── database/                 # Schemas y seeds SQL
└── docker-compose.yml
```

---

## 🌐 URLs de Producción

> ⚠️ El frontend siempre debe usar la URL del **Gateway**. Nunca llamar directamente a los servicios individuales.

| Servicio | URL |
|----------|-----|
| 🚪 **Gateway** ← usar este | `https://gateway-e45z.onrender.com` |
| Auth Service | `https://petcare-backend-yl6n.onrender.com` |
| Client Service | `https://client-service-81cm.onrender.com` |
| Pet Service | `https://pet-service-zotj.onrender.com` |
| Citas Service | `https://citas-service.onrender.com` |
| Agenda Service | `https://agenda-service-h3ji.onrender.com` |
| Historial Service | `https://historial-service.onrender.com` |
| Notification Service | `https://notification-service-jr2s.onrender.com` |
| Frontend | `https://pet-care-frontend-gold.vercel.app` |

---

## ⚙️ Configuración Inicial

### 1. Clonar el repositorio

```bash
git clone https://github.com/JORED666/PetCare-Backend.git
cd PetCare-Backend
```

### 2. Configurar variables de entorno

Cada servicio necesita su propio `.env`. Ejemplo para `auth-service`:

```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/veterinaria
JWT_SECRET=tu_jwt_secret
RESEND_API_KEY=re_xxxxxxxxxxxx
FRONTEND_URL=http://localhost:3000
CLOUDINARY_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
```

Variables del gateway:

```env
AUTH_SERVICE_URL=http://localhost:3001
CLIENT_SERVICE_URL=http://localhost:3002
PET_SERVICE_URL=http://localhost:3003
CITAS_SERVICE_URL=http://localhost:3004
AGENDA_SERVICE_URL=http://localhost:3005
HISTORIAL_SERVICE_URL=http://localhost:3006
NOTIFICATION_SERVICE_URL=http://localhost:3007
CORS_ORIGIN=http://localhost:3000
```

### 3. Instalar dependencias y correr

```bash
cd services/auth-service
npm install
npm run dev
```

---

## 🔒 Autenticación

Los endpoints protegidos requieren un **Bearer Token** en el header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

El token se obtiene al hacer login y expira en **7 días**.

---

## 📡 API Endpoints

> **Base URL producción:** `https://gateway-e45z.onrender.com`
> 
> **Base URL local:** `http://localhost:3000`

---

### 🔐 Auth Service

| Método | Endpoint | Descripción | 🔒 Auth |
|--------|----------|-------------|---------|
| `POST` | `/api/auth/register` | Registrar nuevo cliente | No |
| `POST` | `/api/auth/login` | Iniciar sesión | No |
| `GET` | `/api/auth/me` | Obtener usuario actual | ✅ |
| `GET` | `/api/auth/google` | Iniciar autenticación con Google | No |
| `GET` | `/api/auth/google/callback` | Callback OAuth de Google | No |
| `POST` | `/api/auth/forgot-password` | Solicitar reset de contraseña | No |
| `POST` | `/api/auth/reset-password` | Restablecer contraseña con token | No |
| `POST` | `/api/veterinarios/registrar` | Registrar veterinario | ✅ ADMIN |
| `GET` | `/api/veterinarios/listar` | Listar veterinarios | ✅ |
| `PUT` | `/api/veterinarios/cambiar-password` | Cambiar contraseña | ✅ |

#### POST `/api/auth/register`

> Content-Type: `multipart/form-data`

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | string | ✅ | Nombre del usuario |
| `apellido` | string | ✅ | Apellido del usuario |
| `email` | string | ✅ | Correo electrónico |
| `password` | string | ✅ | Contraseña |
| `telefono` | string | ❌ | Teléfono de contacto |
| `avatar` | file | ❌ | Foto de perfil (imagen, máx. 5MB) |

Respuesta:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "rol": "USER",
    "avatar_url": "https://res.cloudinary.com/..."
  }
}
```

#### POST `/api/auth/login`

```json
{
  "email": "juan@example.com",
  "password": "MiPassword123"
}
```

Respuesta:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "rol": "CLIENTE"
  }
}
```

#### GET `/api/auth/me` 🔒

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Respuesta:

```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "juan@example.com",
    "rol": "CLIENTE",
    "iat": 1770948550,
    "exp": 1771553350
  }
}
```

#### POST `/api/auth/forgot-password`

```json
{
  "email": "juan@example.com"
}
```

#### POST `/api/auth/reset-password`

```json
{
  "token": "abc123...",
  "new_password": "NuevoPassword123"
}
```

#### PUT `/api/veterinarios/cambiar-password` 🔒

```json
{
  "password_actual": "PasswordActual",
  "password_nueva": "NuevoPassword123"
}
```

#### POST `/api/veterinarios/registrar` 🔒 ADMIN

> Soporta `multipart/form-data` para subir avatar.

```json
{
  "nombre": "Dr. Carlos",
  "apellido": "García",
  "email": "dr.carlos@petcare.com",
  "password": "VetPassword123",
  "telefono": "+52 555 987 6543",
  "cedula_profesional": "12345678",
  "especialidad": "Cirugía"
}
```

Campo adicional form-data: `avatar` (imagen, opcional, máx. 5MB)

---

### 👤 Client Service

| Método | Endpoint | Descripción | 🔒 Auth |
|--------|----------|-------------|---------|
| `GET` | `/api/clients` | Listar todos los clientes | ✅ |
| `GET` | `/api/clients/:id` | Obtener cliente por ID | ✅ |
| `PUT` | `/api/clients/:id` | Actualizar cliente | ✅ |
| `DELETE` | `/api/clients/:id` | Eliminar cliente | ✅ |

#### PUT `/api/clients/:id` 🔒

> Todos los campos son opcionales.

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "nuevo@mail.com",
  "telefono": "+52 555 000 1111"
}
```

---

### 🐶 Pet Service

| Método | Endpoint | Descripción | 🔒 Auth |
|--------|----------|-------------|---------|
| `GET` | `/api/pets` | Listar todas las mascotas | ✅ |
| `GET` | `/api/pets/:id` | Obtener mascota por ID | ✅ |
| `GET` | `/api/pets/user/:userId` | Mascotas de un usuario | ✅ |
| `POST` | `/api/pets` | Registrar nueva mascota | ✅ |
| `PUT` | `/api/pets/:id` | Actualizar mascota | ✅ |
| `DELETE` | `/api/pets/:id` | Eliminar mascota | ✅ |

#### POST `/api/pets` 🔒

```json
{
  "id_user": 1,
  "especie": "Perro",
  "nombre": "Max",
  "fecha_nacimiento": "2020-05-10",
  "sexo": "Macho",
  "peso": 12.5
}
```

> `especie`: `"Perro"` | `"Gato"`

#### PUT `/api/pets/:id` 🔒

> Todos los campos son opcionales.

```json
{
  "nombre": "Max",
  "especie": "Perro",
  "fecha_nacimiento": "2020-05-10",
  "sexo": "Macho",
  "peso": 13.0
}
```

---

### 📅 Citas Service

| Método | Endpoint | Descripción | 🔒 Auth |
|--------|----------|-------------|---------|
| `GET` | `/api/citas` | Listar todas las citas | ✅ |
| `GET` | `/api/citas/:id` | Obtener cita por ID | ✅ |
| `POST` | `/api/citas` | Crear nueva cita | ✅ |
| `PUT` | `/api/citas/:id/status` | Actualizar estado de cita | ✅ |
| `DELETE` | `/api/citas/:id` | Eliminar cita | ✅ |

#### POST `/api/citas` 🔒

```json
{
  "id_user": 1,
  "id_mascota": 3,
  "id_servicio": 2,
  "id_agenda": 10,
  "fecha": "2026-04-15",
  "observaciones_cliente": "Perro con fiebre desde ayer"
}
```

#### PUT `/api/citas/:id/status` 🔒

```json
{
  "estado": "CONFIRMADA"
}
```

> `estado`: `PENDIENTE` | `CONFIRMADA` | `CANCELADA` | `COMPLETADA`

---

### 🗓️ Agenda Service

| Método | Endpoint | Descripción | 🔒 Auth |
|--------|----------|-------------|---------|
| `GET` | `/api/agenda/veterinario/:vetId` | Agenda de un veterinario | ✅ |
| `POST` | `/api/agenda` | Crear slot de disponibilidad | ✅ |
| `PUT` | `/api/agenda/:id/status` | Actualizar estado de slot | ✅ |
| `DELETE` | `/api/agenda/:id` | Eliminar slot | ✅ |

#### POST `/api/agenda` 🔒

```json
{
  "veterinario_id": 2,
  "fecha": "2026-04-15",
  "dia_nombre": "martes",
  "hora_inicio": "09:00",
  "hora_fin": "10:00"
}
```

> `dia_nombre`: `lunes` | `martes` | `miercoles` | `jueves` | `viernes` | `sabado` | `domingo`

#### PUT `/api/agenda/:id/status` 🔒

```json
{
  "estado": "DISPONIBLE"
}
```

> `estado`: `disponible` | `ocupado` | `bloqueado`

---

### 📋 Historial Service

| Método | Endpoint | Descripción | 🔒 Auth |
|--------|----------|-------------|---------|
| `GET` | `/api/historial/mascota/:mascotaId` | Historial de una mascota | ✅ |
| `POST` | `/api/historial` | Crear registro médico | ✅ |

#### POST `/api/historial` 🔒

```json
{
  "id_mascota": 3,
  "id_cita": 7,
  "id_veterinario": 2,
  "diagnostico": "Infección leve",
  "tratamiento": "Antibióticos 7 días",
  "observaciones": "Control en una semana"
}
```

---

### 🔔 Notification Service

| Método | Endpoint | Descripción | 🔒 Auth |
|--------|----------|-------------|---------|
| `POST` | `/api/notifications/send` | Enviar notificación por email | No |

#### POST `/api/notifications/send`

```json
{
  "to": "cliente@example.com",
  "type": "CITA_CONFIRMADA",
  "data": {
    "nombre": "Juan",
    "fecha": "2026-04-15",
    "hora": "09:00",
    "servicio": "Consulta general",
    "veterinario": "Dr. Carlos García",
    "motivo": "Fiebre"
  }
}
```

> `type`: `CITA_CONFIRMADA` | `RECORDATORIO_CITA` | `BIENVENIDA` | `RESET_PASSWORD`

---

## 🗄️ Base de Datos

### Estructura

**18 tablas principales:**

- `roles` - Roles del sistema (ADMIN, VETERINARIO, CLIENTE)
- `personal` - Veterinarios y administradores
- `clientes` - Dueños de mascotas
- `especies` - Tipos de animales
- `razas` - Razas por especie
- `mascotas` - Mascotas registradas
- `servicios` - Servicios veterinarios
- `estados_cita` - Estados de las citas
- `motivos_consulta` - Motivos de consulta
- `citas` - Citas agendadas
- `tipos_registro_medico` - Tipos de registro médico
- `historial_medico` - Historial médico
- `prescripciones` - Recetas médicas
- `vacunas` - Catálogo de vacunas
- `registro_vacunas` - Vacunas aplicadas
- `tipos_notificacion` - Tipos de notificaciones
- `notificaciones` - Notificaciones del sistema
- `emails_enviados` - Log de emails

### Comandos Útiles

```bash
# Conectar a PostgreSQL
docker exec -it petcare-postgres psql -U petcare -d petcare

# Ver todas las tablas
docker exec -it petcare-postgres psql -U petcare -d petcare -c "\dt"

# Ver datos de una tabla
docker exec -it petcare-postgres psql -U petcare -d petcare -c "SELECT * FROM roles;"

# Reset completo (¡CUIDADO! Borra todos los datos)
docker-compose down -v
docker-compose up -d
```

---

## 🌿 Workflow de Git

### Estrategia de Branches

```
main           → Solo producción (protegida)
  ↑
develop        → Integración diaria del equipo
  ↑
feature/*      → Trabajo individual por feature
```

### Workflow Diario

#### 1. Por la mañana (antes de empezar)

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-descriptivo
```

#### 2. Durante el día (commits frecuentes)

```bash
git add .
git commit -m "feat: descripción del cambio"
```

#### 3. Al terminar el día (si funciona)

```bash
npm run dev

git push origin feature/nombre-descriptivo
# Crear Pull Request en GitHub → mergear a develop
```

#### 4. Actualizar tu rama local

```bash
git checkout develop
git pull origin develop
```

---

## 🧪 Testing

### Probar con curl

```bash
# Health check gateway
curl https://gateway-e45z.onrender.com/health

# Login
curl -X POST https://gateway-e45z.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@petcare.com","password":"Admin123"}'

# Endpoint protegido
curl https://gateway-e45z.onrender.com/api/auth/me \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### Probar con Postman

1. Configurar variable de entorno: `BASE_URL=https://gateway-e45z.onrender.com`
2. Hacer login y guardar el token
3. Usar `{{token}}` en los headers de endpoints protegidos

---

## 🚨 Troubleshooting

### Puerto ocupado

```bash
sudo lsof -i :3001
sudo kill -9 $(sudo lsof -t -i:3001)
```

### Base de datos no conecta

```bash
docker-compose ps
docker-compose logs -f postgres
```

### TypeScript no compila

```bash
rm -rf node_modules package-lock.json
npm install
node -v  # Debe ser 20+
```

---

## 📞 Contacto

**Equipo de Desarrollo:**
- GitHub: [JORED666/PetCare-Backend](https://github.com/JORED666/PetCare-Backend)
- GitHub: [KarolinaTrujillo/PetCare-Backend](https://github.com/JORED666/PetCare-Backend)
- GitHub: [iAndresML/PetCare-Backend](https://github.com/JORED666/PetCare-Backend)

---

## 📝 Licencia

Proyecto privado - Todos los derechos reservados © 2026