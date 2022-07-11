export const fetchZones = () =>{
    return (dispatch) => {
        fetch('http://localhost:8080/api/getZones')
            .then(response => response.json())
            .then(json => dispatch({type: "GET_ZONES", payload: json}))
            .catch(error => console.log("ERROR: "+error.message));
    }
}