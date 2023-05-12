import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    console.log(localStorage.getItem('myWorkoutList'));
  }, []);

  return (
    <main>
      <h1>메인 페이지</h1>
      <Link href="/workout/create">등록 페이지로</Link>
    </main>
  );
}
