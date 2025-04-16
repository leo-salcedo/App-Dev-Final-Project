import { useState } from 'react';
import './hmwk.css';

const Tree = () => {
  const whenClick = (label: string) => {
    alert(`You clicked on: ${label}`); // fixed template string and typo
  };

  return (
    <div className="tree-container">
      <div className="row">
        <div className="not-started" onClick={() => whenClick('Not Started')} />
      </div>
      <div className="row">
        <div className="in-progress" onClick={() => whenClick('In Progress')} />
      </div>
      <div className="row">
        <div className="completed" onClick={() => whenClick('Completed')} />
      </div>
    </div>
  );
};

export default Tree;

