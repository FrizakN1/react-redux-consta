import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Badge} from "@consta/uikit/Badge";
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { Select } from '@consta/uikit/Select';

function Footer(props){
    console.log("footer")
    const dispatch = useDispatch();

    const orders = useSelector(state => state.orders.orders);
    const showOrderAmount = useSelector(state => state.orders.showOrderAmount);
    const ordersCount = useSelector(state => state.orders.ordersCount);
    const showOrdersCount = useSelector(state => state.orders.showOrdersCount);

    const moreOrders = () => {
        dispatch({type: "MORE_SHOW_ORDER_AMOUNT", payload: Number(10)})
        changeOrders(orders, showOrderAmount+10)
    }

    useEffect(() => {
        fetch('http://localhost:8080/api/getTableData', {
            method: "POST",
            body: JSON.stringify({Text: ""})
        })
            .then(response => response.json())
            .then(json =>{
                for(let item of json){
                    item.ID = "ЗП01-"+item.ID;
                    switch (item.StateID){
                        case 1:
                            item.State = [<Badge minified size='m' status="normal" className="round_position"/>, item.State]; break;
                        case 2:
                            item.State = [<Badge minified size='m' status="success" className="round_position"/>, item.State]; break;
                        case 3:
                            item.State = [<Badge minified size='m' status="error" className="round_position"/>, item.State]; break;
                        case 4:
                            item.State = [<Badge minified size='m' status="warning" className="round_position"/>, item.State]; break;
                        default: break
                    }
                }
                changeOrders(json, showOrderAmount)
                dispatch({type: "GET_TABLE_DATA", payload: json})
            })
            .catch(error => console.log("ERROR: "+error.message));
    }, []);

    const changeOrders = (orders, showOrderAmount) => {
        let showOrdersTemp = [];
        let count = 0;
        for (let item of orders){
            showOrdersTemp.push(item);
            count++;
            if (count > showOrderAmount-1) break;
        }
        dispatch({type: "ADD_SHOW_ORDERS", payload: {showOrders: showOrdersTemp, showOrdersCount: count}})
    }

    const items = [
        {
            label: '10',
            id: 1,
            value: 10,
        },
        {
            label: '20',
            id: 2,
            value: 20,
        },
        {
            label: '30',
            id: 3,
            value: 30,
        },
    ];



    const onInputShowOrderAmount = (event) => {
        dispatch({type: "ONINPUT_SHOW_ORDER_AMOUNT", payload: Number(event.value.value)})
        changeOrders(orders, Number(event.value.value))
        switch (event.value.id){
            case 1:
                setValue({label: '10', id: 1, value: 10}); break;
            case 2:
                setValue({label: '20', id: 2, value: 20}); break;
            case 3:
                setValue({label: '30', id: 3, value: 30}); break;
            default: break;
        }
    }

    const [value, setValue] = useState({label: '10', id: 1, value: 10});

    return (
        <footer>
            <Text size="m" view="secondary">Отображено: {showOrdersCount} из {ordersCount}</Text>
            <Button onClick={() => moreOrders()} label="Показать ещё 10" view="ghost"/>
            <div className="footer_select">
                <Text size="m" view="secondary">Показывать по </Text>
                <Select size="s" items={items} value={value} onChange={onInputShowOrderAmount}/>
            </div>
        </footer>
    );
}

export default Footer