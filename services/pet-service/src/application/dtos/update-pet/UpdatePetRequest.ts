export interface UpdatePetRequest {
  nombre?: string;
  especie?: 'Perro' | 'Gato';
  fecha_nacimiento?: string;
  sexo?: string;
  peso?: number;
}