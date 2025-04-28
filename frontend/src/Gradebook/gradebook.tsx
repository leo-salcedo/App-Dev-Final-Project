import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar.tsx';
import './gradebook.css';

//this is jsut a template tbh, we probably need a separate file for this with how much content there is?
//or pull info from hmwk based on node color (complete or incomplete assignment)
//the dueDate stuff isn't necessary but would give a grade penalty for late assignments
const assignments = [
  { id: '1A', label: 'Assignment 1A', dueDate: '2025-04-20', status: 'completed' },
  { id: '1B', label: 'Assignment 1B', dueDate: '2025-04-25', status: 'not started' },
  { id: '2A', label: 'Assignment 2A', dueDate: '2025-04-15', status: 'completed' },
  { id: '2B', label: 'Assignment 2B', dueDate: '2025-04-30', status: 'not started' },
];

const Gradebook = () => {
  const [totalGrade, setTotalGrade] = useState(0);

  useEffect(() => {
    calculateTotalGrade();
  }, []);

  const calculateTotalGrade = () => {
    const currentDate = new Date();
    let grade = 100;

    assignments.forEach(assignment => {
      const dueDate = new Date(assignment.dueDate);
      if (assignment.status !== 'completed' && dueDate < currentDate) {
        grade -= 10;
      }
    });

    setTotalGrade(grade);
  };

  return (
    <div className="gradebook">
      <Sidebar />

      <div className="header">
        <h2>Gradebook</h2>
        <p className="total-grade">Current Grade: {totalGrade}%</p>
      </div>

      <div className="assignments">
        {assignments.map((assignment) => (
          <div 
            key={assignment.id} 
            className="assignment">
            <p>{assignment.label}</p>
            <p>Status: {assignment.status}</p>
            <p>Due Date: {assignment.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gradebook;
