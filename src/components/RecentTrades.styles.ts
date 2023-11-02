import styled from 'styled-components';

export const RecentTradesWrapper = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;

  h2 {
    font-weight: bold;
  }
`;

export const RecentTradesTable = styled.table`
  width: 100%;
  margin-top: 20px;

  thead {
    border-bottom: rgb(75 85 99) 1px solid;
  }

  td {
    padding: 5px;
  }

  .red {
    color: rgb(244 63 94);
  }

  .green {
    color: rgb(52 211 153);
  }
`;

export const RecentTradesTableHeader = styled.div`
  display: flex;
  align-items: center;
  font-weight: initial;

  .sorted {
    font-weight: bolder;
  }
`;