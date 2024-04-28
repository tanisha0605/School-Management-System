import React from 'react'
import Table from '../components/Table'
import AddButton from '../components/AddButton'
export default function Teacher(){
  return (
    <div>
      <AddButton ModelName={'Teacher'}/>
      <Table modelName={'Teacher'}/>
    </div> 
  )
}