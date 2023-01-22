import { openModal, closeModal } from "./modals";
import { getData } from "./api";
export const authFunc = () => {
    const authBtn = document.getElementById("open-auth-btn");
    const openCartBtn = document.getElementById("open-cart-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const modal = document.getElementById("auth-modal");
    const cartModal = document.getElementById("cart-modal");
    const closeBtns = modal.querySelectorAll(".close-btn");
    const loginBtn = modal.querySelector(".login-btn");

    // const openModal = () => {
    //     modal.classList.add('d-block');
    //     setTimeout(() => {
    //         modal.classList.add("show");
    //     }, 100);
    // };

    // const closeModal = () => {
    //     modal.classList.remove("show");
    //     setTimeout(() => {
    //         modal.classList.remove("d-block");
    //     }, 500);
    // };

    const login = () => {
        authBtn.classList.add("d-none");
        openCartBtn.classList.remove("d-none");
        logoutBtn.classList.remove("d-none");
        closeModal(modal);
    };
    const logout = () => {
        authBtn.classList.remove("d-none");
        openCartBtn.classList.add("d-none");
        logoutBtn.classList.add("d-none");
    };
    const checkAuth = () => {
        const user=JSON.parse.localStorage.getItem("auth");
        if(user) {
            getData("/profile").then((data) => {
            console.log(data);
            if (
                data.login &&
                data.login === user.login &&
                data.password &&
                data.password === user.password
            ) {
                console.log("Успех");
                login();
                // localStorage.setItem('auth', JSON.stringify(data));
            } else {
                console.log("Неудача");
            }
        }); 
        }
        // if (JSON.parse(localStorage.setItem("auth"))) {
        //     login();
        // }
       
    };
    authBtn.addEventListener("click", () => {
        openModal(modal);
    });
    closeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            closeModal(modal);
        });
    });
    loginBtn.addEventListener("click", () => {
        const loginInput = modal.querySelector("#login-control");
        const passwordInput = modal.querySelector("#password-control");
        const user = {
            login: loginInput.value,
            password: passwordInput.value,
        };
        getData("/profile").then((data) => {
            console.log(data);
            if (
                data.login &&
                data.login === user.login &&
                data.password &&
                data.password === user.password
            ) {
                console.log("Успех");
                login();
                localStorage.setItem('auth', JSON.stringify(data));
            } else {
                console.log("Неудача");
            }
        });

        // localStorage.setItem('auth', JSON.stringify(user));
    });
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("auth");
        logout();
    });
    openCartBtn.addEventListener("click", () => {
        openModal(cartModal);
    });
    checkAuth();
};
