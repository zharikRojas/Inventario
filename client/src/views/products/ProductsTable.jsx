import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, message, Space } from "antd";
import { ProductsServices } from "../../services/ProductsServices";
import { useNavigate } from "react-router-dom";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await ProductsServices.getProducts();
      setProducts(response);
    } catch (error) {
      message.error("Error al obtener los productos");
    }
  };
  const handleEdit = (uuid) => {
    navigation(`/products/form/${uuid}`);
  };
  const handleDelete = async (uuid) => {
    try {
      await ProductsServices.deleteProduct(uuid);
      message.success("Producto eliminado exitosamente");
      fetchProducts();
    } catch (error) {
      message.error("Error al eliminar el producto");
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Lote",
      dataIndex: "lote",
      key: "lote",
    },
    {
      title: "Cantidad Disponible",
      dataIndex: "cant_available",
      key: "cant_available",
    },
    {
      title: "Precio",
      dataIndex: "unitValue",
      key: "unitValue",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record.uuid)}>Editar</Button>
          <Button onClick={() => handleDelete(record.uuid)}>Eliminar</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Productos</h1>
      <Button type="primary" onClick={() => navigation("/products/form")}>
        Crear Producto
      </Button>
      <Table columns={columns} dataSource={products} />
    </div>
  );
}
