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

export const saveGameResult = async (playerName: string, mistakes: number, timeTaken: number) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/save_result/`,
        {
          player_name: playerName, // Se envía correctamente el nombre
          mistakes: mistakes,      // Se asegura que mistakes tiene su key
          time_taken: timeTaken,   // Se asegura que time_taken tiene su key
        },
        {
          headers: {
            "Content-Type": "application/json", // Asegura que se envía como JSON
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error al guardar resultado del juego:", error);
      throw error;
    }
};

export const fetchGameResults = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get_results/`);
      return response.data.results; // ✅ Solo devolvemos la lista de resultados
    } catch (error) {
      console.error("Error al obtener los resultados:", error);
      throw error;
    }
};