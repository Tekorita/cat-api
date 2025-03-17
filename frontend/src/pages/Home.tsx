import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import "animate.css"; // ✅ Importar la librería de animaciones
import "../styles/Home.css";

const Home = () => {
  const location = useLocation();
  const [playerName, setPlayerName] = useState(location.state?.playerName || "");
  const [difficulty, setDifficulty] = useState("");

  const navigate = useNavigate();

  const handleStartGame = () => {
    if (playerName && difficulty) {
      navigate(`/game/${playerName}/${difficulty}`);
    }
  };

  return (
    <Box
      className="fade-in"
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: "url('/cat-wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
    >
      {/* ✅ Animación "swing" para el título */}
      <Typography
        variant="h1"
        gutterBottom
        className="animate__animated animate__swing"
        sx={{
          fontFamily: "'Finger Paint', cursive",
          color: "#4B0082",
          textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
          mb: 5,
          animationDuration: "1.4s",
          animationDelay: "0.3s",
        }}
      >
        Memory Cats
      </Typography>

      {/* ✅ Contenedor lógico (invisible) con animación FadeIn */}
      <Box
        className="animate__animated animate__fadeIn"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animationDuration: "1.8s", // Duración de la animación
        }}
      >
        {/* Texto "Ingrese nombre" */}
        <FormLabel sx={{ color: "black", fontWeight: "bold", mb: 1 }}>Nombre</FormLabel>

        <TextField
          variant="outlined"
          fullWidth
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          sx={{
            mb: 4,
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />

        {/* Selección de dificultad con Radio Buttons */}
        <FormControl component="fieldset" sx={{ mb: 4 }}>
          <FormLabel sx={{ color: "black", fontWeight: "bold", mb: 1 }}>Dificultad</FormLabel>
          <RadioGroup value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <FormControlLabel
              value="facil"
              control={<Radio />}
              label={<Typography sx={{ color: "black", fontWeight: "bold" }}>Fácil</Typography>}
            />
            <FormControlLabel
              value="intermedio"
              control={<Radio />}
              label={<Typography sx={{ color: "black", fontWeight: "bold" }}>Intermedio</Typography>}
            />
            <FormControlLabel
              value="dificil"
              control={<Radio />}
              label={<Typography sx={{ color: "black", fontWeight: "bold" }}>Difícil</Typography>}
            />
          </RadioGroup>
        </FormControl>

        {/* Botón para empezar el juego */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStartGame}
          disabled={!playerName || !difficulty}
          sx={{
            backgroundColor: !playerName || !difficulty ? "gray" : "#61dafb",
            color: "black",
            fontSize: "20px",
            padding: "15px 30px",
            borderRadius: "10px",
            textTransform: "none",
            "&:hover": { backgroundColor: !playerName || !difficulty ? "gray" : "#21a1f1" },
          }}
        >
          Jugar
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
