import React from 'react';

import { useNhlStandings } from '../api/api';

import { NhlDivisionStandings } from './NhlDivisionStandings';

const NhlStandings = () => {
  const { isLoading, isError, data } = useNhlStandings();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <>
      {data.records.map((record) => {
        return <NhlDivisionStandings key={record.division.id} record={record} />;
      })}
    </>
  );
};

export { NhlStandings };
