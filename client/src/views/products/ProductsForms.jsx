import { Button, Col, Form, Input, InputNumber, message, Row } from "antd";
import React, { useEffect } from "react";
import { ProductsServices } from "../../services/ProductsServices";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductsForms() {
  const [form] = Form.useForm();
  const { uuid } = useParams();
  const edit = Boolean(uuid);
  const navigate = useNavigate();

  useEffect(() => {
    if (uuid) {
      const fetchProduct = async () => {
        try {
          const response = await ProductsServices.getProductByUuid(uuid);
          form.setFieldsValue(response);
        } catch (error) {
          message.error("Error al obtener el producto:", error);
        }
      };
      fetchProduct();
    }
  }, [uuid]);

  const handleCreate = async (values) => {
    try {
      const data = {
        name: values.name,
        lote: values.lote,
        unitValue: values.unitValue,
        cant_available: values.cant_available,
      };
      const response = await ProductsServices.create(data);
      form.resetFields();
      message.success("Producto creado exitosamente");
      navigate("/products/table");
    } catch (error) {
      message.error("Error al crear el producto");
    }
  };
  const handleUpdate = async (values) => {
    try {
      values.uuid = uuid;
      const data = {
        uuid: uuid,
        name: values.name,
        lote: values.lote,
        unitValue: values.unitValue,
        cant_available: values.cant_available,
      };
      const response = await ProductsServices.updateProduct(data);
      message.success("Producto actualizado exitosamente");
      navigate("/products/table");
    } catch (error) {
      message.error("Error al actualizar el producto");
    }
  };

  return (
    <>
      <h2>{edit ? "Editar Producto" : "Crear Producto"}</h2>
      <Form
        onFinish={edit ? handleUpdate : handleCreate}
        layout="vertical"
        form={form}
      >
        <Row justify="space-between">
          <Col span={10}>
            <Form.Item
              name="name"
              label="Nombre Producto"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el nombre del producto",
                },
              ]}
            >
              <Input
                placeholder="Nombre del producto"
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="lote"
              label="Lote"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el lote del producto",
                },
              ]}
            >
              <Input
                placeholder="Lote"
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="unitValue"
              label="Precio Unitario"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el precio unitario del producto",
                },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Valor unitario"
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="cant_available"
              label="Cantidad Disponible"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor ingrese la cantidad disponible del producto",
                },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Cantidad disponible"
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          {edit ? "Actualizar Producto" : "Crear Producto"}
        </Button>
      </Form>
    </>
  );
}
