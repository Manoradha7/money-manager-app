import { Button, TextField } from "@mui/material";
import { useState } from "react";

export function AddTransaction(props) {
  // using useState hook get the value of the amount,desc,type variable
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState();
  const [type, setType] = useState("INCOME");
  const addTransaction = () => {
    //when the button is clicked the value changed according to that the addtransaction box is closed
    props.setShow();
    //for showing the payload in screen and calculation
    console.log(amount, desc, type);
    props.addTransaction({
      amount: Number(amount),
      desc,
      type,
      id: Date.now(),
    });
  };
  return (
    <div className="add-transaction">
      <TextField
        id="standard-basic"
        type="number"
        label="Amount"
        variant="standard"
        value={amount}
        onChange={(x) => setAmount(x.target.value)}
        required />
      <TextField
        id="standard-basic"
        type="text"
        label="Description"
        variant="standard"
        value={desc}
        onChange={(x) => setDesc(x.target.value)}
        required />
      <div className="radio-btn">
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(x) => setType(x.target.value)} />
        <label htmlFor="income">Income</label>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(x) => setType(x.target.value)} />
        <label htmlFor="expense">Expense</label>
      </div>
      <div className="trans-btn">
        <Button
          variant="contained"
          style={{ marginLeft: "auto" }}
          onClick={addTransaction}
        >
          ADD Transaction
        </Button>
      </div>
    </div>
  );
}
