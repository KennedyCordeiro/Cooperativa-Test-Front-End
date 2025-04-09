import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Cooperativa } from "../../types/types";
import { CooperativaService } from "../../services/cooperativaService";

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

    try {
      if (initialData) {
        const cooperativaAtualizada: Cooperativa = {
          ...initialData,
          descricao,
          ativo,
        };
        await CooperativaService.atualizar(cooperativaAtualizada);
      } else {
        await CooperativaService.criar({ descricao, ativo });
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
