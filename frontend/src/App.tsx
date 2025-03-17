import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material"; // ✅ Importamos CircularProgress y Box
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";
import LoadingScreen from "./pages/LoadingScreen";

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

  // ✅ Pantalla de carga con animación
  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/cat-wallpaper.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CircularProgress size={80} sx={{ color: "#4B0082", mb: 2 }} /> {/* ✅ Icono animado */}
        <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
          Cargando gatos...
        </Typography>
      </Box>
    );
  }

  if (!difficulty || cats.length === 0) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/cat-wallpaper.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          No se encontraron imágenes de gatos.
        </Typography>
      </Box>
    );
  }

  return <Game difficulty={difficulty} cats={cats} />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); // ⏳ Duración de la animación
  }, []);

  return (
    <Router>
      <Routes>
        {loading ? (
          <Route path="/" element={<LoadingScreen />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/game/:playerName/:difficulty" element={<GameWrapper />} />
            <Route path="/results/:playerName/:mistakes/:time/:result" element={<Results />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
