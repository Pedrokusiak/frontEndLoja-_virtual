import { Stomp } from "@stomp/stompjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SockJS from "sockjs-client";

const ProdutoNotificacaoWebSocket = () => {
    const [notificacao, setNotificacao] = useState(null);
    const [clienteStomp, setClienteStomp] = useState(null);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stomp = Stomp.over(socket);

        stomp.connect({}, () => {
            setClienteStomp(stomp);
            stomp.subscribe("/produto/novo-produto", message => {
                setNotificacao(message.body)
            })

        });
    }, [])

    return (
        <>
            {
                notificacao &&
                <div>
                    {notificacao}
                </div>
            }
        </>
    );
}
export default ProdutoNotificacaoWebSocket;