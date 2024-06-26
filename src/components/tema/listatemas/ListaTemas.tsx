﻿import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Tema from "../../../models/Tema";
import CardTemas from "../cardtemas/CardTemas";
import { buscar } from "../../../services/Services";
import { AuthContext } from "../../../context/AuthContext";

function ListaTemas() {

    const navigate = useNavigate()

    const [temas, setTemas] = useState<Tema[]>([])
    

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarTemas() {
        try {
            await buscar(`/tema`, setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                alert('O token expirou!')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    return (
        <>

            {temas.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            
            <div className="flex justify-center w-full p-6 pb-60">
                <div className="flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
                        <>
                            {temas.map((tema) => (
                                <>
                                    <CardTemas key={tema.id} tema={tema} />
                                </>
                            ))}
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaTemas;