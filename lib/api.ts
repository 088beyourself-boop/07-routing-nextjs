import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

const noteHubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

noteHubApi.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!token) throw new Error('NEXT_PUBLIC_NOTEHUB_TOKEN is not configured');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const response = await noteHubApi.get<FetchNotesResponse>('/notes', {
    params,
  });
  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await noteHubApi.get<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function createNote(note: CreateNoteParams): Promise<Note> {
  const response = await noteHubApi.post<Note>('/notes', note);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await noteHubApi.delete<Note>(`/notes/${noteId}`);
  return response.data;
}
