'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
  isDeleted: boolean;
};

export default function CompleteTodo(task: Task) {
  const router = useRouter();

  async function handleComplete() {
    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isCompleted: true,
      }),
    });
    router.refresh();
  }

  return (
    <>
      <div>
        <button className='btn btn-success shadow-md btn-sm' onClick={handleComplete}>
          Complete
        </button>
      </div>
    </>
  );
}
