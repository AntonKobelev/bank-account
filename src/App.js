import { useReducer } from "react";
import "./styles.css";

const initialState = {
  balance: 0,
  loan: 0,
  disabledButtons: {
    openAccount: false,
    deposit: true,
    withdraw: true,
    requestLoan: true,
    payLoan: true,
    closeAccount: true,
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: state.balance + 500,
        disabledButtons: {
          ...state,
          openAccount: true,
          deposit: false,
          withdraw: false,
          requestLoan: false,
          payLoan: false,
          closeAccount: false,
        },
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      if (state.balance > 0) {
        return {
          ...state,
          balance: state.balance - 50,
        };
      }
      return state;
    case "requestLoan":
      if (state.loan === 0) {
        const newBalance = state.balance + action.payload;
        const newLoan = state.loan + action.payload;
        return {
          ...state,
          balance: newBalance,
          loan: newLoan,
        };
      }
      return state;
    case "payLoan":
      if (state.loan > 0) {
        const newBalance = state.balance - state.loan;
        const newLoan = 0;
        return {
          ...state,
          balance: newBalance,
          loan: newLoan,
        };
      }
      return state;
    case "closeAccount":
      if (state.balance === 0 && state.loan === 0) {
        return initialState;
      }
      return state;
    default:
      return state;
  }
}

function App() {
  const [{ balance, loan, disabledButtons }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={disabledButtons.openAccount}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit", payload: 150 });
          }}
          disabled={disabledButtons.deposit}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw", payload: 50 });
          }}
          disabled={disabledButtons.withdraw}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "requestLoan", payload: 5000 });
          }}
          disabled={disabledButtons.requestLoan}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={disabledButtons.payLoan}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={disabledButtons.closeAccount}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

export default App;
