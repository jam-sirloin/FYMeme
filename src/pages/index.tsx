import Link from 'next/link';
import { useEffect, useMemo } from 'react';

export default function Home() {
  useEffect(() => {
    console.log(localStorage.getItem('myWorkoutList'));
  }, []);

  const workoutList = useMemo(() => {
    const myWorkoutList =
      typeof window !== 'undefined'
        ? localStorage.getItem('myWorkoutList')
        : null;

    return myWorkoutList ? JSON.parse(myWorkoutList) : [];
  }, []);

  return (
    <main>
      <h1>메인 페이지</h1>
      <ul>
        {workoutList.map((workoutName: string, index: number) => (
          <li key={index}>{workoutName}</li>
        ))}
      </ul>
      <Link href="/workout/create">등록 페이지로</Link>
    </main>
  );
}
