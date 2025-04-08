import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import api from "../../services/api";
import { ContatoFavorito, TipoChavePix } from "../../types/types";
import PixKeyTypeSelect from "../Shared/PixKeyTypeSelect";

interface ContatoFavoritoFormProps {
  cooperadoId: number;
  initialData?: ContatoFavorito;
  onSuccess: () => void;
}

export default function ContatoFavoritoForm({
  cooperadoId,
  initialData,
  onSuccess,
}: ContatoFavoritoFormProps) {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [tipoChavePix, setTipoChavePix] = useState<TipoChavePix>(
    initialData?.tipoChavePix || TipoChavePix.CPF
  );
  const [chavePix, setChavePix] = useState(initialData?.chavePix || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contatoData = { nome, tipoChavePix, chavePix, cooperadoId };

    try {
      if (initialData) {
        await api.put(`/ContatosFavoritos/${initialData.id}`, contatoData);
      } else {
        await api.post("/ContatosFavoritos", contatoData);
      }
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar contato:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <PixKeyTypeSelect value={tipoChavePix} onChange={setTipoChavePix} />

      <TextField
        label="Chave PIX"
        value={chavePix}
        onChange={(e) => setChavePix(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {initialData ? "Atualizar" : "Cadastrar"} Contato
      </Button>
    </Box>
  );
}
