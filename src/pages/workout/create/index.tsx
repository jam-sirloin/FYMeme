import Link from 'next/link';
import { useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

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

  const reactHookForm = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const { control, handleSubmit, reset } = reactHookForm;

  const trainerName = useWatch({ control, name: 'trainerName' });
  const workoutName = useWatch({ control, name: 'workoutName' });

  function onSubmit() {
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
      reset();
    } catch (error) {
      alert(`Error accessing localStorage: ${error}`);
    }
  }

  return (
    <main>
      <h1>등록 페이지</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <label>
          Today&apos;s Trainer:
          <Controller
            control={control}
            name="trainerName"
            render={({ field }) => (
              <select {...field}>
                {trainerList.map((trainerName: string, index: number) => (
                  <option key={index} value={trainerName}>
                    {trainerName}
                  </option>
                ))}
              </select>
            )}
          />
        </label>
        <label>
          Today&apos;s Workout:
          <Controller
            control={control}
            name="workoutName"
            render={({ field }) => <input type="text" {...field} />}
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
