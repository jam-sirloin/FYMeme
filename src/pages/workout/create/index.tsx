import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function WorkoutCreate() {
  const [name, setName] = useState('');

  function handleChange(e: FormEvent<HTMLInputElement>) {
    setName((e.target as any).value);
  }

  function handleSubmit() {
    alert(name);
  }

  return (
    <main>
      <h1>등록 페이지</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Link href="/">메인 페이지로</Link>
    </main>
  );
}
