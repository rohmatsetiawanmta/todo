'use client';

import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
  isDeleted: boolean;
};

export default function UpdateTodo(task: Task) {
  const [taskName, setTaskName] = useState(task.name);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e: SyntheticEvent) {
    setLoading(true);
    e.preventDefault();
    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: taskName,
      }),
    });
    router.refresh();
    setModal(false);
    setLoading(false);
  }

  return (
    <>
      <div>
        <button className='btn btn-info btn-sm shadow-md' onClick={handleChange}>
          Edit
        </button>
        <input type='checkbox' checked={modal} onChange={handleChange} className='modal-toggle' />

        <div className='modal'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Edit Todo</h3>
            <form onSubmit={handleUpdate}>
              <div className='form-control'>
                <label className='label font-bold'>Task Name</label>
                <input
                  type='text'
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className='input w-full input-bordered'
                  placeholder='Task Name'
                />
              </div>
              <div className='modal-action'>
                <button type='button' className='btn' onClick={handleChange}>
                  Close
                </button>
                {loading ? (
                  <button type='button' className='btn bg-indigo-900 text-indigo-100 hover:bg-indigo-800 text-indigo-200'>
                    Updating...
                  </button>
                ) : (
                  <button type='submit' className='btn bg-indigo-900 text-indigo-100 hover:bg-indigo-800 text-indigo-200'>
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
