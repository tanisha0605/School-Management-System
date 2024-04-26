import React from 'react'
import Table from '../components/Table'
import Teacher from '../../../api/models/teacher.model'
import Student from '../../../api/models/student.model'
import Class from '../../../api/models/class.model'
export default function About() {
  return (
    <div>
      <Table modelName={'Class'}/>
    </div> 
  )
}
