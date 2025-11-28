import React from "react";
import { Box, TextField, Grid, Typography, MenuItem } from "@mui/material";

const gumConditionOptions = ["Healthy", "Gingivitis", "Periodontitis", "Other"];
const mobilityOptions = ["None", "Grade I", "Grade II", "Grade III"];
const painOptions = ["None", "Mild", "Moderate", "Severe"];
const occlusionOptions = ["Normal", "Overbite", "Underbite", "Crossbite", "Open bite", "Other"];

const DentalExaminationForm = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const quadrantFields = [
    { name: "upperRight", label: "Upper Right (UR)" },
    { name: "upperLeft", label: "Upper Left (UL)" },
    { name: "lowerRight", label: "Lower Right (LR)" },
    { name: "lowerLeft", label: "Lower Left (LL)" },
  ];

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Dental Examination Results
      </Typography>

      {/* Quadrants */}
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Teeth Condition by Quadrant
      </Typography>

      <Grid container spacing={2}>
        {quadrantFields.map((q) => (
          <Grid item xs={12} md={6} key={q.name}>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              label={q.label}
              placeholder="e.g., Caries on 16, filling on 15"
              name={q.name}
              value={data[q.name] || ""}
              onChange={handleChange}
            />
          </Grid>
        ))}
      </Grid>

      {/* Gum Condition */}
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Gingival & Periodontal Status
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            select
            size="small"
            label="Gum Condition"
            name="gumCondition"
            value={data.gumCondition}
            onChange={handleChange}
          >
            {gumConditionOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
          {data.gumCondition === "Other" && (
            <TextField
              fullWidth
              size="small"
              label="Specify Gum Condition"
              name="gumConditionOther"
              value={data.gumConditionOther || ""}
              onChange={handleChange}
              sx={{ mt: 1 }}
            />
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Periodontal Pocket Depth (mm)"
            placeholder="e.g., 2–3 mm"
            name="pocketDepth"
            value={data.pocketDepth}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            select
            size="small"
            label="Teeth Mobility"
            name="mobility"
            value={data.mobility}
            onChange={handleChange}
          >
            {mobilityOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Pain & Sensitivity */}
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Sensitivity & Pain
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            select
            size="small"
            label="Pain"
            name="pain"
            value={data.pain}
            onChange={handleChange}
          >
            {painOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            size="small"
            label="Sensitivity (Hot/Cold/Sweet)"
            placeholder="e.g., cold sensitivity on 21"
            name="sensitivity"
            value={data.sensitivity}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      {/* Oral Hygiene */}
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Oral Hygiene Evaluation
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            label="Plaque Index"
            placeholder="e.g., mild / moderate / severe"
            name="plaque"
            value={data.plaque}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            label="Calculus (Tartar)"
            placeholder="e.g., present on lower incisors"
            name="calculus"
            value={data.calculus}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      {/* Occlusion */}
      <Typography variant="subtitle1" sx={{ mt: 3 }}>Occlusion</Typography>

      <Grid item xs={12} md={6} sx={{ mt: 1 }}>
        <TextField
          fullWidth
          select
          size="small"
          label="Occlusion"
          name="occlusion"
          value={data.occlusion}
          onChange={handleChange}
        >
          {occlusionOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>
        {data.occlusion === "Other" && (
          <TextField
            fullWidth
            size="small"
            label="Specify Occlusion"
            name="occlusionOther"
            value={data.occlusionOther || ""}
            onChange={handleChange}
            sx={{ mt: 1 }}
          />
        )}
      </Grid>

      {/* General Observations */}
      <Typography variant="subtitle1" sx={{ mt: 3 }}>General Oral Observations</Typography>

      <Box sx={{ mt: 1 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          size="small"
          label="General Findings"
          placeholder="e.g., coated tongue, ulcers, abnormal lesions..."
          name="generalFindings"
          value={data.generalFindings}
          onChange={handleChange}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          size="small"
          label="Other Notes"
          placeholder="Enter any other notes..."
          name="otherNotes"
          value={data.otherNotes}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default DentalExaminationForm;
