import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar.tsx';
import './gradebook.css';

const assignments = [
  { id: '1A', label: 'Assignment 1A', dueDate: '2025-04-20' },
  { id: '1B', label: 'Assignment 1B', dueDate: '2025-04-25' },
  { id: '2A', label: 'Assignment 2A', dueDate: '2025-04-15' },
  { id: '2B', label: 'Assignment 2B', dueDate: '2025-04-30' },
  { id: '3A', label: 'Assignment 3A', dueDate: '2025-05-05' },
  { id: '3B', label: 'Assignment 3B', dueDate: '2025-05-10' },
  { id: '4A', label: 'Assignment 4A', dueDate: '2025-05-15' },
  { id: '4B', label: 'Assignment 4B', dueDate: '2025-05-20' },
  { id: '5A', label: 'Assignment 5A', dueDate: '2025-05-25' },
  { id: '6A', label: 'Assignment 6A', dueDate: '2025-05-30' },
  { id: '7A', label: 'Assignment 7A', dueDate: '2025-06-05' },
  { id: '7B', label: 'Assignment 7B', dueDate: '2025-06-10' },
  { id: '7C', label: 'Assignment 7C', dueDate: '2025-06-15' },
];

const Gradebook = () => {
  const [totalGrade, setTotalGrade] = useState(100);
  const [assignmentStatuses, setAssignmentStatuses] = useState(assignments.map(a => ({ ...a, status: 'not started' })));

  useEffect(() => {
    const fetchHomeworkStatuses = () => {
      const updatedAssignments = assignments.map(assignment => {
        const status = localStorage.getItem(`status-${assignment.id}`) || 'not started';
        return { ...assignment, status };
      });

      setAssignmentStatuses(updatedAssignments);
      calculateTotalGrade(updatedAssignments);
    };

    fetchHomeworkStatuses();
  }, []);

  const calculateTotalGrade = (updatedAssignments) => {
    const currentDate = new Date();
    let grade = 100;

    updatedAssignments.forEach(assignment => {
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
        <h2 className="total-grade">Current Grade: {totalGrade}%</h2>
      </div>

      <div className="assignments">
        {assignmentStatuses.map((assignment) => (
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
