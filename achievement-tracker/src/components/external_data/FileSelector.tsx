import { Box, Button, Stack, Typography } from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

const FileSelector = ({ onJSONLoad }: { onJSONLoad: (json: any) => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/json": [".json"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
      }
    },
  });

  const handleSubmit = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          onJSONLoad(json);
        } catch (error) {
          console.error("Error parsing JSON file", error);
          alert("Invalid JSON file.");
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #ccc",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragActive ? "action.hover" : "background.paper",
          width: "100%",
          maxWidth: 400,
          transition: "background-color 0.2s ease-in-out",
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 48, color: "text.secondary" }} />
        {isDragActive ? (
          <Typography variant="h6">Drop your JSON file here...</Typography>
        ) : (
          <Typography variant="h6">Drag & drop a JSON file here, or click to select one</Typography>
        )}
      </Box>

      {selectedFile && (
        <Typography variant="body1" color="text.secondary">
          Selected file: {selectedFile.name}
        </Typography>
      )}

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          color="secondary"
          disabled={!selectedFile}
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedFile}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default FileSelector;
