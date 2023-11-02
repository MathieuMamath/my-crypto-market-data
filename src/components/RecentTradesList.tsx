import { useState } from 'react';
import { GoSync, GoTriangleDown, GoTriangleUp } from 'react-icons/go';

import { useFetchRecentTradesQuery } from '../store';

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

  const renderedRows = Object.values(data)
    .sort((a, b) => {
      const reverseOrder = sortOrder === 'asc' ? 1 : -1;

      return (a[sortBy] - b[sortBy]) * reverseOrder;
    })
    .map(rowData => {
      return <tr className="border-b" key={rowData.id}>
        <td className="p-2">{rowData.price}</td>
        <td className="p-2">{rowData.qty}</td>
        <td className="p-2">{rowData.quoteQty}</td>
        <td className="p-2">{rowData.time}</td>
      </tr>;
    });

  const handleSortBy = (column: string) => {
    if (column !== sortBy ) {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else if (sortOrder === 'desc') {
      setSortOrder('');
    } else {
      setSortOrder('asc');
    }

    setSortBy(column);
  };

  const renderedHeaderSorting = (key: string) => {
    if (sortBy !== key) {
      return <>
        <GoTriangleUp/>
        <GoTriangleDown/>
      </>;
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
      {renderedHeaderSorting(header.key)}
      {header.label}
    </th>
  );

  return (
    <div>
      Recent Trades : {symbol}
      <table className="table-auto border-spacing-2">
        <thead>
          <tr className="border-b-2">
            {renderHeader}
          </tr>
        </thead>
        <tbody>
          {renderedRows}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTrades;