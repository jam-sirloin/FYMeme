import { useCallback } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

type Props = {
  trainerList: string[];
};

export default function WorkoutForm({ trainerList }: Props) {
  const DEFAULT_FORM_VALUES = {
    trainerName: trainerList[0],
    workoutName: '',
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const trainerName = useWatch({
    control,
    name: 'trainerName',
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

      alert(`${workoutName} (with ${trainerName})`);
      reset();
    } catch (error) {
      alert(`Error accessing localStorage: ${error}`);
    }
  }, [reset, trainerName, workoutName]);

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
  );
}
