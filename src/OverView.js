import { Typography, Button } from "@mui/material";
import { useState } from "react";
import { AddTransaction } from "./AddTransaction";

export function OverView({ addTransaction, expense, income }) {

  // using useState hook get value of the show variable
  const [show, setShow] = useState(false);
  return (
    <div className="overview-box">
      <div className="balance-box">
        <Typography stye={{ marginRight: "auto" }}>Balance:${income - expense}</Typography>
        <Button
          variant="contained"
          style={{ marginLeft: "auto" }}
          onClick={() => setShow(!show)}
        > 

        {/* If show value true the change value of the button into cancel otherwise keep the value as ADD  */}
          {show ? "Cancel" : "ADD"}
        </Button>
      </div>
      
      {show && (
        <AddTransaction setShow={setShow} addTransaction={addTransaction} />
      )}

      {/* container for total income and expenditure */}
      <div className="expense-container">
        <div className="income-box">
          Income<span className="income-value">{income}</span>
        </div>
        <div className="expense-box">
          Expense<span className="expense-value">{expense}</span>
        </div>
      </div>
    </div>
  );
}
