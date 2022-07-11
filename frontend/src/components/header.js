import React from "react";
import AddWindow from "./add-window"
import {useDispatch, useSelector} from "react-redux";
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { IconSearch } from '@consta/uikit/IconSearch';


function Header(props){
    const dispatch = useDispatch();

    const onInputSearch = (event) => {
        dispatch({type: "ONINPUT_SEARCH", payload: event.target.value.toLowerCase()});
    }

    const searchText = useSelector(state => state.orders.search);
    const orders = useSelector(state => state.orders.orders)
    const showOrderAmount = useSelector(state => state.orders.showOrderAmount);


    const search = () => {
        let showOrders = [];
        let count = 0;
        for (let item of orders){
            let recipient = item.Recipient.toLowerCase();
            if (recipient.includes(searchText)){
                showOrders.push(item);
                count++;
                if (count > showOrderAmount-1) break;
            }
        }
        dispatch({type: "ADD_SHOW_ORDERS", payload: {showOrders: showOrders, showOrdersCount: count}})
    }

    return (
        <header>
            <Text view="brand" size="2xl" weight="bold">Заказы на производство</Text>
            <AddWindow />
            <div className="search">
                <TextField onInput={onInputSearch} value={searchText} type="text" placeholder="Поиск" form="defaultClear"/>
                <Button label="В" view="secondary" iconLeft={IconSearch} onlyIcon onClick={search} form="brickDefault"/>
            </div>
        </header>
    );
}

export default Header;