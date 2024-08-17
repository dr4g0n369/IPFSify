import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

function AlertComp({ status, title, description }) {
  return (
    <>
      <Alert status={status} colorScheme="blackAlpha">
        <IoAlertCircleOutline />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description} </AlertDescription>
      </Alert>
    </>
  );
}

export default AlertComp;
