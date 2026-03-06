import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.GATEWAY_PORT || 8080;

const FRONTEND_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// ─── Servicios internos ────────────────────────────────────────────────────
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
const CLIENTS_SERVICE = process.env.CLIENTS_SERVICE_URL || 'http://localhost:3002';
const PETS_SERVICE = process.env.PETS_SERVICE_URL || 'http://localhost:3003';
const APPOINTMENTS_SERVICE = process.env.APPOINTMENTS_SERVICE_URL || 'http://localhost:3004';

// ─── CORS global ──────────────────────────────────────────────────────────
app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Responder preflight inmediatamente
app.options('*', cors());

// ─── Health check del gateway ─────────────────────────────────────────────
app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'api-gateway',
        timestamp: new Date().toISOString(),
        routes: {
            auth: `${AUTH_SERVICE}  → /api/auth, /api/personal`,
            clients: `${CLIENTS_SERVICE} → /api/clients`,
            pets: `${PETS_SERVICE}  → /api/pets`,
            appointments: `${APPOINTMENTS_SERVICE} → /api/appointments`,
        },
    });
});

// ─── Proxy helpers ────────────────────────────────────────────────────────
const proxy = (target: string) =>
    createProxyMiddleware({
        target,
        changeOrigin: true,
        on: {
            error: (err, _req, res: any) => {
                console.error(`[Gateway] Proxy error → ${target}:`, (err as Error).message);
                res.status(502).json({ error: 'Servicio no disponible', target });
            },
        },
    });

// ─── Rutas ────────────────────────────────────────────────────────────────
app.use('/api/auth', proxy(AUTH_SERVICE));
app.use('/api/personal', proxy(AUTH_SERVICE));
app.use('/api/clients', proxy(CLIENTS_SERVICE));
app.use('/api/pets', proxy(PETS_SERVICE));
app.use('/api/appointments', proxy(APPOINTMENTS_SERVICE));

// ─── Ruta desconocida ─────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada en el gateway' });
});

app.listen(PORT, () => {
    console.log(`\n🌐 API Gateway corriendo en http://localhost:${PORT}`);
    console.log(`   → /api/auth, /api/personal  →  ${AUTH_SERVICE}`);
    console.log(`   → /api/clients              →  ${CLIENTS_SERVICE}`);
    console.log(`   → /api/pets                 →  ${PETS_SERVICE}`);
    console.log(`   → /api/appointments         →  ${APPOINTMENTS_SERVICE}`);
    console.log(`   → CORS permitido para: ${FRONTEND_ORIGIN}\n`);
});

export default app;
