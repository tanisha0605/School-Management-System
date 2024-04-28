import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChartExample } from "../components/Chart";
import Loading from "../components/Loading";
function ClassAnalytics() {
    const { name } = useParams();
    const [classData, setClassData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/class/getByName/${name}`);
            const data = await response.json();
            setClassData(data);
        } catch (error) {
            //.error("Error fetching data:", error);
        }
    }

    if (!classData) {
        return <div>
            <Loading/>
        </div>
    }

    return (
      <div className="container mx-20 p-4 flex">
          <div className="bg-white rounded-lg p-6 ml-10 flex-1 w-100px text-xl">
              <h1 className="text-3xl font-bold mb-4 text-mblue">Class Analytics</h1>
              <p className="mb-2"> <span className="font-bold">Name:</span> {classData.name}</p>
              <p className="mb-2"> <span className="font-bold">Year:</span> {classData.year}</p>
              <p className="mb-2"><span className="font-bold">Max Capacity:</span> {classData.maxCapacity}</p>
              <p className="mb-2"><span className="font-bold">Teacher Name:</span> {classData.teacher.name}</p>
              <p className="mb-2"><span className="font-bold">Students:</span></p>
              <ul>
                  {classData.students.map((student, index) => (
                      <li key={student._id} className="mb-3 ml-10">{index + 1}. {student.name}</li>
                  ))}
              </ul>
              </div>
          <div className="flex-1 w-1/2 flex justify-center items-center">
              <ChartExample data={classData}/>
          </div>
      </div>
  );
  
  
  
}
export default ClassAnalytics;



