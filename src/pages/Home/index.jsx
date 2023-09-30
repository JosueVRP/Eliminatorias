export default function Home() {
    return (
        <>
            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-info-subtle">
                <div className="card" style={{ width: '50%' }}>
                    <div className="card-header d-flex justify-content-center fw-bold">
                        Información acerca de las eliminatorias para la copa mundial 2026
                    </div>
                    <div class="card-body d-flex justify-content-between">
                        <a href="/matches" className="btn btn-primary">Partidos y fechas</a>
                        <a href="#" className="btn btn-primary">Tabla de posiciones</a>
                        <a href="/sign-in" className="btn btn-primary">Iniciar sesión</a>
                    </div>
                </div>
            </div>
        </>
    )
}