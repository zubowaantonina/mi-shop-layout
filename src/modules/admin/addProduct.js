import { postData, getData } from "../api";
import { deleteData } from "../api";

export const addProduct = () => {
    const titleInp = document.getElementById('product-title');
    const priceInp = document.getElementById('product-price');
    const nameInp = document.getElementById('product-name');
    const priviewInp = document.getElementById('product-image');
    const saveBtn = document.getElementById('product-add-btn');
    const container = document.getElementById('product-table');
    const select = document.getElementById('product-category');


    const productData = {
        title: '',
        price: 0,
        name: '',
        preview: '',
        category: 0
    }
    const render = (data) => {
        container.innerHTML = ''
     
        data.forEach((item, index) => {
            container.insertAdjacentHTML('beforeend', `
            <tr>
            <th scope="row">${index + 1}</th>
            <td>${item.title}</td>
            <td>${item.name}</td>
            <td>${item.price} Р</td>
            <td class="text-end">
                <button type="button" class="btn btn-outline-danger btn-sm" data-product="${item.id}">
                    удалить
                </button>
            </td>
        </tr>
           
            `)

        })
    }




    //блокировка кнопки при пустом поле ввода поиска
    const checkValues = () => {
        if (nameInp.value === '' ||
            priviewInp.value === '' ||
            titleInp.value === '' ||
            Number(priceInp.value) === 0 ||
            select.value === 'default'

        ) {
            saveBtn.disabled = true;
        } else {
            //разблокировка кнопки
            saveBtn.disabled = false;
        }
    }
    const updateTable = () => {
        getData('/products').then((data) => {
            // console.log(data);
            render(data);
        })
    }
    select.addEventListener('change', () => {
        productData.category = select.value
        const url = select.value !=='default'? `/products?category=${select.value}` : `/products`
        getData(url).then((data) => {
           
            render(data);
        })
        checkValues()
    })

    nameInp.addEventListener('input', () => {
        productData.name = nameInp.value;
        checkValues()
    })
    titleInp.addEventListener('input', () => {
        productData.title = titleInp.value;
        checkValues()
    })
    priceInp.addEventListener('input', () => {
        productData.price = Number(priceInp.value);
        checkValues()
    })
    priviewInp.addEventListener('input', () => {
        const file = priviewInp.files[0];
        //  console.log(file);
        //проверка типа файла
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
            const reader = new FileReader();
            reader.onload = () => {
                // console.log(reader.result);
                productData.preview = reader.result
            }
            reader.onerror = () => {
                productData = '';
                priviewInp.value = ''
            }
            reader.readAsDataURL(file);
            // console.log('ok')
        } else {
            // console.log('not ok');
            priviewInp.value = ''
        }

        checkValues()
    })
    saveBtn.addEventListener('click', () => {
        console.log(productData);
        postData('/products', {
            method: 'POST',
            body: JSON.stringify(productData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            nameInp.value = '';
            priviewInp.value = '';
            titleInp.value = '';
            priceInp.value = '';
            updateTable()
        })
    })
    container.addEventListener('click', (event) => {
        // console.log(event.target);//определяем по какому элементу кликнули
        if (event.target.tagName === 'BUTTON') {
            const id = event.target.dataset.product
            deleteData(`/products/${id}`).then((data) => {
                updateTable()
            })
        }
    })
    // Xiaomi Redmi A1+ 2/32GB (голубой)
    // Red Line Ultimate для Xiaomi Redmi 9C (оранжевый)
    // Amazfit GTS 4 mini (черный)
    updateTable()
    checkValues()
}