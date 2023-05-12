import Link from 'next/link';

export default function Home() {
  console.log(localStorage.getItem('myWorkoutList'));

  return (
    <main>
      <h1>메인 페이지</h1>
      <Link href="/workout/create">등록 페이지로</Link>
    </main>
  );
}
