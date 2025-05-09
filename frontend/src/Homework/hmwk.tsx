import React, { JSX, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
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
    { label: '1A', color: 'not-started', children: [
      { label: '1B', color: 'not-started' },
      { label: '1C', color: 'not-started' },
    ]},
    { label: '2A', color: 'not-started', children: [
      { label: '2B', color: 'not-started' },
    ]},
    { label: '3A', color: 'not-started', children: [
      { label: '3B', color: 'not-started' },
    ]},
    { label: '4A', color: 'not-started', children: [
      { label: '4B', color: 'not-started' },
    ]},
    { label: '5A', color: 'not-started' },
    { label: '6A', color: 'not-started' },
    { label: '7A', color: 'not-started', children: [
      { label: '7B', color: 'not-started' },
      { label: '7C', color: 'not-started' },
    ]}
  ],
};

const formLinks: Record<string, string> = {
  "1C": "https://forms.gle/MQejHVuzuVzj3uGE7",
  "2B": "https://docs.google.com/forms/d/e/1FAIpQLSfQFK17245tRC6FuoOYBBozy_n13Cna7hc9ygjz0IPMjpUQGA/viewform",
  "3A": "https://docs.google.com/forms/d/e/1FAIpQLSfXbxbAbiH_0DyQMpA7VvUYZm30wV5rlo9qZ5dIjdYvo-FkYg/viewform",
  "3B": "https://docs.google.com/forms/d/e/1FAIpQLSdeaQtCgkg7PvP_TIEIB5a7X5S4MFD56JLNeS4PWycqBGi31w/viewform",
  "5A": "https://docs.google.com/forms/d/e/1FAIpQLSdCJf5qmoTF-cUzs_HsItw3PRCkkd2DaXCBGRsc5Esqj3hyOg/viewform",
};

function Tree() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const name = queryParams.get("name");
  const email = queryParams.get("email");
  const progressRaw = queryParams.get("progress");

  const [progressVersion, setProgressVersion] = useState(0); 

  useEffect(() => {
    if (name && email) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    }

    if (progressRaw) {
      try {
        const progressObj = JSON.parse(decodeURIComponent(progressRaw));
        for (const [key, value] of Object.entries(progressObj)) {
          localStorage.setItem(key, value as string);
        }
        setProgressVersion(prev => prev + 1); 
      } catch (err) {
        console.error("Failed to parse progress:", err);
      }
    }
  }, [name, email, progressRaw]);

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
      if (status === 'completed') completed++;
      else if (status === 'in-progress') inProgress++;
      else notStarted++;
    });

    return { completed, inProgress, notStarted };
  };

  const { completed, inProgress, notStarted } = React.useMemo(() => getProgressCounts(), [progressVersion]);
  const total = completed + inProgress + notStarted;

  const completedPercent = (completed / total) * 100;
  const inProgressPercent = (inProgress / total) * 100;
  const notStartedPercent = (notStarted / total) * 100;

  const click = (label: string) => {
    if (label !== "Bootcamp Homework") {
      navigate(`/Homework/${label}`);
    }
  };

  const makeTree = (node: TreeNode): JSX.Element => {
    const savedStatus = localStorage.getItem(`status-${node.label}`) || node.color;
    const colorClass = savedStatus === 'completed'
      ? 'completed'
      : savedStatus === 'in-progress'
      ? 'in-progress'
      : 'not-started';

    return (
      <div className="tree-node">
        <div
          className={
            node.label === "Bootcamp Homework" ? "rectangle" : `triangle ${colorClass}`
          }
          onClick={() => click(node.label)}
        >
          <div
            className={
              node.label === "Bootcamp Homework" ? "rectangle-text" : "triangle-text"
            }
          >
            {node.label}
          </div>
        </div>

        {formLinks[node.label] && (
          <button
            className="form-button"
            onClick={(e) => {
              e.stopPropagation();
              window.open(formLinks[node.label], "_blank");
            }}
          >
            Submit Form
          </button>
        )}

        {Array.isArray(node.children) && node.children.length > 0 && (
          <div className="tree-children">
            {node.children.map((child, i) => (
              <div key={i} className="tree-branch">
                <div
                  className={
                    node.children!.length === 2
                      ? i === 0
                        ? "line-left"
                        : "line-right"
                      : "line-straight"
                  }
                ></div>
                {makeTree(child)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="tree-container">
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-completed" style={{ width: `${completedPercent}%` }} />
            <div className="progress-in-progress" style={{ width: `${inProgressPercent}%` }} />
            <div className="progress-not-started" style={{ width: `${notStartedPercent}%` }} />
          </div>
          <div className="progress-labels">
            <span>Completed: {completed}</span>
            <span>In Progress: {inProgress}</span>
            <span>Not Started: {notStarted}</span>
          </div>
        </div>

        {makeTree(treeData)}

        <button
          className="submit-button"
          onClick={async () => {
            const data: Record<string, string> = {};
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              if (key) {
                data[key] = localStorage.getItem(key) || "";
              }
            }

            try {
              const response = await fetch('/submit-progress', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });

              if (response.ok) {
                alert("Progress submitted successfully!");
              } else {
                alert("Failed to submit progress.");
              }
            } catch (error) {
              console.error("Error submitting progress:", error);
              alert("Error submitting progress.");
            }
          }}
        >
          Save Progress
        </button>
      </div>
    </div>
  );
}

export default Tree;
