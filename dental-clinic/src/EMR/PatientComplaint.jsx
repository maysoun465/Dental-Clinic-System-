import React from "react";
import { Box, TextField, Typography, Grid, MenuItem } from "@mui/material";

const painTypes = ["Sharp", "Dull", "Throbbing", "Radiating", "Burning", "Other"];

const PatientComplaint = ({ data, setData }) => {
const handleChange = (field, value) => {
setData({ ...data, [field]: value });
};

return (
<Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2, backgroundColor: "#fafafa" }}> <Typography variant="h6" gutterBottom>
Patient Complaint </Typography>

```
  <Grid container spacing={2}>  
    <Grid item xs={12}>  
      <TextField  
        label="Main Complaint"  
        multiline  
        rows={3}  
        fullWidth  
        value={data.complaint || ""}  
        onChange={(e) => handleChange("complaint", e.target.value)}  
      />  
    </Grid>  

    <Grid item xs={12} sm={4}>  
      <TextField  
        label="Duration (days/weeks/months)"  
        fullWidth  
        value={data.duration || ""}  
        onChange={(e) => handleChange("duration", e.target.value)}  
      />  
    </Grid>  

    <Grid item xs={12} sm={4}>  
      <TextField  
        label="Pain Scale (0-10)"  
        type="number"  
        fullWidth  
        inputProps={{ min: 0, max: 10 }}  
        value={data.painScale || ""}  
        onChange={(e) => handleChange("painScale", e.target.value)}  
      />  
    </Grid>  

    <Grid item xs={12} sm={4}>  
      <TextField  
        select  
        label="Pain Type"  
        fullWidth  
        value={data.painType || ""}  
        onChange={(e) => handleChange("painType", e.target.value)}  
      >  
        {painTypes.map((type) => (  
          <MenuItem key={type} value={type}>  
            {type}  
          </MenuItem>  
        ))}  
      </TextField>  
    </Grid>  

    <Grid item xs={12} sm={6}>  
      <TextField  
        label="Aggravating Factors"  
        placeholder="What makes it worse (e.g., cold, biting, sweet)"  
        fullWidth  
        value={data.aggravating || ""}  
        onChange={(e) => handleChange("aggravating", e.target.value)}  
      />  
    </Grid>  

    <Grid item xs={12} sm={6}>  
      <TextField  
        label="Relieving Factors"  
        placeholder="What makes it better"  
        fullWidth  
        value={data.relieving || ""}  
        onChange={(e) => handleChange("relieving", e.target.value)}  
      />  
    </Grid>  
  </Grid>  
</Box>  

);
};

export default PatientComplaint;
