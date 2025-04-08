import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import api from "../../services/api";
import { Cooperativa } from "../../types/types";

interface CooperativaFormProps {
  initialData?: Cooperativa;
  onSuccess: () => void;
}

export default function CooperativaForm({
  initialData,
  onSuccess,
}: CooperativaFormProps) {
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [ativo, setAtivo] = useState(initialData?.ativo ?? true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cooperativaData = { descricao, ativo };

    try {
      if (initialData) {
        await api.put(`/Cooperativas/${initialData.id}`, cooperativaData);
      } else {
        await api.post("/Cooperativas", cooperativaData);
      }
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar cooperativa:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={ativo}
            onChange={(e) => setAtivo(e.target.checked)}
          />
        }
        label="Ativo"
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {initialData ? "Atualizar" : "Cadastrar"} Cooperativa
      </Button>
    </Box>
  );
}
