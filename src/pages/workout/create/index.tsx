import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function WorkoutCreate() {
  const [workoutName, setWorkoutName] = useState('');

  function handleChange(e: FormEvent<HTMLInputElement>) {
    setWorkoutName((e.target as any).value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // 페이지 리로딩 방지

    const myWorkoutList = localStorage.getItem('myWorkoutList');
    const newWorkoutList = myWorkoutList ? JSON.parse(myWorkoutList) : [];

    newWorkoutList.push(workoutName);
    localStorage.setItem('myWorkoutList', JSON.stringify(newWorkoutList));

    alert(workoutName);
    setWorkoutName('');
  }

  return (
    <main>
      <h1>등록 페이지</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={workoutName} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Link href="/">메인 페이지로</Link>
    </main>
  );
}
