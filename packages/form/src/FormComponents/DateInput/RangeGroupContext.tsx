import React, { createContext, useContext, useMemo, useState } from 'react';

import { rangeGroupContainer } from './styles';

interface RangeGroupContextValue {
  startValue: string | undefined;
  setStartValue: (value: string | undefined) => void;
}

const RangeGroupContext = createContext<RangeGroupContextValue | undefined>(undefined);

export const RangeGroup = ({ children }: { children: React.ReactNode }) => {
  const [startValue, setStartValue] = useState<string | undefined>(undefined);
  const value = useMemo(() => ({ startValue, setStartValue }), [startValue]);

  return (
    <RangeGroupContext.Provider value={value}>
      <div css={rangeGroupContainer}>{children}</div>
    </RangeGroupContext.Provider>
  );
};

export const useRangeGroup = () => useContext(RangeGroupContext);
