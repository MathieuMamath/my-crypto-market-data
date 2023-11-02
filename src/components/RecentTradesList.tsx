import { useState } from 'react';
import { GoSync, GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { format } from 'date-fns'

import { useFetchRecentTradesQuery } from '../store';
import {
  RecentTradesWrapper,
  RecentTradesTable,
  RecentTradesTableHeader
} from './RecentTrades.styles.ts';

function RecentTrades({ symbol }: { symbol: string}) {
  const { data, error, isFetching } = useFetchRecentTradesQuery(symbol);
  const [sortOrder, setSortOrder] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  if (isFetching) {
    return <GoSync/>;
  } else if (error) {
    return <div>Error while fetching recent trades for {symbol}...</div>
  } else if (!data) {
    return <div>No recent trades for {symbol}...</div>
  }

  const headers = [
    { label:'Price', key: 'price' },
    { label:'Quantity', key: 'qty' },
    { label:'Volume', key: 'quoteQty' },
    { label:'Time', key: 'time' },
  ];

  const getTime = (timestamp: number): string => {
    const date = format(new Date(timestamp), 'yyyy/MM/dd HH:mm:ss');

    return date;
  };

  const renderedRows = Object.values(data)
    .sort((a, b) => {
      const reverseOrder = sortOrder === 'asc' ? 1 : -1;

      return (a[sortBy] - b[sortBy]) * reverseOrder;
    })
    .map(rowData => {
      return <tr key={rowData.id}>
        <td className={`${rowData.isBuyerMaker === true ? 'green' : 'red'}`} title={rowData.isBuyerMaker === true ? 'Is buyer maker': ''}>
          {rowData.price}
        </td>
        <td>{rowData.qty}</td>
        <td>{rowData.quoteQty}</td>
        <td>{getTime(rowData.time)}</td>
      </tr>;
    });

  const handleSortBy = (column: string) => {
    if (column !== sortBy ) {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }

    setSortBy(column);
  };


  const renderedHeaderSorting = (key: string) => {
    if (sortBy !== key) {
      return <div>
        <GoTriangleUp/>
        <GoTriangleDown/>
      </div>;
    }

    if (sortOrder === '') {
      return <div>
        <GoTriangleUp/>
        <GoTriangleDown/>
      </div>;
    } else if (sortOrder === 'asc') {
      return <div>
        <GoTriangleUp/>
      </div>;
    } else if (sortOrder === 'desc') {
      return <div>
        <GoTriangleDown/>
      </div>;
    }
  };

  const renderHeader = headers.map(header =>
    <th key={header.key} onClick={() => handleSortBy(header.key)}>
      <RecentTradesTableHeader>
        <div className="mr-2">
          {renderedHeaderSorting(header.key)}
        </div>
        <div className={`${header.key === sortBy && 'sorted'}`}>{header.label}</div>
      </RecentTradesTableHeader>
    </th>
  );

  return (
    <RecentTradesWrapper>
      <h2>Recent Trades</h2>
      <RecentTradesTable>
        <thead>
          <tr>
            {renderHeader}
          </tr>
        </thead>
        <tbody>
          {renderedRows}
        </tbody>
      </RecentTradesTable>
    </RecentTradesWrapper>
  );
}

export default RecentTrades;