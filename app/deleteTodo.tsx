'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
  isDeleted: boolean;
};

export default function DeleteTodo(task: Task) {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleDelete() {
    setLoading(true);
    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isDeleted: true,
      }),
    });
    router.refresh();
    setModal(false);
    setLoading(false);
  }

  return (
    <>
      <div>
        {task.isDeleted ? (
          <button disabled={true} className='btn btn-error shadow-md btn-sm' onClick={handleChange}>
            Delete
          </button>
        ) : (
          <button className='btn btn-error shadow-md btn-sm' onClick={handleChange}>
            Delete
          </button>
        )}

        <input type='checkbox' checked={modal} onChange={handleChange} className='modal-toggle' />

        <div className='modal'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Are you sure to delete task {task.name}?</h3>

            <div className='modal-action'>
              <button type='button' className='btn' onClick={handleChange}>
                Close
              </button>
              {loading ? (
                <button type='button' className='btn bg-indigo-900 text-indigo-100 hover:bg-indigo-800 text-indigo-200'>
                  Deleting...
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => handleDelete()}
                  className='btn bg-indigo-900 text-indigo-100 hover:bg-indigo-800 text-indigo-200'>
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
