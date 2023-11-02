import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 30px;
`;

export const Field = styled.div`
  display: flex;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-weight: bold;
`;

export const Error = styled.div`
  color: #e53e3e;
  font-size: 10px;
  position: absolute;
`;

export const Dropdown = styled.input`
  display: flex;
  align-items: center;
  height: 40px;
  border: #4a5568 solid 1px;
  border-radius: 5px;
  margin-right: 10px;
  width: 200px;
  padding-left: 20px;

  &.error {
    border: #e53e3e solid 1px;
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  border: #4a5568 solid 1px;
  border-top: 0;
  border-radius: 5px;
  margin-right: 10px;
  width: 200px;
  overflow-y: scroll;
  max-height: 200px;
  background: white;
`;

export const DropdownItem = styled.div`
  padding-left: 20px;
  padding-top: 2px;
  padding-bottom: 2px;

  &:hover {
    background: #edf2f7;
  }
`;

export const Button = styled.button`
  color: white;
  background: #667eea;
  height: 40px;
  padding: 0 20px;
  border-radius: 5px;
`;