import { useCallback } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { NONE } from '@/constants';
import { IOption } from '@/interfaces';

const DEFAULT_FORM_VALUES = {
  trainerCode: NONE,
  workoutName: '',
};

type Props = {
  trainerList: IOption[];
};

export default function WorkoutForm({ trainerList }: Props) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const workoutName = useWatch({
    control,
    name: 'workoutName',
  });

  const onSubmit = useCallback(() => {
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

      alert('운동이 등록되었습니다.');
      reset();
    } catch (error) {
      alert(`Error accessing localStorage: ${error}`);
    }
  }, [reset, workoutName]);

  return (
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
          name="trainerCode"
          render={({ field }) => (
            <select {...field}>
              {trainerList.map((option: IOption, index: number) => (
                <option key={index} value={option.value}>
                  {option.label}
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
  );
}
