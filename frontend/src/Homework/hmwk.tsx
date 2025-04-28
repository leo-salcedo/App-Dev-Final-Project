import React from 'react'
import Sidebar from '../Sidebar/Sidebar.tsx';
import './hmwk.css';

type TreeNode = {
  label: string;
  color: string;
  children?: TreeNode[];
};

const treeData: TreeNode = {
  label: 'Bootcamp Homework',
  color: 'not-started',
  children: [
      {
          label: '1A',
          color: 'completed',
          children: [
              { label: '1B', color: 'not-started' },
              { label: '1C', color: 'not-started' },
          ],
      },
      {
          label: '2A',
          color: 'completed',
          children: [
              { label: '2B', color: 'not-started' },
          ],
      },
      {
        label: '3A',
        color: 'completed',
        children: [
            { label: '3B', color: 'not-started' },
        ],
    }, 
    {
      label: '4A',
      color: 'completed',
      children: [
          { label: '4B', color: 'not-started' },
      ],
    },
    {
      label: '5A',
      color: 'completed',
    },
    {
      label: '6A',
      color: 'completed',
    },
    {
      label: '7A',
      color: 'completed',
      children: [
        { label: '7B', color: 'not-started' },
        { label: '7C', color: 'not-started' },
      ],
    },
  ],   
};

// you should make the nodes change dynamically and scale with the screen
const click = (label: string) => {
  if (label === "Bootcamp Homework"){
    return;
  }
  window.location.href = '#/Homework/${label}';
};

function Tree(){
  const makeTree = (node: TreeNode) => {
    return (
      <div className = "tree-node">
        <div className={node.label === "Bootcamp Homework" ? "rectangle" : "triangle"} onClick={() => click(node.label)}>
          <div className={node.label === "Bootcamp Homework" ? "rectangle-text" : "triangle-text"}>
            {node.label}
          </div>
        </div>


        {node.children && (
          <div className = "tree-children">
            {node.children.map((child, i) => (
              <div key = {i} className="tree.branch">
                <div className = {
                  node.children.length === 2 ? 
                  i === 0 ? 'line-left' : 'line-right' 
                  : 'line-straight'
                }></div>
              {makeTree(child)}
              </div>
            ))}
          </div>
        )}
      </div>
   );
  };
  return <div className = "tree-container"> {makeTree(treeData)}</div>;
}
export default Tree;


