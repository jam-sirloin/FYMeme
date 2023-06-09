import Link from 'next/link';
import { useMemo } from 'react';

import WorkoutForm from '@/components/workout/WorkoutForm';
import { Trainer } from '@/interfaces';

type Props = {
  data: Trainer[];
};

export default function WorkoutCreate({ data }: Props) {
  const trainerList: string[] = useMemo(() => {
    return data.map((trainer: Trainer) => trainer.name);
  }, [data]);

  return (
    <main>
      <h1>등록 페이지</h1>
      <WorkoutForm trainerList={trainerList} />
      <Link href="/">메인 페이지로</Link>
    </main>
  );
}

export async function getStaticProps() {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://my-workout-app.vercel.app'
      : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/trainers`);
  const data = await res.json();

  return { props: { data } };
}
