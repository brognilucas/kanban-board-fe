import * as React from 'react';
import Stage from './Stage';

import { DndContext } from '@dnd-kit/core';
import Modal from './Modal';
import AddStageButton from './AddStageButton';
import Client from '../api/client.interface';

type ProjectProps = {
  client: Client
}

export function Project(input: ProjectProps) {
  const [project, setProject] = React.useState<any>(null);
  const [addStageModalOpen, setAddStageModalOpen] = React.useState(false);
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

  async function addCase(name: string) {
    const [stage] = project.stages;
    await input.client.createCase(project.id, stage.id, name);
    await getProject();
  }

  async function addStage(name: string) {
    await input.client.addStageToProject(project.id, name);
    await getProject();
  }

  return (
    <DndContext onDragEnd={handleDragOver}>
      <Modal modalTestId='add-stage-modal' label='Add stage' show={addStageModalOpen} handleClose={() => setAddStageModalOpen(false)} handleSubmit={addStage} />
      <div className='project'>
        <span className='project-name'>{project.name}</span>
        <div className='stage'>
          {project.stages.map((stage: any, index: number) => (
            <Stage
              addCase={addCase}
              client={input.client}
              index={index}
              key={stage.id}
              name={stage.name}
              id={stage.id}
              cases={stage.cases}
            />
          ))}
          <AddStageButton onClick={() => setAddStageModalOpen(true)} />
        </div>
      </div>
    </DndContext>
  )
}