import * as React from 'react';
import Stage from './Stage';

type ProjectProps = {
  name: string;
  stages: any[]
}



export function Project(input: ProjectProps) {
  return (
    <div className='project'>
      <span className='project-name'>{input.name}</span>
      <div className='stage'>
        {input.stages.map((stage) => (
          <Stage name={stage.name} id={stage.id} cases={stage.cases} />
        ))}
      </div>
    </div>
  )
}