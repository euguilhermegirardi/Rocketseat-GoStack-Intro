import React, { useState, useEffect } from 'react';

import './App.css';
import backgroundImage from './assets/harley.jpg';
import Header from './components/Header';
import api from './services/api';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response);
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject() {
    // '.push' edit 'projects' (original state) instead of create a new array.
    // projects.push(`New Project ${Date.now()}`);

    // Mutable
    // setProjects([...projects, `New Project ${Date.now()}`]);
    const response = await api.post('projects', {
      "title": `New Project ${Date.now()}`,
      "owner": "Lua Girardi"
    });

    const project = response.data;
    setProjects([...projects, project]);
  }

  return  (
    <>
      <Header title="Homepage">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </Header>

      <img src={backgroundImage} alt="background-image" width={500}/>

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Add a project</button>
    </>
  )
}

export default App;

/**
 * ReactJS
 *
 * Component
 * Props
 * State
 */
