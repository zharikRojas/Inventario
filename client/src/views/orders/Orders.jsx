import React, { useEffect, useMemo, useState } from "react";
import { ProductsServices } from "../../services/ProductsServices";
import {
  Row,
  Col,
  Table,
  Input,
  Button,
  List,
  Statistic,
  Divider,
  message,
  Tag,
  InputNumber
} from 'antd';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { InvoicesServices } from "../../services/InvoicesServices";
const formatCurrency = (value) => new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
}).format(value);

export default function Orders() {
  const [allProducts, setAllProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = async () => {
    try {
      const response = await ProductsServices.getProducts();
      setAllProducts(response);
    } catch (error) {
      message.error("Error al obtener los productos:", error);
    }
  };
  const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.uuid === product.uuid);

            if (existingItem) {
                if (existingItem.quantity < product.cant_available) {
                    return prevCart.map((item) =>
                        item.uuid === product.uuid
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    message.warning(`No hay más stock disponible para ${product.name}`);
                    return prevCart;
                }
            }
            
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const handleQuantityChange = (uuid, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.uuid === uuid ? { ...item, quantity: quantity } : item
            )
        );
    };

    const handleRemoveFromCart = (uuid) => {
        setCart((prevCart) => prevCart.filter((item) => item.uuid !== uuid));
    };

    const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => total + item.unitValue * item.quantity, 0);
    }, [cart]);

    const productColumns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Precio',
            dataIndex: 'unitValue',
            key: 'unitValue',
            render: (price) => {
                return new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(price);
            },
        },
        {
            title: 'Stock',
            dataIndex: 'cant_available',
            key: 'cant_available',
            render: (stock) => <Tag color={stock > 10 ? 'green' : 'orange'}>{stock}</Tag>,
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => {

                const itemInCart = cart.find(item => item.uuid === record.uuid);
                const quantityInCart = itemInCart ? itemInCart.quantity : 0;

                const isDisabled = record.cant_available === 0 || quantityInCart >= record.cant_available;
                return (
                <Button 
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleAddToCart(record)}
                    disabled={isDisabled}
                >
                    Añadir
                </Button>
            );
        },
    },
];
const handleGenerateInvoice = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const data = {
            idClient: parseInt(userData.idUser),
            products: cart.map(item => ({
                id: item.id,
                units: item.quantity,
                unitValue: parseFloat(item.unitValue)
            })),
            total: cartTotal
        }
        const response = await InvoicesServices.create(data);
        message.success("Factura generada exitosamente");
        setCart([]);
        setSearchTerm('');
        setAllProducts([]);
        getAllProducts();

    } catch (error) {
        message.error("Hubo un error al generar la factura.");
    }
}

  return (
    <Row gutter={24}>
      <Col span={14}>
        <h2>Seleccionar Productos</h2>
        <Input.Search
          placeholder="Buscar producto por nombre..."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table
          columns={productColumns}
          dataSource={filteredProducts}
          rowKey="uuid"
          pagination={{ pageSize: 5 }}
        />
      </Col>

      <Col span={10}>
        <h2>Orden Actual</h2>
        <List
          dataSource={cart}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveFromCart(item.uuid)}
                />,
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={(item.unitValue)}
              />
              <InputNumber
                min={1}
                max={item.cant_available}
                value={item.quantity}
                onChange={(value) => handleQuantityChange(item.uuid, value)}
                size="small"
                style={{ width: "60px" }}
              />
            </List.Item>
          )}
        />
        <Divider />
        <Statistic
          title="Total a Pagar"
          value={cartTotal}
          formatter={formatCurrency}
        />
        <Button
          type="primary"
          size="large"
          style={{ marginTop: 16, width: "100%" }}
          disabled={cart.length === 0}
          onClick={handleGenerateInvoice}
        >
          Generar Factura
        </Button>
      </Col>
    </Row>
  );
}
