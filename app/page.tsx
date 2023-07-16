import AddTodo from './addTodo';
import CompleteTodo from './completeTodo';
import DeleteTodo from './deleteTodo';
import UpdateTodo from './updateTodo';

export const metadata = {
  title: 'To Do List',
};

type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
  isDeleted: boolean;
};

async function getTaskList() {
  const res = await fetch('http://localhost:5000/tasks', { cache: 'no-store' });
  return res.json();
}

export default async function TaskList() {
  const tasks: Task[] = await getTaskList();

  return (
    <div className='w-3/4 p-10 bg-indigo-200 text-indigo-900 rounded-2xl'>
      <div>
        <div className='py-2'>
          <AddTodo />
        </div>
        <table className='table w-full'>
          <thead className='text-lg'>
            <tr>
              <td>NO</td>
              <td>TASK NAME</td>
              <td>ACTIONS</td>
            </tr>
          </thead>
          <tbody className='text-lg'>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td className='flex justify-between'>
                  <div>{task.name}</div>
                  {task.isDeleted ? (
                    <div className='bg-red-300 px-2 py-1 rounded-md text-sm'>Deleted</div>
                  ) : task.isCompleted ? (
                    <div className='bg-green-300 px-2 py-1 rounded-md text-sm'>Completed</div>
                  ) : (
                    <div className='bg-yellow-300 px-2 py-1 rounded-md text-sm whitespace-nowrap'>Not Completed</div>
                  )}
                </td>
                <td>
                  <div className='flex gap-2'>
                    <CompleteTodo {...task} />
                    <UpdateTodo {...task} />
                    <DeleteTodo {...task} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
