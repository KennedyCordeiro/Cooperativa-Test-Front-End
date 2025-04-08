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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Cooperativa } from "../types/types";
import { CooperativaService } from "../services/cooperativaService";
import ModalStyled from "./ModalStyled";
import CooperativaForm from "./CooperativaForm";

export default function CooperativaList() {
  const [cooperativas, setCooperativas] = useState<Cooperativa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentCooperativa, setCurrentCooperativa] =
    useState<Cooperativa | null>(null);

  useEffect(() => {
    carregarCooperativas();
  }, []);

  const carregarCooperativas = async () => {
    try {
      setLoading(true);
      const data = await CooperativaService.listar();
      setCooperativas(data);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar cooperativas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta cooperativa?")) {
      try {
        await CooperativaService.excluir(id);
        carregarCooperativas();
      } catch (err) {
        setError("Erro ao excluir cooperativa");
        console.error(err);
      }
    }
  };

  const handleEdit = (cooperativa: Cooperativa) => {
    setCurrentCooperativa(cooperativa);
    setEditModalOpen(true);
  };

  return (
    <>
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
                <TableCell>Descrição</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cooperativas.map((cooperativa) => (
                <TableRow key={cooperativa.id}>
                  <TableCell>{cooperativa.id}</TableCell>
                  <TableCell>{cooperativa.descricao}</TableCell>
                  <TableCell>
                    {cooperativa.ativo ? "Ativo" : "Inativo"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(cooperativa)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(cooperativa.id)}>
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
        title="Editar Cooperativa">
        {currentCooperativa && (
          <CooperativaForm
            initialData={currentCooperativa}
            onSuccess={() => {
              setEditModalOpen(false);
              carregarCooperativas();
            }}
          />
        )}
      </ModalStyled>
    </>
  );
}
