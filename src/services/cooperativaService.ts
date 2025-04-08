import api from "./api";
import { Cooperativa } from "../types/types";

export const CooperativaService = {
  async listar(): Promise<Cooperativa[]> {
    const response = await api.get("/Cooperativas");
    return response.data;
  },

  async criar(cooperativa: Omit<Cooperativa, "id">): Promise<Cooperativa> {
    const response = await api.post("/Cooperativas", cooperativa);
    return response.data;
  },

  async atualizar(
    id: number,
    cooperativa: Partial<Cooperativa>
  ): Promise<Cooperativa> {
    const response = await api.put(`/Cooperativas/${id}`, cooperativa);
    return response.data;
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`/Cooperativas/${id}`);
  },

  async buscarPorId(id: number): Promise<Cooperativa> {
    const response = await api.get(`/Cooperativas/${id}`);
    return response.data;
  },
};
