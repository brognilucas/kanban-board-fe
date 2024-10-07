import * as React from 'react';

type Props = {
  onClick: () => void;
}

export default function CreateCaseButton({ onClick }: Props) { 
  return (
    <button data-testid='create-case-btn' onClick={onClick} className='add-new-case'>+ Create Case</button>
  )
}