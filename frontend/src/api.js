// src/utils/api.js
export async function validateApiKey(apiKey) {
  return !!await fecthVideosListData(apiKey);
}

export async function fecthVideosListData(apiKey) {
  try {
    const url = "https://api-v2.pandavideo.com.br/videos";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `${apiKey}`,
        "Accept": "application/json"
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Dados recebidos:", data);

      return data;
    } else if (response.status === 401) {
      console.error("API Key inválida!");
      return;
    } else {
      const errorData = await response.json();
      console.error("Erro ao validar a chave:", errorData);
      return;
    }
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
    return;
  }
}

export async function fetchFoldesData(apiKey) {
  try {
    const url = "https://api-v2.pandavideo.com.br/folders";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `${apiKey}`,
        "Accept": "application/json"
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Dados recebidos:", data);

      return data;
    }
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
    return;
  }
}

export async function getFolders(apiKey) {
  const data = await fetchFoldesData(apiKey);

  return data?.folders.map((folder) => (
    { name: folder.name, id: folder.id, videoCount: folder.videos_count }
  ));
}

const API_KEY = 'apiKey';

export function getApiKey() {
  return localStorage.getItem(API_KEY);
}

export function deleteApiKey() {
  localStorage.removeItem(API_KEY);
}
