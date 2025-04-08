import { MenuItem, TextField } from "@mui/material";
import { TipoChavePix } from "../../types/types";

export default function PixKeyTypeSelect({
  value,
  onChange,
}: {
  value: TipoChavePix;
  onChange: (value: TipoChavePix) => void;
}) {
  return (
    <TextField
      select
      label="Tipo Chave PIX"
      value={value}
      onChange={(e) => onChange(e.target.value as TipoChavePix)}
      fullWidth
      margin="normal">
      {(Object.values(TipoChavePix) as TipoChavePix[]).map((tipo) => (
        <MenuItem key={tipo} value={tipo}>
          {tipo}
        </MenuItem>
      ))}
    </TextField>
  );
}
