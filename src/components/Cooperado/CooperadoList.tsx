import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  TextField,
  Box,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Cooperado } from "../../types/types";
import { CooperadoService } from "../../services/cooperadoService";
import CooperadoForm from "./CooperadoForm";
import { ModalStyled } from "../Shared";

export default function CooperadoList() {
  const [cooperados, setCooperados] = useState<Cooperado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [currentCooperado, setCurrentCooperado] = useState<Cooperado | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    carregarCooperados();
  }, []);

  const carregarCooperados = async () => {
    try {
      setLoading(true);
      const data = await CooperadoService.listar();
      setCooperados(data);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar cooperados");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      carregarCooperados();
      return;
    }

    try {
      setLoading(true);
      const data = await CooperadoService.buscarPorConta(searchTerm);
      setCooperados(data);
      setError(null);
    } catch (err) {
      setError("Erro ao buscar cooperados");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este cooperado?")) {
      try {
        await CooperadoService.excluir(id);
        carregarCooperados();
      } catch (err) {
        setError("Erro ao excluir cooperado");
        console.error(err);
      }
    }
  };

  const handleEdit = (cooperado: Cooperado) => {
    setCurrentCooperado(cooperado);
    setEditModalOpen(true);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Buscar por conta"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
          <Button variant="contained" onClick={handleSearch}>
            Buscar
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateModalOpen(true)}>
          Novo Cooperado
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Conta Corrente</TableCell>
                <TableCell>Cooperativa</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cooperados.map((cooperado) => (
                <TableRow key={cooperado.id}>
                  <TableCell>{cooperado.id}</TableCell>
                  <TableCell>{cooperado.nome}</TableCell>
                  <TableCell>{cooperado.contaCorrente}</TableCell>
                  <TableCell>{cooperado.cooperativaId}</TableCell>
                  <TableCell>{cooperado.ativo ? "Ativo" : "Inativo"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(cooperado)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(cooperado.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ModalStyled
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Editar Cooperado">
        {currentCooperado && (
          <CooperadoForm
            initialData={currentCooperado}
            onSuccess={() => {
              setEditModalOpen(false);
              carregarCooperados();
            }}
          />
        )}
      </ModalStyled>

      <ModalStyled
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Novo Cooperado">
        <CooperadoForm
          onSuccess={() => {
            setCreateModalOpen(false);
            carregarCooperados();
          }}
        />
      </ModalStyled>
    </>
  );
}
