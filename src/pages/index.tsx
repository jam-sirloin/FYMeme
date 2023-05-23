import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log(localStorage.getItem('myWorkoutList'));
  }, []);

  const workoutList = useMemo(() => {
    if (!mounted) return null; // to solve hydration error

    const myWorkoutList =
      typeof window !== 'undefined'
        ? localStorage.getItem('myWorkoutList')
        : null;

    return myWorkoutList ? JSON.parse(myWorkoutList) : [];
  }, [mounted]);

  return (
    <main>
      <h1>메인 페이지</h1>
      <ul>
        {workoutList &&
          workoutList.map((workoutName: string, index: number) => (
            <li key={index}>{workoutName}</li>
          ))}
      </ul>
      <Link href="/workout/create">등록 페이지로</Link>
    </main>
  );
}
