import React from 'react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact } from '@ag-grid-community/react';
import type { ColDef } from '@ag-grid-community/core';

// eslint-disable-next-line import/no-unassigned-import
import '@ag-grid-community/styles/ag-grid.css';
// eslint-disable-next-line import/no-unassigned-import
import '@ag-grid-community/styles/ag-theme-alpine.css';

import type { NhlStandingsRecord, NhlTeamRecord } from '../api/types';

type NhlDivisionStandingsProps = {
  record: NhlStandingsRecord;
};

const NhlDivisionStandings = ({ record }: NhlDivisionStandingsProps) => {
  const [columnDefs] = React.useState<ColDef[]>([
    { headerName: `Team`, field: `team.name` },
    { headerName: `Wins`, field: `leagueRecord.wins` },
    { headerName: `Losses`, field: `leagueRecord.losses` },
  ]);

  const [rowData] = React.useState<NhlTeamRecord[]>(record.teamRecords);

  return (
    <div className="ag-theme-alpine h-96 w-full">
      <AgGridReact
        defaultColDef={{
          sortable: true,
        }}
        columnDefs={columnDefs}
        rowData={rowData}
        modules={[ClientSideRowModelModule]}
        onGridReady={(params) => params.api.sizeColumnsToFit()}
      />
    </div>
  );
};

export { NhlDivisionStandings };
