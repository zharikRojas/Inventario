import React, { useEffect, useState } from "react";
import { InvoicesServices } from "../../services/InvoicesServices";
import { Button, message, Modal, Space, Table } from "antd";
import { render } from "sass";

export default function Invoices() {
  const [dataInvoices, setDataInvoices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchInvoices = async () => {
      const dataUser = JSON.parse(localStorage.getItem("user"));
      if (dataUser && parseInt(dataUser.role) === 1) {
        try {
          const response = await InvoicesServices.getAllInvoices();
          setDataInvoices(response);
        } catch (error) {
          message.error("Error al obtener las facturas");
        }
      } else {
        try {
          const response = await InvoicesServices.getInvoicesByUser(
            parseInt(dataUser.idUser)
          );
          setDataInvoices(response);
        } catch (error) {
          message.error("Error al obtener las facturas");
        }
      }
    };
    fetchInvoices();
  }, []);
  const handleEdit = async (uuid) => {
    const orders = await InvoicesServices.getInvoiceByUuid(uuid);
    if (orders) {
      setOrders(orders.Orders);
      setIsModalVisible(true);
    }
  };
  const columns = [
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Fecha de Compra",
      dataIndex: "purchase_date",
      key: "purchase_date",
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString();
      },
    },
    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
      render: (record, text) => {
        return <span>{text.User ? text.User.name : "-"}</span>;
      },
    },
    {
      title: "Precio Total",
      dataIndex: "total_price",
      key: "total_price",
      render: (text) => {
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(text);
      },
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record.uuid)}>Ver</Button>
        </Space>
      ),
    },
  ];
  const columnsDetail = [
    {
      title: "Producto",
      dataIndex: "name",
      key: "name",
      render: (record, text) => {
        return <span>{text.Product.name}</span>;
      },
    },
    {
      title: "Unidades",
      dataIndex: "units",
      key: "units",
    },
    {
      title: "Precio Venta",
      dataIndex: "sale_price",
      key: "sale_price",
      render: (text) => {
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(text);
      },
    },
  ];
  return (
    <>
      <div>Facturas</div>
      <Table columns={columns} dataSource={dataInvoices} pagination={false} />
      <Modal
        title="Detalle Factura"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <>
          <Table
            columns={columnsDetail}
            dataSource={orders}
            pagination={false}
          />
        </>
      </Modal>
    </>
  );
}
