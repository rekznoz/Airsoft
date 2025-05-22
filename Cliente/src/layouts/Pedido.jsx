import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useUserStore from "../context/AuthC.jsx";
import PedidosService from "../services/PedidosService.jsx";

function PedidoLayout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useUserStore(state => state.user); // { id, role: [] }

    const [pedido, setPedido] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPedido() {
            try {
                const response = await PedidosService.getPedido({ params: { id } });
                setPedido(response);
                setLoading(false);

                // Comprobamos si no es admin ni dueño
                if (!user.roles.includes('admin') && response.user.id !== user.id) {
                    navigate('/no-autorizado');
                }
            } catch (error) {
                navigate('/no-encontrado');
            }
        }
        fetchPedido();
    }, [id, navigate, user]);

    if (loading) return <p>Cargando pedido...</p>;

    return (
        <>
            <Outlet context={{ pedido }} />
        </>
    );
}

export default PedidoLayout;
