const deleteProductFn = async (id) => {
  const res = await fetch(`http://localhost:8080/api/v1/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(
      "Ocurrió un error intentando eliminar el producto seleccionado"
    );
  }
};

const postCartFn = async (data) => {
  const res = await fetch(`http://localhost:8080/api/v1/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Ocurrió un error guardando la entrada");
  }
};

const cart = {
  products: [],
};

const addProduct = (productId, quantity) => {
  const existingProduct = cart.products.find((p) => p.productId === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ productId, quantity });
  }

  return existingProduct ? existingProduct.quantity : quantity;
};

const $cartCount = document.getElementById("cart-count");

const updateCartCount = () => {
  const total = cart.products.reduce((acc, item) => acc + item.quantity, 0);
  $cartCount.textContent = total;
};

const $productsTbody = document.getElementById("products-tbody");

$productsTbody.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;

    const result = await Swal.fire({
      title: "Confirma que desea eliminar este producto?",
      icon: "question",
      confirmButtonText: "Eliminar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteProductFn(id);
        Swal.fire({
          title: "Producto eliminado",
          text: "El producto fue eliminado correctamente",
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

  if (e.target.classList.contains("add-btn")) {
    const productId = e.target.dataset.id;
    const quantity = 1;

    const totalQuantity = addProduct(productId, quantity);
    updateCartCount();

    Swal.fire({
      title: "Agregado al carrito",
      text: `Cantidad actual: ${totalQuantity}`,
      timer: 2000,
      showConfirmButton: false,
      icon: "success",
    });
    console.log(cart);
  }
});

const $sendBtn = document.getElementById("send-btn");

$sendBtn.addEventListener("click", async () => {
  if (cart.products.length === 0) {
    Swal.fire({
      title: "Carrito vacío",
      text: "Agrega productos al carrito antes de enviar",
      icon: "warning",
      showConfirmButton: true,
    });
    return;
  }

  try {
    await postCartFn(cart);
    Swal.fire({
      title: "Carrito enviado",
      text: "El producto fue enviado correctamente",
      timer: 2000,
      showConfirmButton: false,
      icon: "success",
    });
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
});
