import "./App.css";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Transaction } from "./Transaction";
import { OverView } from "./OverView";
import { Charts } from "./Charts";

export default function App() {
  return (
    <div className="App">
      <Typography
        variant="h4"
        sx={{ fontFamily: "'Aladin', cursive" }}
        align="center"
        className="header"
      >
        Money Manager
      </Typography>
      <FormComponent />
    </div>
  );
}

function FormComponent(props) {
  //for transaction initially empty array
  const [transaction, setTransaction] = useState([]);

  // taking intially expense  and income as zero
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  // for updating the existing transaction
  const addTransaction = (payload) => {
    //for existing tranaction history using spread operator and updating the transaction
    const transactionArray = [...transaction];
    //pushing payload into the transaction array
    transactionArray.push(payload);
    //update the transaction Array with new transaction array
    setTransaction(transactionArray);
  };

  // for calculating the expentiture and income
  const CalculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transaction.map((payload) => {
      // if the type is expense then add amountto expense otherwise add amount to the income
      return payload.type === "EXPENSE"
        ? (exp = exp + payload.amount)
        : (inc = inc + payload.amount);
    });
    updateExpense(exp);
    updateIncome(inc);
  };
  // whenever the transaction value is changed the useEffect hook mounted for the calculation
  // eslint-disable-next-line
  useEffect(() => CalculateBalance(), [transaction]);

  return (
    <div className="maincontainer">
      <div className="details-box">
        <div className="overview">
          <OverView
            addTransaction={addTransaction}
            expense={expense}
            income={income}
          />
        </div>
        <div className="transaction">
          <Transaction transaction={transaction} />
        </div>
        <div className="seperateExpense">
          <WeeklyExpense expense={expense} income={income} />
          <MonthlyExpense expense={expense} income={income} />
        </div>
      </div>
    </div>
  );
}

function WeeklyExpense({ expense, income }) {
  return (
    <div className="monthly">
      <span className="month-text">
        <b>Week</b>
      </span>
      <div className="month-data">
        <span><b>Income :{Math.round(income / 52)}</b></span>
        <span><b>Expense :{Math.round(expense / 52)}</b></span>
      </div>
      <div className="charts">
        <Charts
          income={Math.round(income / 52)}
          expense={Math.round(expense / 52)}
        />
      </div>
    </div>
  );
}
function MonthlyExpense({ expense, income }) {
  return (
    <div className="monthly">
      <span className="month-text">
        <b>Month</b>
      </span>
      <div className="month-data">
        <span><b>Income :{Math.round(income / 12)}</b></span>
        <span><b>Expense :{Math.round(expense / 12)}</b></span>
      </div>
      <div className="charts">
        <Charts
          income={Math.round(income / 12)}
          expense={Math.round(expense / 12)}
        />
      </div>
    </div>
  );
}
