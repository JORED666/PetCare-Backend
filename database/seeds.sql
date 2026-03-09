INSERT INTO roles (nombre_rol) VALUES
    ('ADMIN'),
    ('VETERINARIO'),
    ('USER')
ON CONFLICT (nombre_rol) DO NOTHING;
