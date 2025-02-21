document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const total = document.getElementById('total');
    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculateTotal()
    renderExpences()
    updateTotal()
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim()
        const amount = parseFloat(expenseAmountInput.value.trim())
        console.log(typeof name);
        console.log(typeof amount);

        if(name !== "" && !isNaN(amount) && amount > 0) {
            const newExpence = {
                id: Date.now(),
                name: name,
                amount: amount,
            }
            expenses.push(newExpence);
            console.log(expenses);
            saveExpensesToLocal();
            renderExpences();
            updateTotal();
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
    })
    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0)
        
    }
    function saveExpensesToLocal(){
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }
    function updateTotal(){
        totalAmount = calculateTotal()
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }
    function renderExpences() {
        expenseList.innerHTML = "";
        expenses.forEach((expense) => {
            li = document.createElement('li');
            li.innerHTML = `${expense.name} - ${expense.amount}
            <button data-id = ${expense.id}>delete</button>`
            expenseList.appendChild(li);
        })
    }

    expenseList.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON'){
            console.log("Delete clicked");
            const expenseId = parseInt(e.target.getAttribute('data-id'))
            expenses = expenses.filter(expense => expense.id !== expenseId)
            saveExpensesToLocal();
            renderExpences();
            updateTotal();
        }
    })

});