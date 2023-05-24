import type { NextApiRequest, NextApiResponse } from 'next';

import { trainers } from '@/data';
import { Trainer } from '@/interfaces';

export default function getAllTrainers(
  req: NextApiRequest,
  res: NextApiResponse<Trainer[]>
) {
  res.status(200).json(trainers);
}
