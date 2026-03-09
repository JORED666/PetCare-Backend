export interface CreatePetRequest {
  id_user: number;
  especie: 'Perro' | 'Gato';
  nombre: string;
  fecha_nacimiento?: string;
  sexo?: string;
  peso?: number;
}