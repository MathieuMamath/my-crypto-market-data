import { useState } from 'react';
import { GoSync } from 'react-icons/go';

import { getDatetime } from '../services/getDatetime.ts';
import { useFetchRecentTradesQuery } from '../store/index.ts';
import RecentTradesTableHeader from './RecentTradesTableHeader.tsx';
import { SymbolProps } from '../store/apis/symbolsApi';

function RecentTrades({ symbol }: { symbol: SymbolProps}) {
  const { data, error, isFetching } = useFetchRecentTradesQuery(symbol.name);
  const [sort, setSort] = useState<{by: string, order: 'asc' | 'desc'}>({ by: '', order: 'asc'});

  if (isFetching) {
    return <GoSync/>;
  }
  if (error) {
    return <div>Error while fetching recent trades for {symbol.name}...</div>
  }
  if (!data) {
    return <div>No recent trades for {symbol.name}...</div>
  }

  const headers = [
    { label:`Price (${symbol.quoteAsset})`, name: 'price' },
    { label:`Quantity (${symbol.baseAsset})`, name: 'qty' },
    { label:'Time', name: 'time' },
  ];

  const renderedRows = Object.values(data)
    .sort((a, b) => {
      const reverseOrder = sort.order === 'asc' ? 1 : -1;

      return (a[sort.by] - b[sort.by]) * reverseOrder;
    })
    .map(rowData => {
      return <tr key={rowData.id}>
        <td className={`p-1 ${rowData.isBuyerMaker ? 'text-emerald-400' : 'text-rose-500'}`} title={rowData.isBuyerMaker ? 'Is buyer maker' : ''}>
          {rowData.price}
        </td>
        <td className="p-1">{rowData.qty}</td>
        <td className="p-1">{getDatetime(rowData.time)}</td>
      </tr>;
    });

  const handleSortBy = (column: string) => {
    if (sort.order === 'asc') {
      setSort({by: column, order: 'desc'});
      return;
    }

    setSort({by: column, order: 'asc'});
  };

  return (<div className="ml-5 mr-5 mt-5 w-full">
      <h2 className="font-bold">Recent Trades</h2>
      <table className="w-full mt-5">
        <thead className="border-b border-neutral-500">
          <tr>
            {headers.map(header =>
              <RecentTradesTableHeader
                key={header.name}
                sort={sort}
                handleSort={handleSortBy}
                {...header}
              />
            )}
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