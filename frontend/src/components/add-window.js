import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Button } from '@consta/uikit/Button';
import {TextField} from "@consta/uikit/TextField";
import { DatePicker } from '@consta/uikit/DatePickerCanary';

function AddWindow(props){
    const dispatch = useDispatch();
    const windowState = useSelector(state => state.zones.switchWindow)
    const zones = useSelector(state => state.zones.zones)

    const switchWindow = (event) => {
        if(event.target.id === "btn_add" || event.target.id === "window"){
            if (windowState)
                dispatch({type: "SWITCH_WINDOW", payload: false})
            else {
                dispatch({type: "SWITCH_WINDOW", payload: true})
            }
        }
    }

    const onInputRecipient = (event) => {
        dispatch({type: "ONINPUT_RECIPIENT", payload: event.target.value})
    }

    const onInputDate = (event) => {
        dispatch({type: "ONINPUT_DATE", payload: event.target.value})
    }

    const onInputZone = (event) => {
        zones.map(zone => {
            if (zone.Name === event.target.value){
                dispatch({type: "ONINPUT_ZONE", payload: {zoneID: zone.ID, zone: event.target.value}})
            }
        })
    }

    const inputData = useSelector(state => state.zones)
    const addOrder = () => {
        const data = {
            Recipient: inputData.recipient,
            RequiredDate: inputData.date,
            ZoneID: inputData.zoneID
        }

        fetch('http://localhost:8080/api/addOrder', {
            method: "PUT",
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                if (json){
                    dispatch({type: "SWITCH_WINDOW", payload: false})
                }
            })
            .catch(error => console.log("ERROR: "+error.message));
    }

    const [value, setValue] = useState(null);

    if (windowState){
        return(
            <div className="window" id="window" onMouseDown={switchWindow}>
               <div className="window_inputBlock">
                   <TextField onInput={onInputRecipient} value={inputData.recipient} type="text" placeholder="Получатель"/>
                   <input className="window_input" type="date" onInput={onInputDate} placeholder="Требуемая дата"/>
                   <select className="window_input" onInput={onInputZone} placeholder="Зона">
                      {zones.map(zone=>
                          <option id={zone.ID}>{zone.Name}</option>
                      )}
                   </select>
                   <Button label="Добавить" onClick={addOrder}/>
               </div>
            </div>
        )
    } else {
        return(
            <Button label="Добавить" onClick={switchWindow} id="btn_add"/>
        )
    }
}

export default AddWindow;