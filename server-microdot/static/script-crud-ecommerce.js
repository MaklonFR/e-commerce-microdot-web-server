// document load how flash messages with timer
    document.addEventListener('DOMContentLoaded', function() {

    const flashMessages = document.querySelectorAll('.alert');
      flashMessages.forEach(msg => {
        Swal.fire({
          icon: msg.classList.contains('alert-error') ? 'error' : 'success',
          title: msg.innerText,
          showConfirmButton: false,
          timer: 2000 // Show for 2 seconds
        });
      });

    });

//delete product
    function confirmDelete(product_id) {
       Swal.fire({
          title: 'Are you sure to delete?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#2e8e87',
          cancelButtonColor: '#C42A02',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            document.getElementById('delete-form-' + product_id).submit();
          }
        });
    }

//delete category
    function confirmDeleteCat(catId) {
       //alert(catId);
       Swal.fire({
          title: 'Are you sure to delete?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#2e8e87',
          cancelButtonColor: '#C42A02',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            document.getElementById('delete-form-category-' + catId).submit();
          }
        });
    }