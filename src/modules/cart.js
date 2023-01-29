import { openModal, closeModal } from "./modals";
import { getData, putData, patchData, deleteData } from "./api";

export const cartFunc = () => {
    const container = document.getElementById("cart-container");
    const cartModal = document.getElementById("cart-modal");
    const closeBtns = cartModal.querySelectorAll(".close-btn");
    const openCartBtn = document.getElementById("open-cart-btn");
    const totalPrice = document.getElementById("cart-totlal-price");


    const render = (data) => {
        container.innerHTML = ''
        data.forEach((item) => {
            container.insertAdjacentHTML(
                "beforeend",
                `
                <div class="row border-bottom pb-3 pt-3">
                    <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">
                    ${item.name}
                    </div>
                    <div
                        class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
                        <h4 class="me-3 d-flex align-itemns-center">${item.price} ₽</h4>
                        <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                            id="control-dec"  data-id='${item.id}' data-name="${item.name}" data-price="${item.price}" data-count="${item.count}">
                            -
                        </button>
                        <h6 class="cart-item-count me-3 ms-3" >${item.count}</h6>
                        <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                            id="control-inc" data-id='${item.id}' data-name="${item.name}" data-price="${item.price}" data-count="${item.count}">
                            +
                        </button>
                    </div>
                </div>  
                `
            );
        });
    };

    const updateCart = () => {
        getData('/cart').then((data) => {
            // console.log(data); 
            render(data)
            updatetotalCart(data);
        })
            .catch((error) => {
                console.error("Произошла ошибка!");
            })

    }
    const updatetotalCart = (data) => {
        // console.log(data)
        let total = 0
        data.forEach((item) => {
            total += Number(item.price) * Number(item.count)
        })
        totalPrice.textContent = total + ' ₽'
    }
    openCartBtn.addEventListener("click", () => {
        updateCart();
        openModal(cartModal);
    });
    closeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            closeModal(cartModal);
        });
    });

    container.addEventListener("click", (event) => {
        if (event.target.closest("button")) {
            if (event.target.id && event.target.id === "control-inc") {
                console.log("plus");

                const id = event.target.dataset.id;
                const name = event.target.dataset.name;
                const count = Number(event.target.dataset.count);
                const price = event.target.dataset.price;
                const item = {
                    // id: id,
                    // name: name,
                    count: count + 1,
                    // price: price,
                };
                // console.log(item);
                patchData(`/cart/${id}`, item).then(() => {
                    updateCart()
                })
            } else if (event.target.id && event.target.id === "control-dec") {
                console.log("minus");
                const id = event.target.dataset.id;
                const name = event.target.dataset.name;
                const count = Number(event.target.dataset.count);
                const price = event.target.dataset.price;
                if (count > 1) {
                    const item = {
                        // id: id,
                        // name: name,
                        count: count - 1,
                        // price: price,
                    };
                    patchData(`/cart/${id}`, item).then(() => {
                        updateCart()

                    });
                }else  {
                   
                    deleteData(`/cart/${id}`).then(() => {
                        updateCart()
                    })
                }


            }
        }
    });

    // getData('/cart').then((data) => {
    //         render(data);
    //         openModal(cartModal);
    //     })
    //     .catch((error) => {
    //         console.error('Произошла ошибка!');
    //     })
};
