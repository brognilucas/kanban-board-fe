import * as React from 'react';
import './App.css';
import { Project } from './components/Project';
import Client from './api/client';


type Input = { 
  client: Client
}; 

function App({ client }: Input) {

  const [project, setProject] = React.useState<any>(null); 

  async function getProject() { 
    const projects = await client.getProjects()
    console.log({ projects })

    setProject(projects[0]);
  }

  React.useEffect(() => {
    getProject()
  }, [])

  if (!project) return null;
  
  console.log({ project })
  return (
    <div className="App">
      <Project name={project.name} stages={project.stages} />
    </div>
  );
}

export default App;
