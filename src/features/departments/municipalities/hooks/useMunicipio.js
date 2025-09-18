import { useEffect, useState } from "react";
import axios from "axios";

export function useMunicipio(departmentSlug, municipioSlug) {
  const [municipio, setMunicipio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMunicipio() {
      try {
        const deptUrl = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/departamentos?slug=eq.${departmentSlug}&select=id`;
        const { data: dept } = await axios.get(deptUrl, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });

        if (!dept?.length) {
          setLoading(false);
          return;
        }

        const munUrl = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/municipios?slug=eq.${municipioSlug}&departamento_id=eq.${dept[0].id}&select=*`;
        const { data: mun } = await axios.get(munUrl, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });

        if (mun?.length) setMunicipio(mun[0]);
      } catch (e) {
        console.error("Error useMunicipio:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchMunicipio();
  }, [departmentSlug, municipioSlug]);

  return { municipio, loading };
}
