import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function WorkoutCreate() {
  const [name, setName] = useState('');

  function handleChange(e: FormEvent<HTMLInputElement>) {
    setName((e.target as any).value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // 페이지 리로딩 방지

    const myWorkoutList = localStorage.getItem('myWorkoutList');

    if (!myWorkoutList) {
      const newWorkoutList = [];

      newWorkoutList.push(name);
      localStorage.setItem('myWorkoutList', JSON.stringify(newWorkoutList));
    } else {
      const newWorkoutList = JSON.parse(myWorkoutList);

      newWorkoutList.push(name);
      localStorage.setItem('myWorkoutList', JSON.stringify(newWorkoutList));
    }

    alert(name);
    setName('');
  }

  return (
    <main>
      <h1>등록 페이지</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Link href="/">메인 페이지로</Link>
    </main>
  );
}
