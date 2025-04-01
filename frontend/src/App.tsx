import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";
import LoadingScreen from "./pages/LoadingScreen";
import { fetchCats } from "./services/api";

const GameWrapper = () => {
  const { playerName, difficulty } = useParams();
  const [cats, setCats] = useState<any[]>([]); // Inicializar como un array vacío
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!difficulty) return;

    // Función asíncrona interna para llamar a fetchCats
    const getCats = async () => {
      setIsLoading(true);
      try {
        // Llamamos a nuestra función que usa axios
        const data = await fetchCats(playerName ?? "", difficulty);
        // Suponiendo que 'data.gatos' contiene el array
        setCats(data.gatos || []);
      } catch (error) {
        console.error("Error al obtener gatos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCats();
  }, [difficulty, playerName]);

  // Pantalla de carga
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
        <CircularProgress size={80} sx={{ color: "#4B0082", mb: 2 }} />
        <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
          Cargando gatos...
        </Typography>
      </Box>
    );
  }

  // Si no hay dificultad o el array llegó vacío
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

  // Si todo va bien, renderizamos el componente Game
  return <Game difficulty={difficulty} cats={cats} />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula 3 segundos de pantalla de carga
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
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
            <Route
              path="/results/:playerName/:mistakes/:time/:result"
              element={<Results />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
