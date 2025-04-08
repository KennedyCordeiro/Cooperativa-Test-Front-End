import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import api from "../../services/api";
import { Cooperado, Cooperativa } from "../../types/types";

interface CooperadoFormProps {
  initialData?: Cooperado;
  onSuccess: () => void;
}

export default function CooperadoForm({
  initialData,
  onSuccess,
}: CooperadoFormProps) {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [contaCorrente, setContaCorrente] = useState(
    initialData?.contaCorrente || ""
  );
  const [cooperativaId, setCooperativaId] = useState(
    initialData?.cooperativaId || 0
  );
  const [ativo, setAtivo] = useState(initialData?.ativo ?? true);
  const [cooperativas, setCooperativas] = useState<Cooperativa[]>([]);

  useEffect(() => {
    api
      .get("/Cooperativas")
      .then((response) => setCooperativas(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cooperadoData = { nome, contaCorrente, cooperativaId, ativo };

    try {
      if (initialData) {
        await api.put(`/Cooperados/${initialData.id}`, cooperadoData);
      } else {
        await api.post("/Cooperados", cooperadoData);
      }
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar cooperado:", error);
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

      <TextField
        label="Conta Corrente"
        value={contaCorrente}
        onChange={(e) => setContaCorrente(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        select
        label="Cooperativa"
        value={cooperativaId}
        onChange={(e) => setCooperativaId(Number(e.target.value))}
        fullWidth
        required
        margin="normal">
        {cooperativas.map((coop) => (
          <MenuItem key={coop.id} value={coop.id}>
            {coop.descricao}
          </MenuItem>
        ))}
      </TextField>

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
        {initialData ? "Atualizar" : "Cadastrar"} Cooperado
      </Button>
    </Box>
  );
}
