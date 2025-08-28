import React, { useEffect, useState } from 'react'
import { InvoicesServices } from '../../services/InvoicesServices';
import { render } from 'sass';
import { message, Table } from 'antd';

export default function HistorialOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
        const dataUser = JSON.parse(localStorage.getItem('user'));
      const response = await InvoicesServices.getOrdersByUser(dataUser.idUser);
      const ordersWithProductDetails = response.map(order => ({
        code: order.Invoice.code,
        purchase_date: order.Invoice.purchase_date,
        name: order.Product.name,
        lote: order.Product.lote,
        sale_price: order.sale_price,
        units: order.units
      }));
      setOrders(ordersWithProductDetails);
    } catch (error) {
        message.error('Error obteniendo el historial de productos:', error);
    }
  };
  const columns = [
    {
        title:'Código Factura',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title:'Fecha Compra',
        dataIndex: 'purchase_date',
        key: 'purchase_date',
        render: (date) => {
            return new Intl.DateTimeFormat('es-CO').format(new Date(date));
        }
    },
    {
        title: 'Producto',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Cantidad',
        dataIndex: 'units',
        key: 'units',
    },
    {
        title: 'Precio',
        dataIndex: 'sale_price',
        key: 'sale_price',
        render: (price) => {
            return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
        },
    },
  ]

  return (
    <>
        <Table
          dataSource={orders}
          columns={columns}
          pagination={true}
        />
    </>
  )
}
