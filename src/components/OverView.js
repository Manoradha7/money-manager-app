import { Typography,Button } from "@mui/material";
import { useState } from "react";
import { AddTransaction } from "./AddTransaction";
import {useHistory} from 'react-router-dom'

export function OverView({ addTransaction, expense, income }) {
 const history = useHistory()
  // using useState hook get value of the show variable
  const [show, setShow] = useState(false);
  return (
    <div className="overview-box">
      <div className="expense-container">
        <div className="income-box">
          Income<hr/><span className="income-value">${income}</span>
        </div>
        <div className="expense-box">
          Expense<hr/><span className="expense-value">${expense}</span>
        </div>
        <div className="balance_box">
        Balance<hr/><span>${income - expense}</span>
        </div>
      </div>
      <div className="balance-box">
        <Button
          variant="contained"
          style={{ marginLeft: "auto" }}
          onClick={() => setShow(!show)}
        > 

        {/* If show value true the change value of the button into cancel otherwise keep the value as ADD  */}
          {show ? "Cancel" : "ADD"}
        </Button>
        <Button  variant="contained" onClick={()=>history.push("/alltransaction")}>All Transaction</Button>
      </div>
      
      {show && (
        <AddTransaction setShow={setShow} addTransaction={addTransaction} />
      )}
      <div className="quotes_container">
      <Typography variant="body1" gutterBottom>
        Don't Save what is left Spending, But Spend what is left after Savings <br/> -Warren Buffet
      </Typography>
      </div>
   

    </div>
  );
}
