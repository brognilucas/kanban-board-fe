import * as React from 'react';

type Props = {
  onClick: () => void;
}

export default function AddStageButton({ onClick }: Props) {
  return (
    <button data-testid='add-stage-btn' className='add-stage' onClick={onClick}>+</button>
  )
}