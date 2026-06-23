let budget = 0;
let expenses = [];

// Load saved data
document.addEventListener("DOMContentLoaded", () => {

    const savedBudget = localStorage.getItem("budget");
    const savedExpenses = localStorage.getItem("expenses");

    if(savedBudget){
        budget = Number(savedBudget);
    }

    if(savedExpenses){
        expenses = JSON.parse(savedExpenses);
    }

    updateUI();
});

function saveData(){
    localStorage.setItem("budget", budget);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function setBudget(){

    const budgetInput = document.getElementById("budgetInput");

    if(budgetInput.value === ""){
        alert("Enter budget amount");
        return;
    }

    budget = Number(budgetInput.value);

    saveData();
    updateUI();

    budgetInput.value = "";
}

function addExpense(){

    const title = document.getElementById("expenseTitle").value;
    const amount = document.getElementById("expenseAmount").value;

    if(title === "" || amount === ""){
        alert("Fill all fields");
        return;
    }

    expenses.push({
        title: title,
        amount: Number(amount)
    });

    saveData();
    updateUI();

    document.getElementById("expenseTitle").value = "";
    document.getElementById("expenseAmount").value = "";
}

function deleteExpense(index){

    expenses.splice(index,1);

    saveData();
    updateUI();
}

function updateUI(){

    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const balance = budget - totalExpenses;

    document.getElementById("totalBudget").textContent = budget;
    document.getElementById("totalExpenses").textContent = totalExpenses;
    document.getElementById("balance").textContent = balance;

    const expenseItems = document.getElementById("expenseItems");

    expenseItems.innerHTML = "";

    expenses.forEach((expense,index)=>{

        const li = document.createElement("li");

        li.classList.add("expense-item");

        li.innerHTML = `
            <span>${expense.title}</span>
            <span>$${expense.amount}</span>
            <button class="delete-btn"
                onclick="deleteExpense(${index})">
                Delete
            </button>
        `;

        expenseItems.appendChild(li);
    });
}