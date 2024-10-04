import * as React from 'react'; 

type CaseInput = { 
  id: string;
  name: string; 
  tasks: any[]
}

export default function Case(input: CaseInput) { 
  return (
    <div className='case-card'>
      <h2 className='case-title'>{input.name}</h2>
      <div className='progress-bar'></div>
    </div>
  )
}