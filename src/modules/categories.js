
import { getData } from "./api";
export const categoriesFunc = () => {
    //    fetch('http://localhost:3001/categories').then((response)=>{
    //     return response.json()
    //    }) 
    //    .then((data)=>{
    //    console.log(data);
    //    }) 
    const container = document.getElementById('categories-container')
    const catalogSearch=document.querySelector('.catalog-search')


    const render = (data) => {
        container.innerHTML=''
        data.forEach((item) => {
            container.insertAdjacentHTML('beforeend', `
                <div class="col col-12 col-md-6 col-lg-4 mb-3">
                    <a href="/catalog.html?id=${item.id}" class="card-link">
                        <div class="card">
                            <img src="${item.preview}" class="card-img-top" alt="phones">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                            </div>
                        </div>
                    </a>
                </div>
    `)
        })
    }

    catalogSearch.addEventListener('input',(event)=>{
        console.log(event.target.value);
        getData(`/categories?q=${event.target.value}`)
        .then((data) => {
            render(data);
        })
        .catch((error) => {
            console.error('Произошла ошибка!');
        })
    })
    getData('/categories')
        .then((data) => {
            render(data);
        })
        .catch((error) => {
            console.error('Произошла ошибка!');
        })

}