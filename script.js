const table = document.getElementById('table').getElementsByTagName('tbody')[0];
const totalIncomeEl = document.getElementById('total_income');
const totalExpenseEl = document.getElementById('total_expense');
const balanceEl = document.getElementById('balance');

function deleteRow(row, amount, type) {
  row.remove();

  let currentIncome = parseFloat(totalIncomeEl.innerText) || 0;
  let currentExpense = parseFloat(totalExpenseEl.innerText) || 0;
  let currentBalance = parseFloat(balanceEl.innerText) || 0;

  if (type === 'Income') {
    totalIncomeEl.innerText = (currentIncome - amount).toFixed(2);
    balanceEl.innerText = (currentBalance - amount).toFixed(2);
  } else if (type === 'Expense') {
    totalExpenseEl.innerText = (currentExpense - amount).toFixed(2);
    balanceEl.innerText = (currentBalance + amount).toFixed(2);
  }
}

function addRow() {
  const amountVal = document.querySelector('.amountInput').value.trim();
  const typeVal = document.querySelector('.transactionType').value;
  const descVal = document.querySelector('.descriptionInput').value.trim();
  const dateVal = document.querySelector('.dateInput').value;

  if (!amountVal || !typeVal || typeVal === 'Transaction Type' || !dateVal) {
    alert('Please fill in all required fields.');
    return;
  }

  const amount = parseFloat(amountVal);
  if (isNaN(amount) || amount <= 0) {
    alert('Enter a valid amount.');
    return;
  }

  const row = document.createElement('tr');

  const amountCell = document.createElement('td');
  amountCell.innerText = amount.toFixed(2);

  const typeCell = document.createElement('td');
  typeCell.innerText = typeVal;

  const descCell = document.createElement('td');
  descCell.innerText = descVal || '-';

  const dateCell = document.createElement('td');
  dateCell.innerText = dateVal;

  const actionCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete_button');
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.onclick = () => deleteRow(row, amount, typeVal);
  actionCell.appendChild(deleteButton);

  row.appendChild(amountCell);
  row.appendChild(typeCell);
  row.appendChild(descCell);
  row.appendChild(dateCell);
  row.appendChild(actionCell);
  table.appendChild(row);

  let currentIncome = parseFloat(totalIncomeEl.innerText) || 0;
  let currentExpense = parseFloat(totalExpenseEl.innerText) || 0;
  let currentBalance = parseFloat(balanceEl.innerText) || 0;

  if (typeVal === 'Income') {
    totalIncomeEl.innerText = (currentIncome + amount).toFixed(2);
    balanceEl.innerText = (currentBalance + amount).toFixed(2);
  } else if (typeVal === 'Expense') {
    totalExpenseEl.innerText = (currentExpense + amount).toFixed(2);
    balanceEl.innerText = (currentBalance - amount).toFixed(2);
  }

  document.querySelector('.amountInput').value = '';
  document.querySelector('.transactionType').value = 'Transaction Type';
  document.querySelector('.descriptionInput').value = '';
  document.querySelector('.dateInput').value = '';
}
