// export const fetchOrders = () =>{
//     return (dispatch) => {
//         fetch('http://localhost:8080/api/getTableData', {
//             method: "POST",
//             body: JSON.stringify({Text: ""})
//         })
//             .then(response => response.json())
//             .then(json => dispatch({type: "GET_TABLE_DATA", payload: json}))
//             // .then(json => console.log(json))
//             .catch(error => console.log("ERROR: "+error.message));
//     }
// }


// export const fetchOrders = () => {
//     return (dispatch) => {
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then(response => response.json())
//             .then(json => console.log(json))
//     }
// }