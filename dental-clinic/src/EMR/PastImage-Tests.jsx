import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Stack,
  Chip,
  Tooltip,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Delete, Download, Visibility, CloudUpload, Search } from "@mui/icons-material";

/**
 * Professional PastImageTests component
 * Features:
 * - Upload (click + drag/drop)
 * - Preview modal for images
 * - Download files
 * - Edit metadata per file: date, category, notes, name
 * - Filter by category + search
 * - Cleanup blob URLs
 *
 * Usage: <PastImageTests />
 */

const mockOldFiles = [
  {
    id: 1,
    name: "OPG_2024.jpg",
    url: "https://via.placeholder.com/800x600?text=OPG+2024",
    type: "image",
    date: "2024-06-10",
    category: "OPG",
    notes: "Initial OPG before treatment",
    isLocal: false, // remote URL (don't revoke)
  },
  {
    id: 2,
    name: "CBCT_Report.pdf",
    url: "https://via.placeholder.com/400x300?text=CBCT+Report",
    type: "file",
    date: "2024-08-15",
    category: "CBCT",
    notes: "3D volume for implant planning",
    isLocal: false,
  },
];

const categories = [
  "All",
  "OPG",
  "CBCT",
  "Periapical",
  "Bitewing",
  "Lab Report",
  "Photo",
  "Other",
];

const generateId = () => Date.now() + Math.floor(Math.random() * 100000);

