import api from "./api";
import { Cooperado } from "../types/types";

export const CooperadoService = {
  async listar(): Promise<Cooperado[]> {
    const response = await api.get("/Cooperados");
    return response.data;
  },

  async buscarPorId(id: number): Promise<Cooperado> {
    const response = await api.get(`/Cooperados/${id}`);
    return response.data;
  },

  async criar(cooperado: Omit<Cooperado, "id">): Promise<Cooperado> {
    const response = await api.post("/Cooperados", cooperado);
    return response.data;
  },

  async atualizar(
    id: number,
    cooperado: Partial<Cooperado>
  ): Promise<Cooperado> {
    const response = await api.put(`/Cooperados/${id}`, cooperado);
    return response.data;
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`/Cooperados/${id}`);
  },

  async buscarPorConta(conta: string): Promise<Cooperado[]> {
    const response = await api.get(`/Cooperados/por-conta/${conta}`);
    return response.data;
  },
};
