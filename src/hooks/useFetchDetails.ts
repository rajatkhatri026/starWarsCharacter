import { useCallback } from "react";

const useFetchDetails = () => {
  const fetchData = useCallback(async (url: string, type: string) => {
    try {
      const response = await fetch(url);

      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`Error fetching ${type}: ${response.statusText}`);
      }

      // Attempt to parse JSON
      const data = await response.json();

      // Return specific fields based on type
      return type === "film"
        ? data.title
        : type === "species"
        ? data.name
        : data.name;
    } catch (error) {
      console.error("Error fetching data:", error);
      return ""; // Return empty string in case of error
    }
  }, []);

  return fetchData;
};

export default useFetchDetails;