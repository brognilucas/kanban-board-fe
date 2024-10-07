import * as React from 'react';
import Case from './Case';
import { useDroppable } from '@dnd-kit/core';
import Modal from './Modal';
import Client from '../api/client.interface';
import CreateCaseButton from './CreateCaseButton';

type StageProps = {
  name: string;
  id: string;
  cases: any[]
  index: number;
  client: Client;
  addCase: (name: string) => void;
}

export default function Stage(input: StageProps) {
  const { setNodeRef, } = useDroppable({
    id: `droppable-${input.id}`,
    data: input,
  });

  const [openModal, setOpenModal] = React.useState(false); 

  return (
    <div data-testid={`stage-column`} ref={setNodeRef} className='stage-item'>
      <div className='stage-title'>{input.name}</div>
      {input.cases.map((caseInput, index) => <Case index={index} key={caseInput.id} name={caseInput.name} id={caseInput.id} tasks={caseInput.tasks} />)}
      {input.index === 0 && (
        <>
          <CreateCaseButton onClick={() => setOpenModal(true)} />
          <Modal modalTestId='create-case-modal' label={'Create Case'} show={openModal} handleClose={() => setOpenModal(false)} handleSubmit={input.addCase} />
        </>
      )}
    </div>
  )
}