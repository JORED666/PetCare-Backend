-- ============================================
-- USUARIOS DE PRUEBA PARA DESARROLLO
-- ============================================

-- 1. ADMINISTRADOR
-- Email: admin@petcare.com
-- Password: Admin123!
INSERT INTO personal (
  id_rol, 
  nombre, 
  apellido, 
  email, 
  telefono,
  cedula_profesional,
  password_hash,
  password_temporal,
  activo,
  especialidad,
  created_at
) VALUES (
  1,  -- Rol: ADMINISTRADOR
  'Admin',
  'Principal',
  'admin@petcare.com',
  '5551234567',
  'ADMIN001',
  '$2b$10$gOxDEUVhWPbwl2RCrqgH3.7rzo.T0pIW7Nm8C4FBIkEkBv1wX5H7W',  -- Admin123!
  false,
  true,
  'Administración',
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- 2. VETERINARIO 1
-- Email: drjuan@petcare.com
-- Password: Vet123
INSERT INTO personal (
  id_rol, 
  nombre, 
  apellido, 
  email, 
  telefono,
  cedula_profesional,
  password_hash,
  password_temporal,
  activo,
  especialidad,
  created_at
) VALUES (
  2,  -- Rol: VETERINARIO
  'Juan',
  'Pérez',
  'drjuan@petcare.com',
  '5559876543',
  'VET001',
  '$2b$10$[HASH_VET123]',  -- Vet123 (reemplazar con hash real)
  false,
  true,
  'Medicina General',
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- 3. VETERINARIO 2
-- Email: dramaria@petcare.com
-- Password: Vet123
INSERT INTO personal (
  id_rol, 
  nombre, 
  apellido, 
  email, 
  telefono,
  cedula_profesional,
  password_hash,
  password_temporal,
  activo,
  especialidad,
  created_at
) VALUES (
  2,  -- Rol: VETERINARIO
  'María',
  'García',
  'dramaria@petcare.com',
  '5558765432',
  'VET002',
  '$2b$10$[HASH_VET123]',  -- Vet123 (reemplazar con hash real)
  false,
  true,
  'Cirugía Veterinaria',
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Verificar usuarios creados
SELECT 
  id_personal,
  nombre,
  apellido,
  email,
  CASE 
    WHEN id_rol = 1 THEN 'ADMINISTRADOR'
    WHEN id_rol = 2 THEN 'VETERINARIO'
  END as rol,
  especialidad,
  activo
FROM personal
WHERE email IN ('admin@petcare.com', 'drjuan@petcare.com', 'dramaria@petcare.com')
ORDER BY id_rol, nombre;

\echo '✅ Usuarios de prueba creados'
\echo ''
\echo 'CREDENCIALES:'
\echo '─────────────────────────────────────'
\echo 'ADMINISTRADOR:'
\echo '  Email: admin@petcare.com'
\echo '  Password: Admin123!'
\echo ''
\echo 'VETERINARIO 1:'
\echo '  Email: drjuan@petcare.com'
\echo '  Password: Vet123'
\echo ''
\echo 'VETERINARIO 2:'
\echo '  Email: dramaria@petcare.com'
\echo '  Password: Vet123'
\echo '─────────────────────────────────────'
