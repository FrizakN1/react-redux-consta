import React from "react";
import {useSelector} from "react-redux";
import { Table } from '@consta/uikit/Table';


function Table1(props){
    const rows = useSelector(state => state.orders.showOrders)

    const columns = [
        {
            title: 'ДАТА ЗАКАЗА',
            accessor: 'Date',
            width: 200,
            sortable: true,
        },
        {
            title: 'НОМЕР ЗАКАЗА',
            accessor: 'ID',
            width: 200,
            sortable: true,
        },
        {
            title: 'ПОЛУЧАТЕЛЬ',
            accessor: 'Recipient',
            sortable: true,
        },
        {
            title: 'ТРЕБУЕМАЯ ДАТА',
            accessor: 'RequiredDate',
            width: 300,
            sortable: true,
        },
        {
            title: 'СОСТОЯНИЕ',
            accessor: 'State',
            width: 300,
            sortable: true,
        },
        {
            title: 'ЗОНА',
            accessor: 'Zone',
            width: 300,
            sortable: true,
        },
    ];

    return(
        <div className="table">
            <Table rows={rows} columns={columns} borderBetweenColumns borderBetweenRows size="m" />
        </div>
    )
}

export default Table1