import { useState, useEffect } from "react";
import axios from "axios";

export default function useEventos() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventos = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "https://ctypwfgfbgylgfdnrmwl.supabase.co/rest/v1/experiencias",
                    {
                        headers: {
                            apikey: import.meta.env.VITE_SUPABASE_KEY,
                            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
                        },
                        params: {
                            select: "*", // Trae todas las columnas necesarias
                        },
                    }
                );
                // console.log("📌 Datos crudos desde Supabase:", response.data);


                setEventos(response.data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    return { eventos, loading, error };
}
