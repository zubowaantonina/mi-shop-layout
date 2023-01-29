const apiPatch = "http://localhost:3001";
export const getData = (path) => {
  return fetch(apiPatch + path).then((response) => {
    if (!response.ok) {
      throw new Error;
    }
    return response.json();
  });

};
//отправкв данных из input admin
export const postData = (path, data) => {
  return fetch(apiPatch + path,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then((response) => {
    if (!response.ok) {
      throw new Error;
    }
    return response.json();
  })
}
export const putData = (path, data) => {
  return fetch(apiPatch + path,{
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then((response) => {
    if (!response.ok) {
      throw new Error;
    }
    return response.json();
  })
}
export const patchData = (path, data) => {
  return fetch(apiPatch + path,{
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then((response) => {
    if (!response.ok) {
      throw new Error;
    }
    return response.json();
  })
}
//удаление категории
export const deleteData = (path) => {
  return fetch(apiPatch + path,{
    method: 'DELETE'
  }).then((response) => {
    if (!response.ok) {
      throw new Error;
    }
    return response.json();
  });
}