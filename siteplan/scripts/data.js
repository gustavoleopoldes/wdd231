export async function fetchGames() {
  try {
    const response = await fetch('data/games.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const games = await response.json();
    return games;
  } catch (error) {
    console.error('Failed to fetch games:', error);
    return [];
  }
}