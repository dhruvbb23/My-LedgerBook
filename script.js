let entries = JSON.parse(localStorage.getItem("ledger") || "[]");

function save(){
  localStorage.setItem("ledger", JSON.stringify(entries));
}

function handleAdd(e){
  e.preventDefault();

  entries.push({
    date: date.value,
    day: day.value,
    time: time.value + " " + ampm.value,
    amount: amount.value,
    side: side.value,
    particular: particular.value
  });

  save();
  render();
  e.target.reset();
}

function render(){
  debitTable.innerHTML="";
  creditTable.innerHTML="";

  entries.forEach(e=>{
    const row = `
    <tr class="${e.side==="debit"?"debitRow":"creditRow"}">
      <td>${e.date}</td>
      <td>${e.day}</td>
      <td>${e.time}</td>
      <td>${e.particular}</td>
      <td>₹${e.amount}</td>
    </tr>`;
    
    e.side==="debit"
      ? debitTable.innerHTML += row
      : creditTable.innerHTML += row;
  });
}

render();

function clearAll(){
  if(confirm("Clear all entries?")){
    entries = [];
    save();
    render();
  }
}
