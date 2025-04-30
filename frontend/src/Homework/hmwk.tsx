import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.tsx';
import {useLocation, useNavigate} from 'react-router-dom';
import './hmwk.css';

const backendUrl = import.meta.env.VITE_BACKEND;

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
          color: 'not-started',
          children: [
              { label: '1B', color: 'not-started' },
              { label: '1C', color: 'not-started' },
          ],
      },
      {
          label: '2A',
          color: 'not-started',
          children: [
              { label: '2B', color: 'not-started' },
          ],
      },
      {
        label: '3A',
        color: 'not-started',
        children: [
            { label: '3B', color: 'not-started' },
        ],
    }, 
    {
      label: '4A',
      color: 'not-started',
      children: [
          { label: '4B', color: 'not-started' },
      ],
    },
    {
      label: '5A',
      color: 'not-started',
    },
    {
      label: '6A',
      color: 'not-started',
    },
    {
      label: '7A',
      color: 'not-started',
      children: [
        { label: '7B', color: 'not-started' },
        { label: '7C', color: 'not-started' },
      ],
    },
  ],   
};

const formLinks: Record<string, string> = {
  "1C": "https://forms.gle/MQejHVuzuVzj3uGE7",
  "2B": "https://docs.google.com/forms/d/e/1FAIpQLSfQFK17245tRC6FuoOYBBozy_n13Cna7hc9ygjz0IPMjpUQGA/viewform",
  "3A": "https://docs.google.com/forms/d/e/1FAIpQLSfXbxbAbiH_0DyQMpA7VvUYZm30wV5rlo9qZ5dIjdYvo-FkYg/viewform",
  "3B": "https://docs.google.com/forms/d/e/1FAIpQLSdeaQtCgkg7PvP_TIEIB5a7X5S4MFD56JLNeS4PWycqBGi31w/viewform",
  "5A": "https://docs.google.com/forms/d/e/1FAIpQLSdCJf5qmoTF-cUzs_HsItw3PRCkkd2DaXCBGRsc5Esqj3hyOg/viewform",
};

const updateHomeworkStatus = async (label: string, newStatus: string) => {
  const email = localStorage.getItem('email');
  if (!email) {
    console.error('User email not found');
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/api/homework/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        homeworkId: label,
        status: newStatus,
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to update homework status');
    }

    // Update local storage after successful backend update
    localStorage.setItem(`status-${label}`, newStatus);
    
    // Force a re-render
    window.location.reload();
  } catch (error) {
    console.error('Error updating homework status:', error);
  }
};

function Tree(){
  const navigate = useNavigate();
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHomeworkStatus = async () => {
      const email = localStorage.getItem('email');
      if (!email) {
        console.error('User email not found');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/api/homework/status/${email}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch homework status');
        }

        const statuses = await response.json();
        
        // Update local storage with fetched statuses
        statuses.forEach((status: { homeworkId: string; status: string }) => {
          localStorage.setItem(`status-${status.homeworkId}`, status.status);
        });
      } catch (error) {
        console.error('Error loading homework status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeworkStatus();
  }, []);

  const click = (label: string) => {
  if (label === "Bootcamp Homework"){
    return;
  }
    navigate(`/Homework/${label}`);
  };

  //backend stuff
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const name = queryParams.get("name");
  const email = queryParams.get("email");

  useEffect(() => {
    if (name && email) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    }
  }, [name, email]);

  const getProgressCounts = () => {
    let completed = 0;
    let inProgress = 0;
    let notStarted = 0;

    const allNodes = [
      '1A', '1B', '1C',
      '2A', '2B',
      '3A', '3B',
      '4A', '4B',
      '5A', 
      '6A',
      '7A', '7B', '7C'
    ];

    allNodes.forEach((label) => {
      const status = localStorage.getItem(`status-${label}`);

      if (status === 'completed') {
        completed++;
      } 
      else if (status === 'in-progress') {
        inProgress++;
      }
      else if (status === 'not-started') {
        notStarted++;
      }
      else{
        notStarted++;
      }
    });

    return { completed, inProgress, notStarted };
  };

  const {completed, inProgress, notStarted} = getProgressCounts();
  const total = completed + inProgress + notStarted;

  const completedPercent = (completed / total) * 100;
  const inProgressPercent = (inProgress / total) * 100;
  const notStartedPercent = (notStarted / total) * 100;

  const handleStatusChange = (label: string, currentStatus: string) => {
    if (label === "Bootcamp Homework") return;
    
    let newStatus: string;
    switch (currentStatus) {
      case 'not-started':
        newStatus = 'in-progress';
        break;
      case 'in-progress':
        newStatus = 'completed';
        break;
      case 'completed':
        newStatus = 'not-started';
        break;
      default:
        newStatus = 'not-started';
    }

    setStatusUpdating(label);
    updateHomeworkStatus(label, newStatus)
      .finally(() => setStatusUpdating(null));
  };

  const makeTree = (node: TreeNode) => {
    const savedStatus = localStorage.getItem(`status-${node.label}`) || node.color;

    let colorClass = 'not-started';

    if (savedStatus === 'completed'){
      colorClass = 'completed';
    } 
    else if (savedStatus === 'in-progress'){
      colorClass = 'in-progress';
    }
    else if (savedStatus === 'not-started'){
      colorClass = 'not-started';
    }

    return (
      <div className = "tree-node">
        <div 
          className={node.label === "Bootcamp Homework" ? "rectangle" : `triangle ${colorClass}`} 
          onClick={() => click(node.label)}
          onContextMenu={(e) => {
            e.preventDefault();
            handleStatusChange(node.label, savedStatus);
          }}
          style={{ cursor: statusUpdating === node.label ? 'wait' : 'pointer' }}
        >
          <div className={node.label === "Bootcamp Homework" ? "rectangle-text" : "triangle-text"}>
            {node.label}
            {statusUpdating === node.label && <span className="status-updating"> ...</span>}
          </div>
        </div>

        {formLinks[node.label] && (
          <button
          className = "form-button"
          onClick = {(e) => {
            e.stopPropagation();
            window.open(formLinks[node.label], "_blank");
          }}
        >
          Submit Form
        </button>
        )}

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
  

  return (
    <div className = "page-container"> 
      <Sidebar />
      <div className = "tree-container">
        {isLoading ? (
          <div className="loading-spinner">Loading homework status...</div>
        ) : (
          <>
            <div className = "progress-section">
              <div className="progress-bar">
                <div className = "progress-completed" style = {{width: `${completedPercent}%` }}/>
                <div className = "progress-in-progress" style = {{width: `${inProgressPercent}%` }}/>
                <div className = "progress-not-started" style = {{width: `${notStartedPercent}%` }}/>
              </div>

              <div className = "progress-labels">
                <span>Completed: {completed}</span>
                <span>In Progress: {inProgress}</span>
                <span>Not Started: {notStarted}</span>
              </div>
            </div>
            {makeTree(treeData)}
          </>
        )}
      </div>
    </div>
  );
}
export default Tree;


