const API_BASE_URL = 'http://localhost:3000/api';

export async function fetchVideosListData(jwtToken, currentPage = 1) {
  try {
    const url = `${API_BASE_URL}/videos?page=${currentPage}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `${jwtToken}`,
        "Accept": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Dados recebidos:", data);
      return data;
    }
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
  }
}

export async function getVideoData(jwtToken, videoId) {
  try {
    const url = `${API_BASE_URL}/video/${videoId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `${jwtToken}`,
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

export async function updateVideoTitle(jwtToken, videoId, newTitle) {
  try {
    const url = `${API_BASE_URL}/video/${videoId}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": jwtToken,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: newTitle })
    });

    if (response.ok) {
      console.log("Título atualizado com sucesso");
      return true;
    }
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
    return false;
  }
}

export async function fetchFoldesData(jwtToken) {
  try {
    const url = `${API_BASE_URL}/folders`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `${jwtToken}`,
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

export async function getFolders(jwtToken) {
  const data = await fetchFoldesData(jwtToken);

  return data?.folders.map((folder) => (
    { name: folder.name, id: folder.id, videoCount: folder.videos_count }
  ));
}
