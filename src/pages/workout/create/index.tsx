import Link from 'next/link';
import { FormEvent } from 'react';

export default function WorkoutCreate() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    alert((e.target as any).name.value);
  }

  return (
    <main>
      <h1>등록 페이지</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Link href="/">메인 페이지로</Link>
    </main>
  );
}
