import Link from 'next/link';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

import { Trainer } from '@/interfaces';

type Props = {
  data: Trainer[];
};

export default function WorkoutCreate({ data }: Props) {
  const trainerList = useMemo(() => {
    return data.map((trainer: Trainer) => trainer.name);
  }, [data]);

  const DEFAULT_FORM_VALUES = {
    trainerName: trainerList[0],
    workoutName: '',
  };

  const [workoutForm, setWorkoutForm] = useState(DEFAULT_FORM_VALUES);

  const { trainerName, workoutName } = workoutForm;

  function handleChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const { name, value } = e.target;

    setWorkoutForm({
      ...workoutForm,
      [name]: value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // 페이지 리로딩 방지

    if (workoutName.length === 0) {
      alert('운동 이름을 입력해주세요.');
      return;
    }

    try {
      const myWorkoutList = localStorage.getItem('myWorkoutList');
      const newWorkoutList = myWorkoutList
        ? (JSON.parse(myWorkoutList) as string[])
        : [];

      newWorkoutList.push(workoutName);
      localStorage.setItem('myWorkoutList', JSON.stringify(newWorkoutList));

      alert(`${workoutName} (with ${trainerName})`);
      setWorkoutForm(DEFAULT_FORM_VALUES);
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
          <select
            name="trainerName"
            value={trainerName}
            onChange={handleChange}
          >
            {trainerList.map((trainerName: string, index: number) => (
              <option key={index}>{trainerName}</option>
            ))}
          </select>
        </label>
        <label>
          Today&apos;s Workout:
          <input
            type="text"
            name="workoutName"
            value={workoutName}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
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
