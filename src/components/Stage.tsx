import * as React from 'react';
import Case from './Case';
import { useDroppable } from '@dnd-kit/core';

type StageProps = {
  name: string;
  id: string;
  cases: any[]
  index: number;
}

export default function Stage(input: StageProps) {
  const { setNodeRef, } = useDroppable({
    id: `droppable-${input.id}`,
    data: input,
  });
  return (
    <div ref={setNodeRef} className='stage-item'>
      <div className='stage-title'>{input.name}</div>
      {input.cases.map((caseInput, index) => <Case index={index} key={caseInput.id} name={caseInput.name} id={caseInput.id} tasks={caseInput.tasks} />)}
    </div>
  )
}