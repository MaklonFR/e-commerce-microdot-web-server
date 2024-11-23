async function fetchRecentProducts() {
    api = "http://192.168.227.239:80";
         try {
             const response = await fetch(api+'/api/filter_transaction_product');
             const data = await response.json();
             console.log(data);
 
             // Call the function to populate the table with data
             populateTable(data);
         } catch (error) {
             console.error('Error fetching recent products:', error);
         }
     }
 
    function populateTable(products) {
         // Get the table body element
         const divBody = document.getElementById('list_products');
 
         // Clear existing rows (in case function is called multiple times)
         divBody.innerHTML = '';
 
         // Loop through the products and add rows to the table
         products.forEach(product => {
             const row = document.createElement('div');
 
             // Create cells for each piece of product data
             row.innerHTML = `
             <div class="d-flex align-items-start">
                 <div class="activity-line"></div>
                      <div class="activity-dot-secondary"></div>
                          <div class="flex-grow-1">
                              <p class="mt-0 todo-font">
                                 <span class="font-secondary">${product.transaction_date}</span>
                              </p>
                              <span class="f-w-700">${product.product_name} </span>
                              <p class="mb-0 activity-text">
                                 STOK PRODUK SAAT INI:
                                 <span class="badge badge-danger text-white label-square">${product.transaction_quantity}</span>
                              </p>
                          </div>
                 <i class="fa-solid fa-circle circle-dot-secondary pull-right"></i>
             </div>
             `;
 
             // Append the row to the table body
             divBody.appendChild(row);
         });
     }
 
     // Fetch and display data when the page loads
     fetchRecentProducts();
 