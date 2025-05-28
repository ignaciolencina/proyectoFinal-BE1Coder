const deleteCartFn = async (id) => {
  const res = await fetch(`http://localhost:8080/api/v1/carts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(
      "Ocurrió un error intentando eliminar el carrito seleccionado"
    );
  }
};

const deleteProductFromCartFn = async (cartId, productId) => {
  const res = await fetch(
    `http://localhost:8080/api/v1/carts/${cartId}/products/${productId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Ocurrió un error intentando eliminar el producto seleccionado del carrito"
    );
  }
};

const $cartContainer = document.getElementById("cart-container");

$cartContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-cart-btn")) {
    const id = e.target.dataset.id;

    const result = await Swal.fire({
      title: "Se eliminará este carrito",
      text: "Esta acción es irreversible",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteCartFn(id);
        Swal.fire({
          title: "Carrito eliminado",
          text: "El carrito fue eliminado correctamente",
          timer: 2000,
          showConfirmButton: false,
          icon: "success",
        }).then(() => {
          window.location.replace("http://localhost:8080/api/v1/views/carts");
        });
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  }

  if (e.target.classList.contains("delete-btn")) {
    const productId = e.target.getAttribute("data-product-id");
    const cartId = e.target.getAttribute("data-cart-id");

    const result = await Swal.fire({
      title: "Se eliminará este producto del carrito",
      text: "Esta acción es irreversible",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteProductFromCartFn(cartId, productId);
        Swal.fire({
          title: "Producto eliminado",
          text: "El producto fue eliminado del carrito correctamente",
          timer: 2000,
          showConfirmButton: false,
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  }
});

