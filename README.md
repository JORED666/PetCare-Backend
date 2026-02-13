# 🐾 PetCare Backend

Sistema de gestión veterinaria - Microservicios con Node.js, TypeScript, PostgreSQL y Docker.

## 📋 Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Configuración Inicial](#configuración-inicial)
- [Servicios Disponibles](#servicios-disponibles)
- [API Endpoints](#api-endpoints)
- [Base de Datos](#base-de-datos)
- [Workflow de Git](#workflow-de-git)
- [Testing](#testing)

---

## 🛠️ Stack Tecnológico

- **Runtime:** Node.js 20+
- **Lenguaje:** TypeScript
- **Framework:** Express
- **Base de Datos:** PostgreSQL 15
- **Cache:** Redis 7
- **ORM:** Drizzle ORM
- **Autenticación:** JWT + bcrypt
- **Containerización:** Docker + Docker Compose
- **CI/CD:** GitHub Actions

---

## 🏗️ Arquitectura

```
petcare-backend/
├── services/
│   ├── auth/          # Autenticación (Puerto 3001)
│   ├── clients/       # Gestión de clientes (Puerto 3002)
│   ├── pets/          # Gestión de mascotas (Puerto 3003)
│   ├── appointments/  # Citas (Puerto 3004)
│   ├── medical/       # Historial médico (Puerto 3005)
│   └── notifications/ # Notificaciones (Puerto 3006)
├── shared/            # Código compartido
├── database/          # Schemas y seeds SQL
└── docker-compose.yml # Configuración de contenedores
```

---

## ⚙️ Configuración Inicial

### 1. Clonar el repositorio

```bash
git clone https://github.com/JORED666/PetCare-Backend.git
cd PetCare-Backend
```

### 2. Configurar variables de entorno

#### Raíz del proyecto (`.env`)

```bash
cp .env.example .env
```


#### Auth Service (`services/auth/.env`)

```bash
cp services/auth/.env.example services/auth/.env
```

### 3. Levantar Docker

```bash
docker-compose up -d
```

Verifica que estén corriendo:
```bash
docker-compose ps
```

Deberías ver:
- `petcare-postgres` en puerto 5434
- `petcare-redis` en puerto 6379

### 4. Instalar dependencias

```bash
# Auth Service
cd services/auth
npm install
```

### 5. Correr el servicio

```bash
npm run dev
```

El servicio estará corriendo en `http://localhost:3001`

---

## 🚀 Servicios Disponibles

### Auth Service (Puerto 3001)

**Estado:** ✅ Funcionando

#### Endpoints:

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | No |
| POST | `/api/auth/login` | Login de usuarios | No |
| GET | `/api/auth/me` | Obtener usuario actual | Sí (Bearer Token) |

---

## 📡 API Endpoints

### 🔐 Auth Service

#### 1. Health Check

```bash
GET http://localhost:3001/health
```

**Respuesta:**
```json
{
  "status": "ok",
  "service": "auth-service",
  "timestamp": "2026-02-13T02:08:59.212Z"
}
```

---

#### 2. Login (PERSONAL)

```bash
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "admin@petcare.com",
  "password": "Admin123",
  "tipo_usuario": "PERSONAL"
}
```

**Respuesta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "nombre": "Admin",
    "apellido": "Sistema",
    "email": "admin@petcare.com",
    "rol": "ADMIN",
    "password_temporal": false,
    "foto_perfil": null
  }
}
```

---

#### 3. Login (CLIENTE)

```bash
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "Cliente123",
  "tipo_usuario": "CLIENTE"
}
```

**Respuesta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "rol": "CLIENTE",
    "password_temporal": false,
    "foto_perfil": null
  }
}
```

---

#### 4. Obtener Usuario Actual (Protegido)

```bash
GET http://localhost:3001/api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Respuesta:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "admin@petcare.com",
    "rol": "ADMIN",
    "iat": 1770948550,
    "exp": 1771553350
  }
}
```

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
# Verificar que todo funciona
npm run dev

# Push a tu feature branch
git push origin feature/nombre-descriptivo

# Crear Pull Request en GitHub
# Esperar revisión
# Mergear a develop
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
# Health check
curl http://localhost:3001/health

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@petcare.com","password":"Admin123","tipo_usuario":"PERSONAL"}'

# Endpoint protegido
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### Probar con Postman

1. Importar colección desde `/postman/PetCare.postman_collection.json`
2. Configurar environment con `BASE_URL=http://localhost:3001`
3. Ejecutar requests

---

## 🚨 Troubleshooting

### Puerto 5434 ocupado

```bash
# Ver qué está usando el puerto
sudo lsof -i :5434

# Matar el proceso
sudo kill -9 $(sudo lsof -t -i:5434)

# Reiniciar Docker
docker-compose down
docker-compose up -d
```

### Base de datos no conecta

```bash
# Verificar que Docker esté corriendo
docker-compose ps

# Ver logs de PostgreSQL
docker-compose logs -f postgres

# Verificar DATABASE_URL en .env
cat services/auth/.env
```

### TypeScript no compila

```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar versiones
node -v  # Debe ser 20+
npm -v
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
