import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './src/views/Login/Login';
import HomePage from './src/views/home/HomePage';
import LayoutMenu from './src/components/LayoutMenu';
import ProductsTable from './src/views/products/ProductsTable';
import ProductsForms from './src/views/products/ProductsForms';
import Invoices from './src/views/invoices/invoices';
import Orders from './src/views/orders/Orders';
import HistorialOrders from './src/views/orders/HistorialOrders';
import RegisterPage from './src/views/login/RegisterPage';

const InvoicesPage = () => <div>Página de Facturas</div>;
const UsersPage = () => <div>Página de Usuarios</div>;

function App() {
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route 
        path="/home" 
        element={
          <LayoutMenu>
            <HomePage />
          </LayoutMenu>
        } 
      />

      <Route 
        path="/products/table" 
        element={
          <LayoutMenu>
            <ProductsTable />
          </LayoutMenu>
        } 
      />
      <Route 
        path="/products/form" 
        element={
          <LayoutMenu>
            <ProductsForms/>
          </LayoutMenu>
        } 
      />
      <Route 
        path="/products/form/:uuid" 
        element={
          <LayoutMenu>
            <ProductsForms/>
          </LayoutMenu>
        } 
      />
      <Route 
        path="/invoices" 
        element={
          <LayoutMenu>
            <Invoices />
          </LayoutMenu>
        } 
      />
      <Route 
        path="/orders" 
        element={
          <LayoutMenu>
            <Orders />
          </LayoutMenu>
        } 
      />
      <Route 
        path="/Historico" 
        element={
          <LayoutMenu>
            <HistorialOrders />
          </LayoutMenu>
        } 
      />
    </Routes>
  );
}

export default App;