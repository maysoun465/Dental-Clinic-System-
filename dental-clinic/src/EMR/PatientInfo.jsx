import React from "react";
import { Box, TextField, Grid, Typography } from "@mui/material";

const PatientInfo = ({ patient, readOnly }) => {
  return (
            <Box
              sx={{
                p: 1.5,
                border: "2px solid #ddd",
                maxWidth: 1500,  
              }}
            >
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        Patient Information
      </Typography>
      <Grid container spacing={1}>

        <Grid item xs={12} sm={3} md={2}>
          <TextField
            fullWidth
            size="small"
            label="Patient ID"
            variant="outlined"
            sx={{ maxWidth: 200 }}
            value={patient?.patientID || ""}
            InputProps={{ readOnly }}
          />
        </Grid>

        <Grid item xs={12} sm= {4} md={3}>
          <TextField 
            fullWidth
            size="small"
            label="Patient Name"
            variant="outlined"
            sx={{ maxWidth: 200 }}
            value={patient?.name || ""}
            InputProps={{ readOnly }}
          />
        </Grid>
        <Grid item xs={12} sm= {2} md={1.5}>
          <TextField
            fullWidth
            size="small"
            label="Age"
            type="number"
            variant="outlined"
            sx={{ maxWidth: 200 }}
            value={patient?.age || ""}
            InputProps={{ readOnly }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <TextField
            fullWidth
            size="small"
            label="Gender"
            variant="outlined"
            sx={{ maxWidth: 200 }}
            value={patient?.gender || ""}
            InputProps={{ readOnly }}
          />
        </Grid>
          <Grid item xs={12} sm={3} md={2}>
          <TextField
            fullWidth
            size="small"
            label="Visit Date"
            type="date"
            variant="outlined"
            sx={{ maxWidth: 200 }}
            value={patient?.visitDate || ""}
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly }}
            
          />
        </Grid>

          

          <Grid item xs={12} sm={4} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Contact Number"
            variant="outlined"
            sx={{ maxWidth: 200 }}
            value={patient?.contactNumber || ""}
            InputProps={{ readOnly }}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Insurance Company"
            variant="outlined"
            sx={{ maxWidth: 200 }}
            value={patient?.insuranceCompany || ""}
            InputProps={{ readOnly }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientInfo;