import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";

const GameWrapper = () => {
  const { playerName, difficulty } = useParams();
  const [cats, setCats] = useState([]); // Inicializar como un array vacío
  const [isLoading, setIsLoading] = useState(true); // Controlar la carga de datos

  useEffect(() => {
    if (!difficulty) return;

    setIsLoading(true);
    fetch("http://localhost:8000/post_cats/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: playerName, dificultad: difficulty }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCats(data.gatos || []); // Asegurar que `cats` siempre sea un array
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener gatos:", error);
        setIsLoading(false);
      });
  }, [difficulty, playerName]);

  if (isLoading) return <p>Cargando gatos...</p>; // Evitar que intente renderizar sin datos
  if (!difficulty || cats.length === 0) return <p>No se encontraron imágenes de gatos.</p>;

  return <Game difficulty={difficulty} cats={cats} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:playerName/:difficulty" element={<GameWrapper />} />
        <Route path="/results/:playerName/:mistakes/:result" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
