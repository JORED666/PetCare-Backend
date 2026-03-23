export interface Pet {
  id: number;
  id_user: number;
  especie: 'Perro' | 'Gato';
  nombre: string;
  raza?: string | null;
  fecha_nacimiento?: Date | null;
  sexo?: string | null;
  peso?: number | null;
  activo: boolean;
}