// DOM Elements
const incomeDescriptionInput = document.getElementById("income-description");
const incomeAmountInput = document.getElementById("income-amount");
const expenseDescriptionInput = document.getElementById("expense-description");
const expenseCategoryInput = document.getElementById("expense-category");
const expenseAmountInput = document.getElementById("expense-amount");
const transactionHistory = document.getElementById("transaction-history");
const totalIncomeElement = document.getElementById("total-income");
const totalExpensesElement = document.getElementById("total-expenses");
const balanceElement = document.getElementById("balance");

// Trackers
let totalIncome = 0;
let totalExpenses = 0;

// Function to update the budget summary
function updateSummary() {
    balanceElement.textContent = (totalIncome - totalExpenses).toFixed(2);
    totalIncomeElement.textContent = totalIncome.toFixed(2);
    totalExpensesElement.textContent = totalExpenses.toFixed(2);
}

// Function to add a transaction to the table
function addTransaction(description, category, amount, type) {
    const transactionRow = document.createElement("tr");

    transactionRow.innerHTML = `
        <td>${description}</td>
        <td>${category || '-'}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    transactionRow.querySelector(".delete-btn").addEventListener("click", () => {
        if (type === "Income") {
            totalIncome -= amount;
        } else {
            totalExpenses -= amount;
        }
        transactionRow.remove();
        updateSummary();
    });

    transactionHistory.appendChild(transactionRow);
}

// Function to handle adding income
function addIncome() {
    const description = incomeDescriptionInput.value.trim();
    const amount = parseFloat(incomeAmountInput.value.trim());

    if (description === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid income description and amount.");
        return;
    }

    totalIncome += amount;
    addTransaction(description, null, amount, "Income");
    updateSummary();

    // Clear inputs
    incomeDescriptionInput.value = "";
    incomeAmountInput.value = "";
}

// Function to handle adding expense
function addExpense() {
    const description = expenseDescriptionInput.value.trim();
    const category = expenseCategoryInput.value;
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (description === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense description and amount.");
        return;
    }

    totalExpenses += amount;
    addTransaction(description, category, amount, "Expense");
    updateSummary();

    // Clear inputs
    expenseDescriptionInput.value = "";
    expenseAmountInput.value = "";
    expenseCategoryInput.value = "Housing"; // Reset to default category
}

// Function to clear all transactions and reset values
function clearAll() {
    transactionHistory.innerHTML = ""; // Clear transaction history
    totalIncome = 0;
    totalExpenses = 0;
    updateSummary();
}

