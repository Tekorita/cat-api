import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "animate.css";
import "../styles/CatAnimation.css"; // ✅ Importamos la animación del gato

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowHome(true);
      navigate("/"); // Redirigir a Home después de la animación
    }, 1000); // ⏳ Espera 3 segundos antes de ir a Home
  }, [navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="cat">
        <img alt="walking cat" src="https://cdn.dribbble.com/users/2077326/screenshots/4097154/media/80a6a27be1d6398a0af9a6ee26140d9e.gif"/>
      </div>

      {/* Texto de bienvenida */}
      <Typography
        variant="h3"
        className="animate__animated animate__fadeInDown"
        sx={{
            fontFamily: "'Finger Paint', cursive",
            color: "#4B0082",
            textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
            mt: 4,
            textAlign: "center", // ✅ Asegura que el texto esté centrado
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", // ✅ Se asegura de que ocupe todo el ancho disponible
        }}
        >
        Bienvenido a Memory Cats 🐱
        </Typography>
    </Box>
  );
};

export default LoadingScreen;
