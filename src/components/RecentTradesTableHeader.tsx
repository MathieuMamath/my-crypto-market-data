import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

type RecentTradesTableHeaderProps = {
  label: string;
  name: string;
  sort: {
    by: string;
    order: 'asc' | 'desc';
  },
  handleSort: (name: string) => void;
};

function RecentTradesTableHeader({ label, name, sort, handleSort }: RecentTradesTableHeaderProps) {
  const renderedSorting = (name: string) => {
    if (sort.by !== name) {
      return <div>
        <GoTriangleUp/>
        <GoTriangleDown/>
      </div>;
    }
    if (sort.order === 'asc') {
      return <div>
        <GoTriangleUp/>
      </div>;
    }
    if (sort.order === 'desc') {
      return <div>
        <GoTriangleDown/>
      </div>;
    }
  };

  return (
    <th onClick={() => handleSort(name)}>
      <div className="flex items-center cursor-pointer font-normal">
        <div className="mr-2">
          {renderedSorting(name)}
        </div>
        <div className={`${name === sort.by && 'font-bold'}`}>{label}</div>
      </div>
    </th>
  );
}

export default RecentTradesTableHeader;