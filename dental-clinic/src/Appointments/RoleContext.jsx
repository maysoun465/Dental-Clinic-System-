import React, { createContext, useContext, useState } from "react";

const RoleContext = createContext(null);

export function RoleProvider({ children, initialRole = "patient" }) {
  const [role, setRole] = useState(initialRole); // for our context asa team now: "patient" or "doctor"

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used inside a RoleProvider");
  }
  return ctx; 
}
