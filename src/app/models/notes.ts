export interface NoteModel  {
  $id: string;
  name: string;
  active: boolean;
  email: string;
  city: string;
  description: string;
  route: number[][];
  age: number;
  location: number[];
  $createdAt: string;
  $updatedAt: string;
}

export interface NotesResponse {
  data: NoteModel[];
  message: string;
  total: number;
}