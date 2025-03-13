import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

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
      <Typography
        variant="h1"
        gutterBottom
        sx={{
          fontFamily: "'Finger Paint', cursive",
          color: "#4B0082",
          textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
          mb: 5,
        }}
      >
        Memory Cats
      </Typography>

      {/* Texto "Ingrese nombre" */}
      <FormLabel sx={{ color: "black", fontWeight: "bold", mb: 1 }}>
        Nombre
      </FormLabel>

      <TextField
        variant="outlined"
        fullWidth
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        sx={{
          mb: 4,
          backgroundColor: "white",
          borderRadius: 1,
          width: "10%",
          maxWidth: "400px",
        }}
      />

      {/* Selección de dificultad con Radio Buttons */}
      <FormControl component="fieldset" sx={{ mb: 4 }}>
        <FormLabel sx={{ color: "black", fontWeight: "bold", mb: 1 }}>
          Dificultad
        </FormLabel>
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
  );
};

export default Home;
