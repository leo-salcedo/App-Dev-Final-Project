import { useState } from 'react';
import './hmwk.css';

const Tree = () => {
  const whenClick = (label: string) => {
    alert(`You clicked on: ${label}`); // fixed template string and typo
  };

  return (
    <div className="tree-container">
      <div className="row">
        <div className="triangle not-started" onClick={() => whenClick('Not Started')}></div>
      </div>
      <div className="row">
        <div className="triangle in-progress" onClick={() => whenClick('In Progress')}></div>
      </div>
      <div className="row">
        <div className="triangle completed" onClick={() => whenClick('Completed')}></div>
      </div>
    </div>
  );
};

export default Tree;

