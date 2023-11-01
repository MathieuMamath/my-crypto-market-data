import { useState } from "react";
import styled from "styled-components";
import { SymbolProps } from "../store/apis/symbolsApi";

type SymbolDropdownProps = {
  symbols: SymbolProps[],
  selectedSymbol: string,
  onChange: (a: string) => void,
};

const SymbolDropdownWrapper = styled.div`
  background: white;
  height: 5rem;
  width: 10rem;
  // border: black 1px solid;
`;

const Selector = styled.div`
  height: 3rem;
  width: 10rem;
  border: black 1px solid;
  border-radius: 4px;
`;

const SelectorList = styled.div`
  max-height: 10rem;
  overflow-y: scroll;
`;

function SymbolDropdown({ symbols, selectedSymbol, onChange }: SymbolDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderedSymbols = symbols.map(symbol => {
    return <div key={symbol.name} onClick={() => onChange(symbol.name)}>
      {symbol.name}
    </div>
  });

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SymbolDropdownWrapper onClick={handleOpen}>
      <Selector className="w-8">
        {selectedSymbol}
      </Selector>
      {isOpen &&
        <SelectorList>
          {renderedSymbols}
        </SelectorList>
      }
    </SymbolDropdownWrapper>
  );
}

export default SymbolDropdown;