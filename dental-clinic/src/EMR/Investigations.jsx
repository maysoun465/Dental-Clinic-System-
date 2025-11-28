import React from "react";
import { Box, Typography, TextField, Chip, Button, Stack, Divider } from "@mui/material";

const defaultInvestigations = [
  // Dental Imaging
  "Bitewing X-Ray",
  "Periapical X-Ray",
  "Full Mouth X-Ray (FMX)",
  "OPG",
  "CBCT",
  "TMJ X-Ray",

  // Diagnostic Tests
  "Pulp Vitality Test (EPT)",
  "Thermal Test (Cold/Heat)",
  "Percussion Test",
  "Palpation Test",
  "Mobility Assessment",
  "Periodontal Charting",
  "Plaque Index",
  "Bleeding Index",
  "Caries Risk Assessment",

  // Lab (Medical) Tests
  "CBC",
  "Blood Sugar",
  "HbA1c",
  "Coagulation Profile",

  // Saliva / Oral Tests
  "Salivary Flow Rate",
  "Salivary pH Test",
  "Oral Bacterial Culture",

  // Other
  "Study Models",
  "Occlusal Analysis",
];

const Investigations = ({ data, setData }) => {
  const selectedInvestigations = data.selectedInvestigations || [];
  const customInvestigation = data.customInvestigation || "";
  const notes = data.notes || "";

  const handleSelect = (test) => {
    const updated = selectedInvestigations.includes(test)
      ? selectedInvestigations.filter((item) => item !== test)
      : [...selectedInvestigations, test];

    setData({ ...data, selectedInvestigations: updated });
  };

  const handleAddCustom = () => {
    if (customInvestigation.trim() !== "") {
      const updated = [...selectedInvestigations, customInvestigation.trim()];
      setData({ ...data, selectedInvestigations: updated, customInvestigations: "" });
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f9fafb", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <Typography variant="h5" gutterBottom>
        Dental Investigations
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Select or add investigations requested for the dental assessment.
      </Typography>

      {/* Chip list */}
      <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
        {defaultInvestigations.map((test) => (
          <Chip
            key={test}
            label={test}
            clickable
            color={selectedInvestigations.includes(test) ? "primary" : "default"}
            onClick={() => handleSelect(test)}
          />
        ))}
      </Stack>

      {/* Custom investigation */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <TextField
          label="Add Custom Investigation"
          variant="outlined"
          size="small"
          value={customInvestigation}
          onChange={(e) => setData({ ...data, customInvestigation: e.target.value })}
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" onClick={handleAddCustom}>
          Add
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Selected investigations */}
      <Typography variant="subtitle1" gutterBottom>
        Selected Investigations:
      </Typography>

      {selectedInvestigations.length > 0 ? (
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
          {selectedInvestigations.map((item, index) => (
            <Chip
              key={index}
              label={item}
              color="success"
              onDelete={() =>
                setData({
                  ...data,
                  selectedInvestigations: selectedInvestigations.filter((i) => i !== item),
                })
              }
            />
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No investigations selected yet.
        </Typography>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Notes */}
      <Typography variant="subtitle1" gutterBottom>
        Notes
      </Typography>

      <TextField
        multiline
        rows={3}
        placeholder="Add any special notes or comments..."
        fullWidth
        value={notes}
        onChange={(e) => setData({ ...data, notes: e.target.value })}
      />

      <Box sx={{ textAlign: "right", mt: 1 }}>
        <Button variant="contained" color="primary">
          Save Investigations
        </Button>
      </Box>
    </Box>
  );
};

export default Investigations;
