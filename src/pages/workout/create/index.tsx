import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { Trainer } from '@/interfaces';

type Props = {
  data: Trainer[];
};

export default function WorkoutCreate({ data }: Props) {
  const [workoutName, setWorkoutName] = useState('');
  const [trainerList, setTrainerList] = useState<string[] | null>(null);

  useEffect(() => {
    if (!data) return;

    const myTrainerList = data.map((trainer: Trainer) => trainer.name);
    setTrainerList(myTrainerList);
  }, [data]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setWorkoutName(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // 페이지 리로딩 방지

    try {
      const myWorkoutList = localStorage.getItem('myWorkoutList');
      const newWorkoutList = myWorkoutList
        ? (JSON.parse(myWorkoutList) as string[])
        : [];

      newWorkoutList.push(workoutName);
      localStorage.setItem('myWorkoutList', JSON.stringify(newWorkoutList));

      alert(workoutName);
      setWorkoutName('');
    } catch (error) {
      alert(`Error accessing localStorage: ${error}`);
    }
  }

  return (
    <main>
      <h1>등록 페이지</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <label>
          Today&apos;s Trainer:
          <select>
            {trainerList &&
              trainerList.map((trainerName: string, index: number) => (
                <option key={index} value={trainerName}>
                  {trainerName}
                </option>
              ))}
          </select>
        </label>
        <label>
          Today&apos;s Workout:
          <input type="text" value={workoutName} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Link href="/">메인 페이지로</Link>
    </main>
  );
}

export async function getServerSideProps() {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://my-workout-app.vercel.app'
      : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/trainers`);
  const data = await res.json();

  return { props: { data } };
}
