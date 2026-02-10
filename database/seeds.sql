-- ==========================================
-- SEEDS - DATOS INICIALES
-- ==========================================

-- Roles
INSERT INTO roles (nombre_rol, descripcion) VALUES
    ('ADMIN', 'Administrador del sistema'),
    ('VETERINARIO_ADMIN', 'Veterinario jefe con gestión de personal'),
    ('VETERINARIO', 'Veterinario regular'),
    ('CLIENTE', 'Dueño de mascotas')
ON CONFLICT (nombre_rol) DO NOTHING;

-- Especies
INSERT INTO especies (nombre) VALUES
    ('Perro'),
    ('Gato'),
    ('Conejo'),
    ('Ave'),
    ('Reptil'),
    ('Pez'),
    ('Otro')
ON CONFLICT (nombre) DO NOTHING;

-- Razas perros
INSERT INTO razas (id_especie, nombre) VALUES
    (1, 'Labrador'),
    (1, 'Golden Retriever'),
    (1, 'Bulldog'),
    (1, 'Poodle'),
    (1, 'Chihuahua'),
    (1, 'Pastor Alemán'),
    (1, 'Beagle'),
    (1, 'Rottweiler'),
    (1, 'Mestizo');

-- Razas gatos
INSERT INTO razas (id_especie, nombre) VALUES
    (2, 'Persa'),
    (2, 'Siamés'),
    (2, 'Maine Coon'),
    (2, 'Ragdoll'),
    (2, 'Bengal'),
    (2, 'Mestizo');

-- Servicios
INSERT INTO servicios (nombre, descripcion, duracion_estimada, precio) VALUES
    ('Consulta General', 'Consulta médica general', 30, 350.00),
    ('Vacunación', 'Aplicación de vacunas', 15, 200.00),
    ('Desparasitación', 'Tratamiento antiparasitario', 15, 150.00),
    ('Cirugía', 'Procedimiento quirúrgico', 120, 2000.00),
    ('Urgencias', 'Atención de emergencia', 45, 500.00),
    ('Revisión Post-operatoria', 'Seguimiento post cirugía', 20, 250.00),
    ('Baño y Estética', 'Baño y corte de pelo', 60, 300.00);

-- Estados de cita
INSERT INTO estados_cita (nombre, color) VALUES
    ('PENDIENTE', '#FFA500'),
    ('CONFIRMADA', '#4CAF50'),
    ('EN_CURSO', '#2196F3'),
    ('COMPLETADA', '#8BC34A'),
    ('CANCELADA', '#F44336')
ON CONFLICT (nombre) DO NOTHING;

-- Motivos de consulta
INSERT INTO motivos_consulta (nombre) VALUES
    ('Revisión General'),
    ('Enfermedad'),
    ('Vacunación'),
    ('Desparasitación'),
    ('Cirugía'),
    ('Urgencia'),
    ('Seguimiento'),
    ('Otro');

-- Tipos de registro médico
INSERT INTO tipos_registro_medico (nombre) VALUES
    ('CONSULTA'),
    ('VACUNA'),
    ('CIRUGIA'),
    ('URGENCIA'),
    ('SEGUIMIENTO')
ON CONFLICT (nombre) DO NOTHING;

-- Tipos de notificación
INSERT INTO tipos_notificacion (nombre) VALUES
    ('CITA_AGENDADA'),
    ('CITA_CONFIRMADA'),
    ('CITA_COMPLETADA'),
    ('CITA_CANCELADA'),
    ('RECORDATORIO_CITA'),
    ('ACCESO_OTORGADO'),
    ('VACUNA_PROXIMA'),
    ('VETERINARIO_CREADO');

-- Usuario admin por defecto
-- Password: Admin123!
INSERT INTO personal (id_rol, nombre, apellido, email, password_hash, password_temporal)
VALUES (
    1,
    'Admin',
    'Sistema',
    'admin@petcare.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
    FALSE
) ON CONFLICT (email) DO NOTHING;