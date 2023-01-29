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
  return fetch(apiPatch + path, data).then((response) => {
    if (!response.ok) {
      throw new Error;
    }
    return response.json();
  });
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