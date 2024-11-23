/* ------------------- JS Transaction search product ------------------- */
// document load how flash messages with timer
    document.addEventListener('DOMContentLoaded', function() {
    setTimeout(fetchTransactions, 1000);

    const flashMessages = document.querySelectorAll('.alert');
      flashMessages.forEach(msg => {
        Swal.fire({
          icon: msg.classList.contains('alert-error') ? 'error' : 'success',
          title: msg.innerText,
          showConfirmButton: false,
          timer: 2000 // Show for 2 seconds
        });
      });

        const d = new Date();
        let text = d.toLocaleString();
        document.getElementById("date-info").innerHTML = text;

        x = document.getElementById('form-transaction');
         if (x.style.display === "none") {
          x.style.display = "block";
           } else {
            x.style.display = "none";
        }
    });

      // cancel transaction
      function cancelTransaction() {
        document.getElementById("message").textContent = "";
        x = document.getElementById('form-transaction');
        x.style.display = "none";
      }

      // search form
      document.getElementById("searchForm").addEventListener("submit", function(event) {
      event.preventDefault();
      document.getElementById("message").textContent = "";
      const sku = document.getElementById("sku").value.trim();
      const resultDiv = document.getElementById("form-transaction");
      const pn = document.getElementById("product-name");
      const cp = document.getElementById("category-product");
      const pp = document.getElementById("product-price");
      const ps = document.getElementById("product-stock");

      // Fetch product details by SKU with category information
      fetch(`/search_product_with_category?sku=${encodeURIComponent(sku)}`)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  // Clear previous result
                  resultDiv.style.display = "none";
                  document.getElementById("message").innerHTML = `
                    <span class="mt-4 badge badge-danger label-square">
                          <p id="error" class="f-12">${data.error}</p>
                    </span>
                  `;
              } else {
                  resultDiv.style.display = "block";
                  pn.innerHTML = `<b> ${data.product_name} </b> `;
                  cp.innerHTML = ` ${data.category_name} `;
                  pp.innerHTML = ` ${data.price.toFixed(2)} `;
                  ps.innerHTML = ` ${data.stock} `;
                  document.getElementById("product_id").val = ` ${data.id} `;
              }
          })
          .catch(error => {
              console.error("Error fetching product:", error);
              resultDiv.innerHTML = `<p id="error">An error occurred while fetching the product details.</p>`;
          });
    });


/* ------------------- Transaction FORM ------------------- */
    document.getElementById("transactionForm").addEventListener("submit", function(event) {
      event.preventDefault();
      const productId = document.getElementById("product_id").val;
      const quantity = document.getElementById("quantity").value;
      fetch("/transaction", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              product_id: parseInt(productId),
              quantity: parseInt(quantity)
          })
      })
      .then(response => response.json())
      .then(data => {
      setTimeout(fetchTransactions, 1000);
          const messageDiv = document.getElementById("message");
          if (data.error) {
              messageDiv.style.color = "red";
              messageDiv.textContent = `Error: ${data.error}`;
          } else {
              messageDiv.style.color = "green";
              messageDiv.textContent = `Success: ${data.message}`;
          }
      })
      .catch(error => console.error("Error:", error));
    });


/* ------------------- GET Transaction to show in table ------------------- */
    function fetchTransactions() {
    const tableBody = document.getElementById("transactionsBody");
    fetch("/transactions")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            tableBody.textContent  = ""; // Clear any existing rows

            data.forEach(transaction => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td data-label="Transaction Date">${new Date(transaction.transaction_date).toLocaleString()}</td>
                    <td data-label="Product Name">${transaction.product_name}</td>
                    <td data-label="Quantity">${transaction.quantity}</td>
                    <td data-label="Total Price">Rp. ${transaction.total_price.toFixed(2)}</td>
                    <td>
                      <ul class="action text-center">
                        <li class="delete "><a href="#"><i class="icon-trash"></i></a></li>
                      </ul>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching transactions:", error);
        });
    }
