const form = document.getElementById("orderForm");
const resultBox = document.getElementById("result");
const ordersList = document.getElementById("ordersList");

function generateID() {
    return "JG" + Math.floor(Math.random() * 1000000);
}

function calculatePrice(distance) {
    const rate = 300; // 1 км = 300 тг
    return distance * rate;
}

function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem("jetgoOrders")) || [];
    orders.push(order);
    localStorage.setItem("jetgoOrders", JSON.stringify(orders));
}

function displayOrders() {
    if (!ordersList) return;
    let orders = JSON.parse(localStorage.getItem("jetgoOrders")) || [];
    ordersList.innerHTML = "";
    orders.slice(-5).reverse().forEach(order => {
        ordersList.innerHTML += `
            <div class="order-card">
                <strong>ID:</strong> ${order.id}<br>
                ${order.name}<br>
                ${order.from} → ${order.to}<br>
                ${order.price} тг
            </div>
        `;
    });
}

function displayAdminOrders() {
    const adminDiv = document.getElementById("adminOrders");
    let orders = JSON.parse(localStorage.getItem("jetgoOrders")) || [];
    adminDiv.innerHTML = "";
    orders.forEach(order => {
        adminDiv.innerHTML += `
            <div class="order-card">
                <strong>ID:</strong> ${order.id}<br>
                Клиент: ${order.name}<br>
                ${order.from} → ${order.to}<br>
                Қашықтық: ${order.distance} км<br>
                Баға: ${order.price} тг
            </div>
        `;
    });
}

function clearOrders() {
    localStorage.removeItem("jetgoOrders");
    location.reload();
}

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const from = document.getElementById("from").value;
        const to = document.getElementById("to").value;
        const distance = parseFloat(document.getElementById("distance").value);

        const id = generateID();
        const price = calculatePrice(distance);

        const order = { id, name, from, to, distance, price };
        saveOrder(order);

        resultBox.innerHTML = `
            Тапсырыс қабылданды! <br>
            ID: ${id} <br>
            Баға: ${price} тг
        `;

        displayOrders();
        form.reset();
    });
}

displayOrders();
