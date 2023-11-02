import styled from 'styled-components';

export const TickerWrapper = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  border-top: 1px rgb(245 245 245) solid;
  border-bottom: 1px rgb(245 245 245) solid;
  align-items: center;

  h1 {
    font-weight: bold;
    font-size: 18px;
    margin-right: 50px;
  }

  .red {
    color: rgb(244 63 94);
    font-weight: bold;
  }

  .green {
    color: rgb(52 211 153);
    font-weight: bold;
  }
`;

export const TickerInfo = styled.div`
  margin-left: 50px;
  font-size: 12px;

  .label {

  }

  .value {
    font-weight: bold;
  }
`;