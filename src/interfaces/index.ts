export interface IOption<T extends string = string> {
  disabled?: boolean;
  label?: React.ReactNode;
  value: T;
}

export interface ITrainer {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
}
