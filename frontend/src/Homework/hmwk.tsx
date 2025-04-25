import React from 'react'
import Sidebar from '../Sidebar/Sidebar.tsx';
import './hmwk.css';

type TreeNode = {
  label: string;
  color: string;
  children?: TreeNode[];
};

const treeData: TreeNode = {
  label: 'Start',
  color: 'not-started',
  children: [
      {
          label: 'Homework 1A',
          color: 'completed',
          children: [
              { label: 'Homework 1B', color: 'not-started' },
              { label: 'Homework 1C', color: 'not-started' },
          ],
      },
      {
          label: 'Homework 2A',
          color: 'completed',
          children: [
              { label: 'Homework 2B', color: 'not-started' },
          ],
      },
      {
        label: 'Homework 3A',
        color: 'completed',
        children: [
            { label: 'Homework 3B', color: 'not-started' },
        ],
    }, 
    {
      label: 'Homework 4A',
      color: 'completed',
      children: [
          { label: 'Homework 4B', color: 'not-started' },
      ],
    },
    {
      label: 'Homework 5A',
      color: 'completed',
    },
    {
      label: 'Homework 6A',
      color: 'completed',
    },
    {
      label: 'Homework 7A',
      color: 'completed',
      children: [
        { label: 'Homework 7B', color: 'not-started' },
        { label: 'Homework 7C', color: 'not-started' },
      ],
  },
  ],   
};

// you should make the nodes change dynamically and scale with the screen
function Tree(){
  const makeTree = (node: TreeNode) => {
    return (
      <div className = "tree-node">
        <div className="node-content">
        <div className={`triangle ${node.color}`} onClick={() => alert(node.label)}></div>
        </div>
        
        {node.children && (
          <div className = "tree-children">
            {node.children.map((child, i) => (
              <div key = {i} className =  "tree-branch">
                <div className = "connector-line" />
                {makeTree(child)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className = "page-container">
      <Sidebar />
      <div className = "tree-container">
        {makeTree(treeData)}
      </div>
    </div>
  );
}

export default Tree;


