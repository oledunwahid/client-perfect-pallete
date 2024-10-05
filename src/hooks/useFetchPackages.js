import { useEffect, useState } from "react";
import axios from "axios";

const useFetchPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/packages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPackages(response.data.data);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return { packages, loading, error, refetch: fetchPackages };
};

export default useFetchPackages;
