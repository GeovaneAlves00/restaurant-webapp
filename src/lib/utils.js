import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
}

export function generateOrderId() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOrderStatusText(status) {
  const statusMap = {
    'pending': 'Pendente',
    'preparing': 'Em preparação',
    'ready': 'Pronto para entrega',
    'delivering': 'Em entrega',
    'delivered': 'Entregue',
    'cancelled': 'Cancelado'
  };
  
  return statusMap[status] || status;
}

export function getOrderStatusColor(status) {
  const statusColorMap = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'preparing': 'bg-blue-100 text-blue-800',
    'ready': 'bg-purple-100 text-purple-800',
    'delivering': 'bg-indigo-100 text-indigo-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  return statusColorMap[status] || 'bg-gray-100 text-gray-800';
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}