<?php

namespace App\Observers;

use App\Models\Pedido;

class PedidoObserver
{
    public function updating(Pedido $pedido)
    {
        $estadoAnterior = $pedido->getOriginal('estado');
        $estadoNuevo = $pedido->estado;

        if ($estadoAnterior !== $estadoNuevo && $pedido->producto) {
            $producto = $pedido->producto;

            // Enviado → restar stock
            if (
                in_array($estadoAnterior, ['pendiente', 'procesando']) &&
                $estadoNuevo === 'enviado'
            ) {
                if ($producto->stock < $pedido->cantidad) {
                    throw new \Exception('Stock insuficiente para el producto.');
                }

                $producto->stock -= $pedido->cantidad;
                $producto->save();
            }

            // Retroceso desde enviado → sumar stock
            if (
                $estadoAnterior === 'enviado' &&
                in_array($estadoNuevo, ['pendiente', 'procesando'])
            ) {
                $producto->stock += $pedido->cantidad;
                $producto->save();
            }
        }
    }
}
