const saleItems = [];

document.getElementById('searchInput').addEventListener('input', function () {
    let term = this.value;
    if (term.length < 2) {
        document.getElementById("searchResults").innerHTML = "";
        return;
    }

    fetch(`/Pharmacist/Sales/Search?term=${term}`)
        .then(res => res.json())
        .then(data => {
            let resultHTML = '';
            data.forEach(item => {
                resultHTML += `<a href="#" class="list-group-item list-group-item-action"
                    onclick="addItem(${item.productID}, '${item.productName}', ${item.sUnitPrice}, ${item.sPPrice}, '${item.exDate}', ${item.quantity})">
                    <strong>${item.productName}</strong> | Unit: ${item.sUnitPrice} | Pack: ${item.sPPrice} <br>
                    Expiry: ${item.exDate} | Qty Left: ${item.quantity}
                </a>`;
            });
            document.getElementById("searchResults").innerHTML = resultHTML;
        });
});

function addItem(id, name, unitPrice, packagePrice, exDate, quantityLeft) {
    if (saleItems.find(x => x.productID === id)) return;

    const row = {
        productID: id,
        productName: name,
        saleType: 'Unit',
        quantity: 1,
        unitPrice: unitPrice,
        sUnitPrice: unitPrice,
        sPPrice: packagePrice,
        exDate: exDate,
        quantityLeft: quantityLeft
    };

    saleItems.push(row);
    renderTable();
    document.getElementById("searchResults").innerHTML = "";
    document.getElementById("searchInput").value = "";
}

function renderTable() {
    const tbody = document.getElementById("saleItemsTableBody");
    tbody.innerHTML = "";

    let total = 0;

    saleItems.forEach((item, index) => {
        let itemTotal = item.unitPrice * item.quantity;
        total += itemTotal;

        tbody.innerHTML += `
            <tr>
                <td>
                    ${item.productName}<br>
                    <small>Expiry: ${item.exDate} | Qty Left: ${item.quantityLeft}</small>
                </td>
                <td>
                    <select class="form-select" onchange="changeType(${index}, this.value)">
                        <option value="Unit" ${item.saleType === "Unit" ? "selected" : ""}>Unit</option>
                        <option value="Package" ${item.saleType === "Package" ? "selected" : ""}>Package</option>
                    </select>
                </td>
                <td>
                    <input type="number" class="form-control" min="1" value="${item.quantity}" onchange="changeQuantity(${index}, this.value)">
                </td>
                <td>${item.unitPrice.toFixed(2)} EGP</td>
                <td>${itemTotal.toFixed(2)} EGP</td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm" onclick="removeItem(${index})">🗑️</button>
                </td>
            </tr>`;
    });

    document.getElementById("grandTotal").innerText = total.toFixed(2);
}

function changeType(index, type) {
    const item = saleItems[index];
    item.saleType = type;
    item.unitPrice = (type === "Unit") ? item.sUnitPrice : item.sPPrice;
    renderTable();
}

function changeQuantity(index, quantity) {
    quantity = parseInt(quantity);
    if (quantity < 1) quantity = 1;
    saleItems[index].quantity = quantity;
    renderTable();
}

function removeItem(index) {
    saleItems.splice(index, 1);
    renderTable();
}

function validateSale() {
    if (saleItems.length === 0) {
        alert("⚠️ Please add at least one product to complete the sale.");
        return false;
    }

    const form = document.getElementById("saleForm");

    // Clear old dynamic inputs
    document.querySelectorAll(".dynamic-input").forEach(el => el.remove());

    // Append current items as hidden fields
    saleItems.forEach((item, index) => {
        [
            { name: `SaleItems[${index}].ProductID`, value: item.productID },
            { name: `SaleItems[${index}].ProductName`, value: item.productName },
            { name: `SaleItems[${index}].SaleType`, value: item.saleType },
            { name: `SaleItems[${index}].Quantity`, value: item.quantity },
            { name: `SaleItems[${index}].UnitPrice`, value: item.unitPrice }
        ].forEach(input => {
            const hidden = document.createElement("input");
            hidden.type = "hidden";
            hidden.name = input.name;
            hidden.value = input.value;
            hidden.classList.add("dynamic-input");
            form.appendChild(hidden);
        });
    });

    return true;
}
