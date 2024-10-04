import * as React from 'react';
import Case from './Case';

type StageProps = {
  name: string;
  id: string;
  cases: any[]
}

export default function Stage(input: StageProps) {
  return (
    <div className='stage-item'>
      <div className='stage-title'>{input.name}</div>
      {input.cases.map((caseInput) => <Case name={caseInput.name} id={caseInput.id} tasks={caseInput.tasks} />)}
    </div>
  )
}