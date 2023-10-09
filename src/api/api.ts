import { useQuery } from '@tanstack/react-query';

import type { NhlStandings } from './types';

const fetchNhlStandings = async (): Promise<NhlStandings> => {
  const url = `https://statsapi.web.nhl.com/api/v1/standings`;
  const res = await fetch(url);
  return res.json() as unknown as NhlStandings;
};

const useNhlStandings = () => {
  return useQuery([`nhlStandings`], fetchNhlStandings);
};

export { useNhlStandings };
