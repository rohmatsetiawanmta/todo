'use client';

import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTodo() {
  const [newTaskName, setNewTaskName] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e: SyntheticEvent) {
    setLoading(true);
    e.preventDefault();
    await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newTaskName,
        isCompleted: false,
        isDeleted: false,
      }),
    });
    setNewTaskName('');
    router.refresh();
    setModal(false);
    setLoading(false);
  }

  return (
    <>
      <div>
        <button className='btn shadow-md' onClick={handleChange}>
          Add New
        </button>
        <input type='checkbox' checked={modal} onChange={handleChange} className='modal-toggle' />

        <div className='modal'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Add New Todo</h3>
            <form onSubmit={handleSubmit}>
              <div className='form-control'>
                <label className='label font-bold'>Task Name</label>
                <input
                  type='text'
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
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
                    Saving...
                  </button>
                ) : (
                  <button type='submit' className='btn bg-indigo-900 text-indigo-100 hover:bg-indigo-800 text-indigo-200'>
                    Save
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
