import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Text } from "@chakra-ui/react";
import axios from "axios";
function UploadSong() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    axios.post("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size/1024} KB
    </li>
  ));

  return (
    <section className="container m-20 flex flex-col justify-center align-center" >
      {/* <Text fontSize={"xx-large"} >Upload Song</Text> */}
      <div
        {...getRootProps({
          className: "dropzone",
          style: {
            border: "1px dashed black",
            width: "50%",
            margin: "auto",
            padding: "20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            height: "200px",
            cursor: "pointer",
          },
        })}
      >
        <input {...getInputProps()} />
        <p>
          Drag 'n' drop file, or <span className="underline">Browse</span>
        </p>
      </div>
      <aside>
        <Text fontSize={"x-large"}>Files</Text>
        {
          files && files.length > 0 ? <Text fontSize={"large"}>You have uploaded {files.length} files</Text> : "No Files Uploaded"
        }
        <ul>{files}</ul>
      </aside>
      <Button onClick={handleFileUpload}>Upload Song</Button>
    </section>
  );
}

export default UploadSong;
