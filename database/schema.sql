  -- VETERINARIA DATABASE SCHEMA

  CREATE TYPE dias_semana AS ENUM (
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  );

  CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
  );

  INSERT INTO roles (nombre_rol) VALUES ('ADMIN'), ('VETERINARIO'), ('USER');

  CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    id_rol INTEGER NOT NULL REFERENCES roles(id_rol),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE veterinarios (
    id_veterinario SERIAL PRIMARY KEY,
    id_rol INTEGER NOT NULL REFERENCES roles(id_rol),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    cedula_profesional VARCHAR(50),
    especialidad VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE agenda_veterinaria (
    id SERIAL PRIMARY KEY,
    veterinario_id INTEGER NOT NULL REFERENCES veterinarios(id_veterinario),
    fecha DATE NOT NULL,
    dia_nombre dias_semana NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'disponible',
    creado_en TIMESTAMP DEFAULT NOW(),
    CONSTRAINT estado_agenda_check CHECK (estado IN ('disponible', 'reservado', 'cancelado'))
  );

  CREATE TABLE mascotas (
    id_mascota SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES users(id_user),
    especie VARCHAR(10) NOT NULL CHECK (especie IN ('Perro', 'Gato')),
    nombre VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    sexo VARCHAR(10),
    peso DECIMAL(5,2),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE servicios (
    id_servicio SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
  );

  CREATE TABLE citas (
    id_cita SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES users(id_user),
    id_mascota INTEGER NOT NULL REFERENCES mascotas(id_mascota),
    id_servicio INTEGER NOT NULL REFERENCES servicios(id_servicio),
    id_veterinario INTEGER REFERENCES veterinarios(id_veterinario),
    id_agenda INTEGER REFERENCES agenda_veterinaria(id),
    fecha TIMESTAMP NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    observaciones_cliente TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT estado_cita_check CHECK (estado IN ('PENDIENTE', 'CONFIRMADA', 'ATENDIDA', 'CANCELADA'))
  );

  CREATE TABLE vacunas (
    id_vacuna SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
  );

  CREATE TABLE vacunaciones (
    id_vacunacion SERIAL PRIMARY KEY,
    id_cita INTEGER NOT NULL REFERENCES citas(id_cita),
    id_mascota INTEGER NOT NULL REFERENCES mascotas(id_mascota),
    id_vacuna INTEGER NOT NULL REFERENCES vacunas(id_vacuna),
    id_veterinario INTEGER NOT NULL REFERENCES veterinarios(id_veterinario),
    fecha TIMESTAMP NOT NULL DEFAULT NOW(),
    notas TEXT
  );

  CREATE TABLE historial_mascotas (
    id_historial SERIAL PRIMARY KEY,
    id_mascota INTEGER NOT NULL REFERENCES mascotas(id_mascota),
    id_cita INTEGER NOT NULL REFERENCES citas(id_cita),
    id_veterinario INTEGER NOT NULL REFERENCES veterinarios(id_veterinario),
    fecha TIMESTAMP NOT NULL DEFAULT NOW(),
    diagnostico TEXT,
    tratamiento TEXT,
    observaciones TEXT
  );

  CREATE TABLE IF NOT EXISTS reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
  );
