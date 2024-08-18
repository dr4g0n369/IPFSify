import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useWeb3 } from "../contexts/web3context";

function UploadSong() {

  const { contract,account } = useWeb3();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [fileName, setFileName] = useState("");
  


  
  // console.log("Contract:", contract)
  const handleFileUpload = async() => {
    if (!fileName || acceptedFiles.length === 0) {
      alert("Please enter a filename and select a file.");
      return;
    }

    if (contract && account) {
      try {


        const formData = new FormData();
        formData.append("fileName", fileName);
        formData.append("file", acceptedFiles[0]);
        let hash;
        await axios.post("http://localhost:3000/uploadSong", formData)
          .then((response) => {
            console.log("Success:", response.data);
            hash=response.data.hash
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        
        const result = await contract.methods.addSong(fileName,hash).send({ from: account });
        console.log("Contract method result:", result);
        console.log("Transaction hash:", result.transactionHash);
        console.log("Gas used:", result.gasUsed);
      } catch (contractError) {
        console.error("Error interacting with contract:", contractError);
      }
    } else {
      console.error("Contract or account is not initialized.");
    }

   
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {(file.size / 1024).toFixed(2)} KB
    </li>
  ));

  return (
    <section className="container m-20 flex flex-col justify-center align-center">
      <Text fontSize={"xx-large"}>Upload File</Text>

      <form
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
        onSubmit={(e) => {
          e.preventDefault();
          handleFileUpload();
        }}
      >
        <Input
          type="text"
          name="fileName"
          placeholder="Filename..."
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          mb={4}
        />
        <input {...getInputProps()} id="file" />
        <p>Drag 'n' drop file, or <span className="underline">Browse</span></p>
      </form>

      <aside>
        <Text fontSize={"x-large"}>Files</Text>
        {
          files.length > 0 ? <Text fontSize={"large"}>You have uploaded {files.length} file(s)</Text> : "No Files Uploaded"
        }
        <ul>{files}</ul>
      </aside>

      <Button onClick={handleFileUpload} mt={4}>Submit</Button>
    </section>
  );
}

export default UploadSong;

