import { useEffect, useState } from "react";

export function Transaction({ transaction }) {

  // to store filter things
  const [filterdTransaction, updateTxn] = useState(transaction);
  const [searchText, updateSearchText] = useState("");
  const FilterData = ((searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(transaction);
      return;
    }
    let txn = [...transaction];
    txn = txn.filter((payload) => {
     return payload.desc.toLowerCase().includes(searchText.toLowerCase().trim());
    });
    updateTxn(txn);
  });
  // eslint-disable-next-line
  useEffect(() => FilterData(searchText), [transaction]);
  return (
    <div className="transaction-container">
      Transaction Histoty
      <input placeholder="Search" className="search-bar" value={searchText} onChange={(e) => { updateSearchText(e.target.value); FilterData(e.target.value); }} />

      {filterdTransaction ? filterdTransaction.map((payload) => (
        <TransactionCell payload={payload} />
      )) : ''}
    </div>
  );
}
// show the transaction history ihe Container
const TransactionCell = ({ payload }) => {
  return (
    <div className="cell">
      <span>{payload.desc}</span>
      <span>${payload.amount}</span>
    </div>
  );
};
