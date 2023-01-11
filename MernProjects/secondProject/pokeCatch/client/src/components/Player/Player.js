import React from "react"

export const PlayerVariables = createContext()

export default function Player() {
  

  return (
    <PlayerVariables.Provider
      value={{
        setPlayerLocation,
        setRunning,
        setWalking,
        setIdle,
        setDirection,
      }}
    >
      <div></div>
    </PlayerVariables.Provider>
  )
}
