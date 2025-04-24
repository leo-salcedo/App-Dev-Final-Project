import React from 'react'
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
              { label: 'Homework 2C', color: 'not-started' },
          ],
      }
  ],   
};
// you should make the nodes change dynamically and scale with the screen
function Tree(){
  const makeTree = (node: any) => {
    return (
      <div className = "tree-node">
        <div className = {'triangle ${node.color}'} onClick={() => alert(node.label)}></div>
        {node.children && (
          <div className = "tree-children">
            {node.children.map((child: any, i: number) => makeTree(child))}
          </div>
        )}
      </div>
    );
  };
  return <div className = "tree-container">{makeTree(treeData)}</div>;
}
export default Tree;


