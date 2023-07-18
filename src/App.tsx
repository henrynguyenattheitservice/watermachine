import React from 'react';
import './App.css';
import {createMachine} from "xstate";
import {useMachine} from "@xstate/react";

const waterMachine = createMachine({
  id: 'water',
  initial: 'liquid',
  states: {
    ice:  {
      on : {
        HEAT: {
          target: "liquid"
        }

      }
    },
    liquid: {
      on: {
        HEAT: {
          target: "gas"
        },
        FREEZE: {
          target: "ice"
        }
      }
    },
    gas: {
      on: {
        HEAT: {
          target: "plasma"
        },
        FREEZE: {
          target: "liquid"
        }
      }
    },
    plasma: {
      on: {
        FREEZE: {
          target: "gas"
        }
      }
    }
  }
});
function App() {
  const [current, send] = useMachine(waterMachine);

  return (
      <div className="App">
        <strong>{current.value}</strong>
        <br />

        <button onClick={() => send("HEAT")}>heat</button>
        <button onClick={() => send("FREEZE")}>freeze</button>

      </div>
  );
}

export default App;
