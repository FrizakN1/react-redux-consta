import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import { Table } from '@consta/uikit/Table';
import { Badge } from '@consta/uikit/Badge';


function Table1(props){
    const showOrders = useSelector(state => state.orders.showOrders)
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
        // <div className="table">
        //     <div className="table_row_h">
        //         <div className="column h">ДАТА ЗАКАЗА</div>
        //         <div className="column h">НОМЕР ЗАКАЗА</div>
        //         <div className="column h recipient">ПОЛУЧАТЕЛЬ</div>
        //         <div className="column h">ТРЕБУЕМАЯ ДАТА</div>
        //         <div className="column h">СОСТОЯНИЕ</div>
        //         <div className="column h zone">ЗОНА</div>
        //     </div>
        //     <div>
        //         {showOrders.map(order =>
        //             <div className="table_row" key={order.ID}>
        //                 <div className="column">{order.Date}</div>
        //                 <div className="column">ЗП01-{order.ID}</div>
        //                 <div className="column recipient">{order.Recipient}</div>
        //                 <div className="column">{order.RequiredDate}</div>
        //                 <div className="column"><StateColor state={order.State}/> {order.State}</div>
        //                 <div className="column zone">{order.Zone}</div>
        //             </div>
        //         )}
        //     </div>
        // </div>
        <div className="table">
            <Table rows={rows} columns={columns} borderBetweenColumns borderBetweenRows size="m" />
        </div>
    )
}

export default Table1