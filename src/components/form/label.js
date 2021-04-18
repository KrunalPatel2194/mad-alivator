import React from "react";
import { Label } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";

export default function InputLabel({ labelName }) {
  return (
    <>
      <Label>
        {labelName} :<span className="text-danger">*</span>
      </Label>
    </>
  );
}
