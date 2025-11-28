import React, { useState } from "react";
import { Box, Typography, TextField, MenuItem, Tabs, Tab, Grid } from "@mui/material";

const procedureTypes = [
  "Extraction",
  "Surgical Extraction",
  "RCT",
  "Crown Preparation",
  "Implant Placement",
  "Perio Surgery",
  "Scaling / Root Planing",
  "Restoration",
  "Ortho Procedure",
  "Other",
];

const Operations = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [operation, setOperation] = useState({
    name: "",
    date: "",
    tooth: "",
    toothNumber: "",
    procedureType: "",
    surgeon: "",
    diagnosis: "",
    preMedications: "",
    specialInstructions: "",
    postMedications: "",
    followUp: "",
    complications: "",
    status: "",
    anesthesia: "",
    duration: "",

    flap: "",
    implantSystem: "",
    sutureType: "",
    bleedingControl: "",
    socketCondition: "",
  });

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleChangeField = (field, value) =>
    setOperation({ ...operation, [field]: value });

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
         Operation Details
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
        <Tab label="Basic Info" />
        <Tab label="Pre-Op" />
        <Tab label="Surgical Details" />
        <Tab label="Post-Op" />
        <Tab label="Status & Extra Info" />
      </Tabs>

      {/* ----------- BASIC INFO TAB ----------- */}
      {activeTab === 0 && (
        <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                select
                label="Procedure Type"
                fullWidth
                value={operation.procedureType}
                onChange={(e) => handleChangeField("procedureType", e.target.value)}
              >
                {procedureTypes.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={operation.date}
                onChange={(e) => handleChangeField("date", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                label="Tooth Area"
                fullWidth
                value={operation.tooth}
                onChange={(e) => handleChangeField("tooth", e.target.value)}
              >
                <MenuItem value="UR">Upper Right</MenuItem>
                <MenuItem value="UL">Upper Left</MenuItem>
                <MenuItem value="LR">Lower Right</MenuItem>
                <MenuItem value="LL">Lower Left</MenuItem>
                <MenuItem value="Multiple">Multiple Teeth</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Tooth Number (11–48)"
                placeholder="e.g., 16 or 36"
                fullWidth
                value={operation.toothNumber}
                onChange={(e) => handleChangeField("toothNumber", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                label="Surgeon"
                fullWidth
                value={operation.surgeon}
                onChange={(e) => handleChangeField("surgeon", e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* ----------- PRE-OP TAB ----------- */}
      {activeTab === 1 && (
        <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
          <TextField
            label="Diagnosis / Reason"
            fullWidth
            sx={{ mb: 2 }}
            value={operation.diagnosis}
            onChange={(e) => handleChangeField("diagnosis", e.target.value)}
          />

          <TextField
            label="Pre-Op Medications"
            fullWidth
            sx={{ mb: 2 }}
            value={operation.preMedications}
            onChange={(e) => handleChangeField("preMedications", e.target.value)}
          />

          <TextField
            label="Special Instructions"
            fullWidth
            multiline
            rows={3}
            value={operation.specialInstructions}
            onChange={(e) => handleChangeField("specialInstructions", e.target.value)}
          />
        </Box>
      )}

      {/* ----------- SURGICAL DETAILS TAB ----------- */}
      {activeTab === 2 && (
        <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                select
                label="Flap"
                fullWidth
                value={operation.flap}
                onChange={(e) => handleChangeField("flap", e.target.value)}
              >
                <MenuItem value="No Flap">No Flap</MenuItem>
                <MenuItem value="Envelope Flap">Envelope Flap</MenuItem>
                <MenuItem value="Triangular Flap">Triangular Flap</MenuItem>
                <MenuItem value="Sulcular Flap">Sulcular Flap</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Implant System"
                placeholder="If applicable"
                fullWidth
                value={operation.implantSystem}
                onChange={(e) => handleChangeField("implantSystem", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Suture Type"
                fullWidth
                placeholder="e.g., 3/0 Silk"
                value={operation.sutureType}
                onChange={(e) => handleChangeField("sutureType", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Bleeding Control"
                fullWidth
                placeholder="e.g., Gauze pressure / Suturing / Surgicel"
                value={operation.bleedingControl}
                onChange={(e) =>
                  handleChangeField("bleedingControl", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Socket Condition (After Extraction)"
                fullWidth
                placeholder="Intact / Granulation tissue / Cyst-like / Dry socket"
                value={operation.socketCondition}
                onChange={(e) =>
                  handleChangeField("socketCondition", e.target.value)
                }
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* ----------- POST-OP TAB ----------- */}
      {activeTab === 3 && (
        <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
          <TextField
            label="Post-Op Medications"
            fullWidth
            sx={{ mb: 2 }}
            value={operation.postMedications}
            onChange={(e) => handleChangeField("postMedications", e.target.value)}
          />

          <TextField
            label="Follow-up Schedule"
            fullWidth
            sx={{ mb: 2 }}
            value={operation.followUp}
            onChange={(e) => handleChangeField("followUp", e.target.value)}
          />

          <TextField
            label="Complications"
            fullWidth
            multiline
            rows={3}
            value={operation.complications}
            onChange={(e) => handleChangeField("complications", e.target.value)}
          />
        </Box>
      )}

      {/* ----------- STATUS & EXTRA INFO TAB ----------- */}
      {activeTab === 4 && (
        <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
          <TextField
            select
            label="Status"
            fullWidth
            sx={{ mb: 2 }}
            value={operation.status}
            onChange={(e) => handleChangeField("status", e.target.value)}
          >
            <MenuItem value="Planned">Planned</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>

          <TextField
            select
            label="Anesthesia Type"
            fullWidth
            sx={{ mb: 2 }}
            value={operation.anesthesia}
            onChange={(e) => handleChangeField("anesthesia", e.target.value)}
          >
            <MenuItem value="Local">Local</MenuItem>
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Sedation">Sedation</MenuItem>
          </TextField>

          <TextField
            label="Duration"
            placeholder="e.g., 45 minutes"
            fullWidth
            value={operation.duration}
            onChange={(e) => handleChangeField("duration", e.target.value)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Operations;
