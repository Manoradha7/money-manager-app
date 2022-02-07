import "./App.css";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Transaction } from "./components/Transaction";
import { OverView } from "./components/OverView";
import { Charts } from "./components/Charts";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import { Signup } from "./user/Signup.js";
import { Signin } from "./user/Signin.js";
import { ForgotPassword } from "./user/ForgotPassword.js";
import { ResetPassword } from "./user/ResetPassword.js";
import { Message } from "./user/Message";
import { AllTransaction } from "./AllTransaction";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route path="/resetpassword/:id">
          <ResetPassword />
        </Route>
        <Route path="/activationmessage">
          <Message msg="Account Activated" />
        </Route>

        {/* Dashboard */}
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/alltransaction">
          <AllTransaction />
        </Route>
      </Switch>
    </div>
  );
}
function Dashboard() {
  const history = useHistory();
  return (
    <div className="App">
      <div className="logo_container">
        <Typography
          variant="h4"
          sx={{ fontFamily: "'Aladin', cursive" }}
          className="header"
        >
          <AccountBalanceWalletIcon /> Money Manager
        </Typography>
        <div className="btn">
          <Button
            variant="text"
            sx={{ color: pink[500] }}
            onClick={() => history.push("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            variant="text"
            sx={{ color: pink[500] }}
            onClick={() => history.push("/signin")}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="form_container">
        <FormComponent />
      </div>
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
    fetch(`http://localhost:8000/transaction/expense`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "x-auth-token": window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        ...payload,
        email: window.localStorage.getItem("email"),
      }),
    });
    //update the transaction Array with new transaction array
    setTransaction(transactionArray);
  };

  // for calculating the expentiture and income
  const CalculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transaction.map((payload) => {
      // if the type is expense then add amount to expense otherwise add amount to the income
      return payload.type === "EXPENSE"
        ? (exp = exp + payload.amount)
        : (inc = inc + payload.amount);
    });
    updateExpense(exp);
    updateIncome(inc);
  };
  useEffect(() => {
    fetch(
      `http://localhost:8000/transaction/expense/${window.localStorage.getItem(
        "email"
      )}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "x-auth-token": window.localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setTransaction(res);
      })
      .catch((err) => console.log(err));
  }, []);
  // whenever the transaction value is changed the useEffect hook mounted for the calculation
  // eslint-disable-next-line
  useEffect(() => CalculateBalance(), [transaction]);
  console.log("tr", transaction);
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
        <span style={{ color: "green" }}>
          Income :{Math.round(income / 52)}
        </span>
        <span style={{ color: "red" }}>
          Expense :{Math.round(expense / 52)}
        </span>
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
        <span style={{ color: "green" }}>
          Income :{Math.round(income / 12)}
        </span>
        <span style={{ color: "red" }}>
          Expense :{Math.round(expense / 12)}
        </span>
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
