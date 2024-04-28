import React from 'react'
import { useParams } from "react-router-dom";
import UpdateForm from '../components/UpdateForm';
function UpdateFormPage() {
  const { model,id } = useParams();
  // console.log(model);
  // console.log(id);
  return (
    <div>
      <UpdateForm modelName={model} id={id} />
    </div>
  )
}

export default UpdateFormPage;