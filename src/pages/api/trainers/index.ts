import type { NextApiRequest, NextApiResponse } from 'next';

import { trainers } from '@/data';
import { ITrainer } from '@/interfaces';

export default function getAllTrainers(
  req: NextApiRequest,
  res: NextApiResponse<ITrainer[]>
) {
  res.status(200).json(trainers);
}
