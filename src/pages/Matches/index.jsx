import React, { useState, useEffect } from 'react';

export default function Matches() {
    const [partidos, setPartidos] = useState([]);
    const [equipos, setEquipos] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [localGoals, setLocalGoals] = useState("");
    const [visitorGoals, setVisitorGoals] = useState("");

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }

        fetch('http://localhost:3000/partidos')
            .then((response) => response.json())
            .then((data) => {
                setPartidos(data);

                fetch('http://localhost:3000/equipos')
                    .then((response) => response.json())
                    .then((equiposData) => {

                        const equiposNombres = {};
                        equiposData.content.forEach((equipo) => {
                            equiposNombres[equipo.id] = equipo.nombre;
                        });
                        setEquipos(equiposNombres);
                    })
                    .catch((error) => console.error('Error al obtener equipos:', error));
            })
            .catch((error) => console.error('Error al obtener partidos:', error));
    }, []);

    const handleUpdateResult = (partidoId, localGoals, visitorGoals) => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Maneja el caso en que no haya una token disponible
            console.error('No se encontró una token en el localStorage');
            return;
        }

        // Realiza la solicitud PUT al servidor con los resultados locales y visitantes (localGoals y visitorGoals).
        // Añade la token en el encabezado "Authorization".
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        // Asegúrate de que localGoals y visitorGoals tengan valores predeterminados si son null o undefined.
        const requestBody = {
            resultadoLocal: localGoals !== null && localGoals !== undefined ? localGoals : "",
            resultadoVisitante: visitorGoals !== null && visitorGoals !== undefined ? visitorGoals : "",
        };

        fetch(`http://localhost:3000/partidos/${partidoId}/actualizar-resultados`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok) {
                    // Actualiza la lista de partidos después de la actualización exitosa.
                    // Puedes volver a cargar los partidos o realizar otras acciones según tus necesidades.
                } else {
                    // Maneja errores de la solicitud si es necesario.
                }
            })
            .catch((error) => {
                // Maneja errores de red si es necesario.
            });
    };
    const handleLocalGoalIncrement = (partidoId) => {

        const partido = partidos.find((p) => p.id === partidoId);

        if (!partido.finalizado) {
            setLocalGoals(localGoals + 1); // Incrementa los goles locales
        }


        if (!partido.finalizado) {

            partido.resultadoLocal += 1;

            setPartidos([...partidos]);
        }
    };

    const handleVisitorGoalIncrement = (partidoId) => {

        const partido = partidos.find((p) => p.id === partidoId);

        if (!partido.finalizado) {
            setVisitorGoals(visitorGoals + 1); // Incrementa los goles visitantes
        }

        if (!partido.finalizado) {

            partido.resultadoVisitante += 1;

            setPartidos([...partidos]);
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center">
            <div className="card p-4" style={{ width: '50%' }}>
                {partidos.map((partido) => (
                    <div className="card d-flex p-3 mt-4" key={partido.id}>
                        <div className='d-flex justify-content-between '>
                            <div className='border border-primary p-2'>
                                <h5 className='text-center'>{equipos[partido.equipoLocalId]}</h5> {/* Mostrar el nombre del equipo local */}
                                <div className='d-flex flex-column align-items-center text-center border border-primary'>
                                    <img className='' src="" alt="" /> {/* Agregar la URL de la imagen del equipo local */}
                                    <input className='mt-2' style={{
                                        border: 'none',
                                        textAlign: 'center',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        outline: 'none',
                                    }} type="text" value={partido.resultadoLocal !== null ? partido.resultadoLocal : ''} readOnly />
                                    <button className='btn btn-outline-secondary mt-2' onClick={() => handleLocalGoalIncrement(partido.id)}>+1 Gol</button>
                                </div>
                            </div>
                            <div className='border border-primary p-2'>
                                <h5 className='text-center'>{equipos[partido.equipoVisitaId]}</h5> {/* Mostrar el nombre del equipo visitante */}
                                <div className='d-flex flex-column align-items-center text-center border border-primary'>
                                    <img className='' src="" alt="" /> {/* Agregar la URL de la imagen del equipo visitante */}
                                    <input className='mt-2' style={{
                                        border: 'none',
                                        textAlign: 'center',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        outline: 'none',
                                    }} type="text" value={partido.resultadoVisitante !== null ? partido.resultadoVisitante : ''} readOnly />
                                    <button className='btn btn-outline-secondary mt-2' onClick={() => handleVisitorGoalIncrement(partido.id)}>+1 Gol</button>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <div>
                                Fecha de partido: {new Date(partido.fecha).toLocaleDateString("es-ES")}
                            </div>
                            <div>
                                Estado de partido: {partido.finalizado ? 'Finalizado' : 'En curso'}
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-4'>
                            {isLoggedIn && (
                                <>
                                    <button className='btn btn-success' onClick={() => handleUpdateResult(partido.id)}>
                                        Actualizar resultado
                                    </button>
                                    <button className='btn btn-danger'>
                                        Finalizar partido
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}