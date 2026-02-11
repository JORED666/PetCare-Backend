-- ==========================================
-- PETCARE - SCHEMA COMPLETO
-- ==========================================

-- Roles
CREATE TABLE IF NOT EXISTS roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Personal (veterinarios, admin)
CREATE TABLE IF NOT EXISTS personal (
    id_personal SERIAL PRIMARY KEY,
    id_rol INTEGER NOT NULL REFERENCES roles(id_rol),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    cedula_profesional VARCHAR(50) UNIQUE,
    especialidad VARCHAR(100),
    password_hash VARCHAR(255),
    password_temporal BOOLEAN DEFAULT TRUE,
    foto_perfil VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion TEXT,
    password_hash VARCHAR(255),
    password_temporal BOOLEAN DEFAULT FALSE,
    foto_perfil VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Especies
CREATE TABLE IF NOT EXISTS especies (
    id_especie SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Razas
CREATE TABLE IF NOT EXISTS razas (
    id_raza SERIAL PRIMARY KEY,
    id_especie INTEGER NOT NULL REFERENCES especies(id_especie),
    nombre VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Mascotas
CREATE TABLE IF NOT EXISTS mascotas (
    id_mascota SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL REFERENCES clientes(id_cliente),
    id_especie INTEGER NOT NULL REFERENCES especies(id_especie),
    id_raza INTEGER REFERENCES razas(id_raza),
    id_veterinario_cabecera INTEGER REFERENCES personal(id_personal),
    nombre VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    sexo CHAR(1),
    color VARCHAR(50),
    peso_actual DECIMAL(5,2),
    esterilizado BOOLEAN DEFAULT FALSE,
    chip VARCHAR(50),
    foto VARCHAR(255),
    observaciones TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Servicios
CREATE TABLE IF NOT EXISTS servicios (
    id_servicio SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    duracion_estimada INTEGER DEFAULT 30,
    precio DECIMAL(10,2),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Estados de cita
CREATE TABLE IF NOT EXISTS estados_cita (
    id_estado SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    color VARCHAR(7) DEFAULT '#000000',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Motivos de consulta
CREATE TABLE IF NOT EXISTS motivos_consulta (
    id_motivo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Citas
CREATE TABLE IF NOT EXISTS citas (
    id_cita SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL REFERENCES clientes(id_cliente),
    id_mascota INTEGER NOT NULL REFERENCES mascotas(id_mascota),
    id_veterinario INTEGER REFERENCES personal(id_personal),
    id_servicio INTEGER NOT NULL REFERENCES servicios(id_servicio),
    id_estado INTEGER NOT NULL REFERENCES estados_cita(id_estado) DEFAULT 1,
    id_motivo INTEGER REFERENCES motivos_consulta(id_motivo),
    fecha_hora TIMESTAMP NOT NULL,
    motivo_detalle TEXT,
    costo DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tipos de registro médico
CREATE TABLE IF NOT EXISTS tipos_registro_medico (
    id_tipo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Historial médico
CREATE TABLE IF NOT EXISTS historial_medico (
    id_historial SERIAL PRIMARY KEY,
    id_mascota INTEGER NOT NULL REFERENCES mascotas(id_mascota),
    id_veterinario INTEGER NOT NULL REFERENCES personal(id_personal),
    id_cita INTEGER REFERENCES citas(id_cita),
    id_tipo INTEGER NOT NULL REFERENCES tipos_registro_medico(id_tipo) DEFAULT 1,
    motivo_consulta TEXT,
    diagnostico TEXT,
    tratamiento TEXT,
    observaciones TEXT,
    peso DECIMAL(5,2),
    temperatura DECIMAL(4,1),
    frecuencia_cardiaca INTEGER,
    proxima_cita DATE,
    fecha_atencion TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Prescripciones
CREATE TABLE IF NOT EXISTS prescripciones (
    id_prescripcion SERIAL PRIMARY KEY,
    id_historial INTEGER NOT NULL REFERENCES historial_medico(id_historial),
    medicamento VARCHAR(200) NOT NULL,
    dosis VARCHAR(100),
    frecuencia VARCHAR(100),
    duracion VARCHAR(100),
    via_administracion VARCHAR(50),
    indicaciones TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Vacunas catálogo
CREATE TABLE IF NOT EXISTS vacunas (
    id_vacuna SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    id_especie INTEGER REFERENCES especies(id_especie),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Registro de vacunas aplicadas
CREATE TABLE IF NOT EXISTS registro_vacunas (
    id_registro SERIAL PRIMARY KEY,
    id_mascota INTEGER NOT NULL REFERENCES mascotas(id_mascota),
    id_vacuna INTEGER NOT NULL REFERENCES vacunas(id_vacuna),
    id_veterinario INTEGER REFERENCES personal(id_personal),
    id_historial INTEGER REFERENCES historial_medico(id_historial),
    numero_dosis INTEGER DEFAULT 1,
    fecha_aplicacion DATE NOT NULL,
    proxima_dosis DATE,
    lote VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tipos de notificación
CREATE TABLE IF NOT EXISTS tipos_notificacion (
    id_tipo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Notificaciones
CREATE TABLE IF NOT EXISTS notificaciones (
    id_notificacion SERIAL PRIMARY KEY,
    id_tipo INTEGER REFERENCES tipos_notificacion(id_tipo),
    id_cliente INTEGER REFERENCES clientes(id_cliente),
    id_personal INTEGER REFERENCES personal(id_personal),
    id_cita INTEGER REFERENCES citas(id_cita),
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    fecha_envio TIMESTAMP DEFAULT NOW(),
    fecha_lectura TIMESTAMP
);

-- Emails enviados
CREATE TABLE IF NOT EXISTS emails_enviados (
    id_email SERIAL PRIMARY KEY,
    destinatario VARCHAR(150) NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    tipo VARCHAR(50),
    enviado BOOLEAN DEFAULT FALSE,
    error TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);