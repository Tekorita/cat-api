import { useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

interface Cat {
  id: string;
  url: string;
}

interface GameProps {
  difficulty: string;
  cats: Cat[];
}

const Game = ({ difficulty, cats }: GameProps) => {
  const [shuffledCats, setShuffledCats] = useState<Cat[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  // Asignar el tiempo según la dificultad
  const getInitialTime = (difficulty: string) => {
    switch (difficulty) {
      case "facil":
        return 120; // Fácil: 2 minutos
      case "intermedio":
        return 90; // Intermedio: 1 minuto y medio
      case "dificil":
        return 60; // Difícil: 1 minuto
      default:
        return 90; // Valor por defecto
    }
  };
  const [time, setTime] = useState(getInitialTime(difficulty)); // Usar el tiempo basado en dificultad
  const navigate = useNavigate();
  const { playerName } = useParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const selectedCats = cats.slice(0, 10);
    const duplicatedCats = [...selectedCats, ...selectedCats];
    const shuffled = duplicatedCats.sort(() => Math.random() - 0.5);
    setShuffledCats(shuffled);
  }, [cats]);

  // Reducir el tiempo cada segundo
  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      navigate(`/results/${playerName}/${mistakes}/gameover`);
    }
  }, [time, navigate, playerName, mistakes]);

  // Si todas las cartas se emparejan antes del tiempo, redirigir a resultados
  useEffect(() => {
    if (matchedCards.length === shuffledCats.length / 2 && shuffledCats.length > 0) {
      setTimeout(() => {
        navigate(`/results/${playerName}/${mistakes}/success`);
      }, 1000);
    }
  }, [matchedCards, navigate, playerName, mistakes, shuffledCats]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(shuffledCats[index].id)) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCat = shuffledCats[firstIndex];
      const secondCat = shuffledCats[secondIndex];

      if (firstCat.id === secondCat.id) {
        setMatchedCards([...matchedCards, firstCat.id]);
      } else {
        setMistakes((prev) => prev + 1);
      }

      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/cat-wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
        ⏳ {time}s
      </Typography>

      <Box
        sx={{
          padding: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
          width: "min(90vw, 700px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(5, 1fr)",
            gridTemplateRows: isMobile ? "repeat(5, 1fr)" : "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {shuffledCats.map((cat, index) => {
            const isFlipped = flippedCards.includes(index) || matchedCards.includes(cat.id);

            return (
              <Grid
                item
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: isFlipped ? "default" : "pointer",
                }}
                onClick={() => handleCardClick(index)}
              >
                <Card
                  sx={{
                    width: { xs: "80px", sm: "100px", md: "130px" },
                    height: { xs: "80px", sm: "100px", md: "130px" },
                    overflow: "hidden",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isFlipped ? "transparent" : "#ef9a9a",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {isFlipped ? (
                    <CardMedia
                      component="img"
                      image={cat.url}
                      alt={`Cat ${index}`}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Typography variant="h1" sx={{ color: "white", fontSize: "40px" }}>
                      ?
                    </Typography>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Game;
