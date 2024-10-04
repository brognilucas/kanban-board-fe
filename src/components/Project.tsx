import * as React from 'react';
import Stage from './Stage';

import { DndContext } from '@dnd-kit/core';
import Client from '../api/client';

type ProjectProps = {
  client: Client
}

export function Project(input: ProjectProps) {
  const [project, setProject] = React.useState<any>(null);

  async function getProject() {
    const projects = await input.client.getProjects()
    setProject(projects[0]);
  }

  React.useEffect(() => {
    getProject()
  }, [])

  if (!project) return null;

  async function handleDragOver(event: any) {
    const record = event.active.data.current;
    const nextStage = event.over.data.current;
    await input.client.changeStageOfCase(record, nextStage.id, project.id);
    await getProject()
  }

  return (
    <DndContext onDragEnd={handleDragOver}>
      <div className='project'>
        <span className='project-name'>{project.name}</span>
        <div className='stage'>
          {project.stages.map((stage: any, index: number) => (
            <Stage index={index} key={stage.id} name={stage.name} id={stage.id} cases={stage.cases} />
          ))}
        </div>
      </div>
    </DndContext>
  )
}