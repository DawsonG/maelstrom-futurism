import React, { ReactNode, createContext, useState } from "react";

const WizardContext = createContext({});

const Wizard = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(null);
  return (
    <WizardContext.Provider value={{ step, setStep }}>
      {children}
    </WizardContext.Provider>
  );
};

export default Wizard;
