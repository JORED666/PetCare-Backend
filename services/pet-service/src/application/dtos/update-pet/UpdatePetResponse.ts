export interface UpdatePetResponse {
  id: number;
  id_user: number;
  especie: string;
  nombre: string;
  fecha_nacimiento?: Date | null;
  sexo?: string | null;
  peso?: number | null;
}