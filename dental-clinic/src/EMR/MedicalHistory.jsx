import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const MedicalHistory = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Medical & Family History
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Previous Dental History"
          placeholder="Any previous dental treatments or problems"
          multiline
          rows={6}
          fullWidth
          name="previousDentalHistory"
          value={data.previousDentalHistory || ""}
          onChange={handleChange}
        />

        <TextField
          label="Family Dental History"
          placeholder="Any family history of dental diseases"
          multiline
          rows={6}
          fullWidth
          name="familyHistory"
          value={data.familyHistory || ""}
          onChange={handleChange}
        />

        <TextField
          label="Allergies / Medical Conditions"
          placeholder="Any allergies, medications, or systemic diseases"
          multiline
          rows={6}
          fullWidth
          name="allergies"
          value={data.allergies || ""}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default MedicalHistory;
