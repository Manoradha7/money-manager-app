import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../globalConstant.js";

export function AllTransaction() {
  const history = useHistory();
  const [transaction, setTransaction] = useState([]);

  const getTransaction=()=>{
    fetch(
      `${API_URL}/transaction/expense/${window.localStorage.getItem(
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
  }
  useEffect(getTransaction, []);

  const deleteTransaction = (_id) => {
    fetch(`${API_URL}/transaction/expense/${_id}`, {
      method: "DELETE",
    }).then(() => getTransaction());
  };
  return transaction ? (
    <div className="trans_container">
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
      <table className="trans_table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transaction.map(({ id, amount, desc, type, _id }, index) => {
            return (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>{id}</td>
                <td>{amount}</td>
                <td>{type}</td>
                <td>{desc}</td>
                <td><IconButton
                aria-label="delete student"
                onClick={() => {
                  deleteTransaction(_id);
                }}
                color="secondary"
                className="delete-button"
              >
                <DeleteIcon />
              </IconButton></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    ""
  );
}
