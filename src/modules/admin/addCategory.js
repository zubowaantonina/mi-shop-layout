import { postData, getData} from "../api";
import {deleteData} from "../api";

export const addCategory = () => {
    const nameInp = document.getElementById('category-name');
    const priviewInp = document.getElementById('category-image');
    const saveBtn = document.getElementById('category-add-btn');
    const container = document.getElementById('category-container');
    const select = document.getElementById('product-category');

    const categoryData = {
        name: '',
        preview: ''
    }

    //блокировка кнопки при пустом поле ввода поиска
    const checkValues = () => {
        if (nameInp.value === '' || priviewInp.value === '') {
            saveBtn.disabled = true;
        } else {
            //разблокировка кнопки
            saveBtn.disabled = false;
        }
    }
   
    const render = (data) => {
        container.innerHTML=''
        data.forEach((item,index) => {
            container.insertAdjacentHTML('beforeend', `
            <tr>
                <th scope="row">${index+1}</th>
                    <td>${item.name}</td>
                    <td class="text-end">
                        <button type="button" class="btn btn-outline-danger btn-sm" data-category="${item.id}">
                            удалить
                        </button>
                    </td>
            </tr>
            `)
            select.insertAdjacentHTML('beforeend', `
            <option value="${item.id}">${item.name}</option>
            `)
        })
    }

    const updateTable=()=>{
        getData('/categories').then((data) => {
            // console.log(data);
            render(data);
        })
    }

    nameInp.addEventListener('input', () => {
        categoryData.name = nameInp.value;
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
                categoryData.preview = reader.result
            }
            reader.onerror = () => {
                categoryData = '';
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
        // console.log(categoryData);
        postData('/categories', {
            method: 'POST',
            body: JSON.stringify(categoryData),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(() => {
            nameInp.value='';
            priviewInp.value='';
            updateTable()
        })
    })
    container.addEventListener('click', (event)=>{
        // console.log(event.target);//определяем по какому элементу кликнули
        if(event.target.tagName === 'BUTTON'){
            const id=event.target.dataset.category
           deleteData(`/categories/${id}`).then((data) => {
            updateTable()
          })
        }
    })
    updateTable()
    checkValues()
}