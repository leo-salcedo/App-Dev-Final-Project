import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import './hmwk.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // change if using deployed backend

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
      children: [{ label: '2B', color: 'not-started' }],
    },
    {
      label: '3A',
      color: 'not-started',
      children: [{ label: '3B', color: 'not-started' }],
    },
    {
      label: '4A',
      color: 'not-started',
      children: [{ label: '4B', color: 'not-started' }],
    },
    { label: '5A', color: 'not-started' },
    { label: '6A', color: 'not-started' },
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

function Tree() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const nameParam = queryParams.get("name");
    const emailParam = queryParams.get("email");
    if (nameParam && emailParam) {
      localStorage.setItem("name", nameParam);
      localStorage.setItem("email", emailParam);
      setName(nameParam);
      setEmail(emailParam);
    } else {
      const localName = localStorage.getItem("name");
      const localEmail = localStorage.getItem("email");
      setName(localName);
      setEmail(localEmail);
    }
  }, [location.search]);

  const [statusMap, setStatusMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/progress?email=${email}`);
        const data = await res.json();
        setStatusMap(data.progress || {});
      } catch (err) {
        console.error('Failed to fetch progress:', err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchProgress();
    } else {
      setLoading(false);
    }
  }, [email]);

  const saveProgressToBackend = async (updated: Record<string, string>) => {
    try {
      await fetch(`${BACKEND_URL}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          email: email || '',
          progress: JSON.stringify(updated),
        }),
      });
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  };

  const toggleStatus = (label: string) => {
    const current = statusMap[label] || 'not-started';
    const next =
      current === 'not-started' ? 'in-progress' :
      current === 'in-progress' ? 'completed' :
      'not-started';

    const updated = {
      ...statusMap,
      [label]: next,
    };

    setStatusMap({ ...updated });
    saveProgressToBackend(updated);
  };

  const completed = Object.values(statusMap).filter(s => s === 'completed').length;
  const inProgress = Object.values(statusMap).filter(s => s === 'in-progress').length;
  const notStarted = Object.values(statusMap).filter(s => s === 'not-started').length;
  const total = completed + inProgress + notStarted || 1;

  const completedPercent = (completed / total) * 100;
  const inProgressPercent = (inProgress / total) * 100;
  const notStartedPercent = (notStarted / total) * 100;

  const click = (label: string) => {
    if (label !== "Bootcamp Homework") {
      navigate(`/Homework/${label}`);
    }
  };

  const makeTree = (node: TreeNode) => {
    const savedStatus = statusMap[node.label] || node.color;

    let colorClass = 'not-started';
    if (savedStatus === 'completed') colorClass = 'completed';
    else if (savedStatus === 'in-progress') colorClass = 'in-progress';

    return (
      <div className="tree-node">
        <div
          className={node.label === "Bootcamp Homework" ? "rectangle" : `triangle ${colorClass}`}
          onClick={() => click(node.label)}
        >
          <div className={node.label === "Bootcamp Homework" ? "rectangle-text" : "triangle-text"}>
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

        {node.children && (
          <div className="tree-children">
            {node.children.map((child, i) => (
              <div key={i} className="tree-branch">
                <div
                  className={
                    node.children.length === 2 ?
                    i === 0 ? 'line-left' : 'line-right' :
                    'line-straight'
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

  if (loading) {
    return <div className="tree-container">Loading...</div>;
  }

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
      </div>
    </div>
  );
}

export default Tree;