const PastImageTests = () => {
  const [files, setFiles] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const inputRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    // load initial mocks (could be fetched from API)
    setFiles(mockOldFiles);
  }, []);

  // cleanup on unmount: revoke any blob URLs we created
  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.isLocal && f.url && f.url.startsWith("blob:")) URL.revokeObjectURL(f.url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = (fileList) => {
    const items = Array.from(fileList).map((file) => {
      const url = URL.createObjectURL(file);
      return {
        id: generateId(),
        name: file.name,
        url,
        type: file.type.startsWith("image/") ? "image" : "file",
        date: new Date().toISOString().slice(0, 10),
        category: "Photo",
        notes: "",
        fileObject: file,
        isLocal: true,
      };
    });

    setFiles((prev) => [...items, ...prev]);
  };

  const handleFileInput = (e) => {
    if (!e.target.files) return;
    addFiles(e.target.files);
    e.target.value = "";
  };

  // drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    if (dropRef.current) dropRef.current.style.borderColor = "#1976d2";
  };
  const handleDragLeave = (e) => {
    if (dropRef.current) dropRef.current.style.borderColor = "#e0e0e0";
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (dropRef.current) dropRef.current.style.borderColor = "#e0e0e0";
    const dtFiles = e.dataTransfer.files;
    if (dtFiles && dtFiles.length) addFiles(dtFiles);
  };

  const handleRemove = (id) => {
    setFiles((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target?.isLocal && target.url?.startsWith("blob:")) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleDownload = (file) => {
    // For remote placeholders, just open in new tab; for local blobs, create link with download
    const link = document.createElement("a");
    link.href = file.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (file.isLocal || file.type !== "image") {
      // set download attribute for blob/local files or PDFs
      link.download = file.name;
    }
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const openPreview = (file) => {
    // Only images previewed in modal
    setPreviewFile(file);
    setPreviewOpen(true);
  };

  const handleMetadataChange = (id, key, value) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const filtered = files.filter((f) => {
    const matchesCategory = filterCategory === "All" || f.category === filterCategory;
    const q = searchText.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (f.name && f.name.toLowerCase().includes(q)) ||
      (f.notes && f.notes.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const renderCard = useCallback(
    (file) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
        <Paper
          elevation={1}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
            minHeight: 160,
          }}
        >
          <Box sx={{ p: 1 }}>
            {/* Preview area */}
            <Box
              sx={{
                width: "100%",
                height: 140,
                borderRadius: 1,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: file.type === "image" ? "transparent" : "#f5f5f5",
              }}
            >
              {file.type === "image" ? (
                <img
                  src={file.url}
                  alt={file.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Box sx={{ textAlign: "center", p: 1 }}>
                  <Typography variant="body2" noWrap>
                    {file.name}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* name */}
            <Typography
              sx={{ mt: 1, fontWeight: 600, fontSize: "0.9rem" }}
              title={file.name}
            >
              {file.name}
            </Typography>

            {/* metadata inputs */}
            <Stack direction="row" spacing={1} sx={{ mt: 1 }} alignItems="center">
              <TextField
                size="small"
                label="Date"
                type="date"
                value={file.date || ""}
                onChange={(e) => handleMetadataChange(file.id, "date", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                size="small"
                select
                label="Category"
                value={file.category || "Other"}
                onChange={(e) => handleMetadataChange(file.id, "category", e.target.value)}
                sx={{ minWidth: 140 }}
              >
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
              </TextField>
            </Stack>

            <TextField
              size="small"
              label="Notes"
              placeholder="Add notes..."
              fullWidth
              value={file.notes || ""}
              onChange={(e) => handleMetadataChange(file.id, "notes", e.target.value)}
              sx={{ mt: 1 }}
            />

            {/* actions */}
            <Stack direction="row" spacing={1} sx={{ mt: 1 }} justifyContent="space-between">
              <Stack direction="row" spacing={1}>
                {file.type === "image" && (
                  <Tooltip title="Preview">
                    <IconButton size="small" onClick={() => openPreview(file)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Download">
                  <IconButton size="small" onClick={() => handleDownload(file)}>
                    <Download />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemove(file.id)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Chip label={file.category || "Other"} size="small" />
            </Stack>
          </Box>
        </Paper>
      </Grid>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleMetadataChange, openPreview, handleRemove]
  );

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Past Images & Lab Tests
      </Typography>

      {/* Upload + filters */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <input
          type="file"
          ref={inputRef}
          multiple
          onChange={handleFileInput}
          style={{ display: "none" }}
        />
        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          onClick={() => inputRef.current?.click()}
        >
          Upload Files
        </Button>

        <Box
          ref={dropRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            px: 2,
            py: 1,
            border: "2px dashed #e0e0e0",
            borderRadius: 1,
            bgcolor: "#fafafa",
            cursor: "copy",
            fontSize: "0.9rem",
          }}
        >
          Drag & Drop files here
        </Box>

        <TextField
          size="small"
          placeholder="Search files or notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 220 }}
        />

        <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              color={filterCategory === cat ? "primary" : "default"}
              onClick={() => setFilterCategory(cat)}
            />
          ))}
        </Stack>
      </Stack>

      {/* grid */}
      <Grid container spacing={2}>
        {filtered.length ? (
          filtered.map((f) => renderCard(f))
        ) : (
          <Grid item xs={12}>
            <Typography color="text.secondary">No files found.</Typography>
          </Grid>
        )}
      </Grid>

      {/* Preview dialog */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="lg">
        <DialogTitle>
          Preview
          <IconButton
            aria-label="close"
            onClick={() => setPreviewOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Delete />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {previewFile ? (
            <Box sx={{ width: "80vw", maxWidth: 1000 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {previewFile.name}
              </Typography>
              {previewFile.type === "image" ? (
                <img
                  src={previewFile.url}
                  alt={previewFile.name}
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                />
              ) : (
                <iframe
                  title={previewFile.name}
                  src={previewFile.url}
                  style={{ width: "100%", height: "70vh", border: "none" }}
                />
              )}
              <TextField
                size="small"
                fullWidth
                label="Notes"
                multiline
                sx={{ mt: 2 }}
                value={previewFile.notes || ""}
                onChange={(e) => handleMetadataChange(previewFile.id, "notes", e.target.value)}
              />
            </Box>
          ) : null}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PastImageTests;
