import { useEffect, useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGameResults } from "../services/api"; // ✅ Importamos la función para obtener los resultados
import "animate.css"; // ✅ Importamos la librería de animaciones

const Results = () => {
  const navigate = useNavigate();
  const { playerName, result } = useParams();
  const [gameResults, setGameResults] = useState<{ player_name: string; mistakes: number; time_taken: number }[]>([]);

  useEffect(() => {
    fetchGameResults()
      .then((data) => setGameResults(data))
      .catch((err) => console.error("Error al obtener resultados:", err));
  }, []);

  const handlePlayAgain = () => {
    navigate("/", { state: { playerName } });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: "url('/cat-wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ✅ Animación bounceUp + tipografía de Home.tsx */}
      <Typography
        variant="h2"
        className="animate__animated animate__swing"
        sx={{
          fontFamily: "'Finger Paint', cursive",
          color: "#4B0082",
          textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
          mb: 2,
          animationDuration: "1.4s",
          animationDelay: "0.3s",
        }}
      >
        {result === "gameover" ? "💀 Game Over 💀" : "🎉 ¡Felicidades! 🎉"}
      </Typography>

      {/* ✅ Animación bounceInUp en la tabla */}
      <TableContainer
        component={Paper}
        className="animate__animated animate__bounceInUp"
        sx={{ maxWidth: 600, mb: 3, animationDuration: "2s" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Nombre</strong></TableCell>
              <TableCell align="center"><strong>Desaciertos</strong></TableCell>
              <TableCell align="center"><strong>Tiempo (s)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameResults.map((result, index) => (
              <TableRow key={index}>
                <TableCell align="center">{result.player_name}</TableCell>
                <TableCell align="center">{result.mistakes}</TableCell>
                <TableCell align="center">{result.time_taken}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Animación bounceInUp en el botón */}
      <Button
        variant="contained"
        className="animate__animated animate__bounceInUp"
        sx={{
          backgroundColor: "#4B0082",
          color: "white",
          fontSize: "18px",
          padding: "12px 24px",
          borderRadius: "10px",
          textTransform: "none",
          animationDuration: "1s",
          "&:hover": { backgroundColor: "#3A006F" },
        }}
        onClick={handlePlayAgain}
      >
        🔄 Volver a jugar
      </Button>
    </Box>
  );
};

export default Results;
