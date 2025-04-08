import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CooperativaList from "../components/Cooperativa/CooperativaList";
import CooperativaForm from "../components/Cooperativa/CooperativaForm";
import ModalStyled from "../components/Shared/ModalStyled";

export default function CooperativasPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{ mb: 3 }}>
        Nova Cooperativa
      </Button>

      <CooperativaList key={refreshKey} />

      <ModalStyled
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nova Cooperativa">
        <CooperativaForm
          onSuccess={() => {
            setModalOpen(false);
            setRefreshKey((old) => old + 1);
          }}
        />
      </ModalStyled>
    </>
  );
}
