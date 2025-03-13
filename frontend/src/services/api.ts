import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const fetchCats = async (playerName: string, difficulty: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/post_cats/`,
      { nombre: playerName, dificultad: difficulty },
      {
        headers: {
          "Content-Type": "application/json", // Asegura que se envía como JSON
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener gatos:", error);
    throw error;
  }
};
