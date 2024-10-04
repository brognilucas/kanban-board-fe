import * as React from 'react';
import { useDraggable } from '@dnd-kit/core';

type CaseInput = {
  id: string;
  name: string;
  tasks: any[]
  index: number;
}

export default function Case(input: CaseInput) {

  const { setNodeRef, listeners, attributes } = useDraggable({
    id: `draggable-${input.id}`,
    data: input,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className='case-card'>
      <h2 className='case-title'>{input.name}</h2>
      <div className='progress-bar'></div>
    </div>
  )
}