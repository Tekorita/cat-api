import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();
  const { playerName, mistakes, result } = useParams();

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
      <Typography variant="h2" sx={{ color: "#4B0082", mb: 2 }}>
        {result === "gameover" ? "💀 Game Over 💀" : "🎉 ¡Felicidades! 🎉"}
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: 500, mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Nombre</strong></TableCell>
              <TableCell align="center"><strong>Desaciertos</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{playerName}</TableCell>
              <TableCell align="center">{mistakes}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" sx={{ backgroundColor: "#4B0082", color: "white" }} onClick={handlePlayAgain}>
        🔄 Volver a jugar
      </Button>
    </Box>
  );
};

export default Results;
