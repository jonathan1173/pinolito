import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MunicipalityHero from "../components/MunicipalityHero";
import DepartmentCultureTabs from "../../components/culture/DepartmentCultureTabs";

export default function MunicipalityPage() {
  const { departmentSlug, municipioSlug } = useParams();
  const [municipio, setMunicipio] = useState(null);
  const [departamento, setDepartamento] = useState(null); // 👈 estado del departamento
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMunicipio() {
      try {
        // 1. Buscar departamento por slug
        const deptUrl = `${
          import.meta.env.VITE_SUPABASE_URL
        }/rest/v1/departamentos?slug=eq.${departmentSlug}&select=id,nombre`;
        const { data: dept } = await axios.get(deptUrl, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });

        if (!dept || dept.length === 0) {
          console.error("Departamento no encontrado");
          setLoading(false);
          return;
        }

        const departamentoData = dept[0];
        setDepartamento(departamentoData); // 👈 guardamos el departamento

        // 2. Buscar municipio por slug y departamento_id
        const munUrl = `${
          import.meta.env.VITE_SUPABASE_URL
        }/rest/v1/municipios?slug=eq.${municipioSlug}&departamento_id=eq.${
          departamentoData.id
        }&select=*`;
        const { data: mun } = await axios.get(munUrl, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });

        if (mun && mun.length > 0) {
          setMunicipio(mun[0]);
        }
      } catch (err) {
        console.error("Error al cargar municipio:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMunicipio();
  }, [departmentSlug, municipioSlug]);

  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center text-lg text-gray-600">
        Cargando municipio...
      </div>
    );
  }

  if (!municipio || !departamento) {
    return (
      <div className="h-48 flex items-center justify-center text-lg text-red-600">
        Municipio no encontrado
      </div>
    );
  }

  return (
    <>
      <MunicipalityHero
        name={municipio.nombre}
        description={municipio.descripcion}
        imagen_url={municipio.imagen_url}
        departmentSlug={departmentSlug}
        departmentName={departamento.nombre}
      />
      <div className="max-w-6xl md:mx-auto px-1 md:px-6 py-6  md:py-12 space-y-12">
        <p className="text-gray-800 text-justify leading-relaxed bg-white p-6 rounded-xl shadow-md border border-blue-200">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo beatae,
          reprehenderit, vero tempora itaque quae rem molestiae facilis maxime,
          esse adipisci reiciendis. Maiors ipsam, consectetur eum ea officia
          veniam provident! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aut quia id laborum esse hic pariatur consequatur dolorum eos
          labore? Aperiam nobis nihil quaerat, eos asperiores suscipit aliquam
          aliquid facilis eum. Accusantium saepe soluta deleniti maiores fugit
          sequi debitis ducimus animi maxime a iure eum nemo, culpa amet
          reprehenderit facere aspernatur ratione! Ipsam ut quidem nemo,
          <br />
          <img
            className="h-50 w-full md:w-80 float-right ml-4 mb-2 rounded-lg mx-auto  "
            src="/iglesia.jpg"
            alt=""
          />
          consequuntur fuga rerum optio odio! Eveniet magnam eum enim rem itaque
          reiciendis voluptates modi. Optio iure eos sapiente minima nam non
          explicabo ratione distinctio. Animi debitis voluptas quasi. Velit
          itaque ullam, numquam provident dolorem placeat. Est repellendus
          minima culpa, porro voluptatem magni exercitationem nobis expedita
          perferendis earum ad animi provident quos dignissimos adipisci quaerat
          aliquam! Blanditiis iusto veritatis aliquam cum laudantium, fugiat
          alias labore? Voluptatem. Velit soluta vel ducimus sequi cupiditate!
          Accusamus quo quam a quas laboriosam ratione officiis soluta, quidem,
          distinctio voluptas expedita minima eligendi eum dicta sequi, animi
          aliquid? Dignissimos quasi fugit repellat! Nesciunt aut expedita vitae
          <br />
          nihil fuga nostrum odio cumque totam. Dolorum corporis voluptatibus id
          ipsam neque distinctio facere assumenda, voluptas excepturi laboriosam
          iure animi, voluptatem laudantium ratione, architecto recusandae
          nulla! Velit voluptatem, deserunt animi aliquam numquam eum officiis
          doloremque hic harum! Magni a sit labore explicabo soluta facilis odio
          neque possimus nostrum ratione cumque obcaecati maxime dolore,
          similique illum. Qui? Nisi autem iusto nihil sed? Facere obcaecati
          facilis quia ea magnam possimus ipsam sit vitae maiores dolores ipsa
          dignissimos esse, minima earum odio rem! Ut voluptatum ab tempora ipsa
          repellendus!
        </p>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Datos Generales */}
          <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col gap-5 border border-blue-300 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-blue-800 mb-4 border-b border-blue-300 pb-2">
              Datos Generales
            </h2>
            <p className="text-gray-800">
              <span className="font-semibold">Población:</span>{" "}
              {municipio.poblacion?.toLocaleString() || "N/D"}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">Área:</span>{" "}
              {municipio.area_km2 ? `${municipio.area_km2} km²` : "N/D"}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">Altitud:</span>{" "}
              {municipio.altitud ? `${municipio.altitud} m` : "N/D"}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">Coordenadas:</span>{" "}
              {municipio.coordenadas || "N/D"}
            </p>
          </div>

          {/* Características Naturales */}
          <div className="bg-green-100 rounded-2xl shadow-lg p-8 flex flex-col gap-5 border border-green-300 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-green-800 mb-4 border-b border-green-300 pb-2">
              Características Naturales
            </h2>
            <ul className="text-gray-800 flex flex-col gap-3 list-disc list-inside">
              <li>
                <span className="font-semibold">Lago principal:</span>{" "}
                {municipio.lago || "N/D"}
              </li>
              <li>
                <span className="font-semibold">Volcanes cercanos:</span>{" "}
                {municipio.volcanes || "N/D"}
              </li>
              <li>
                <span className="font-semibold">Clima:</span>{" "}
                {municipio.clima || "N/D"}
              </li>
            </ul>
          </div>
        </section>
      </div>

      <DepartmentCultureTabs departamentoId={departamento.id} />
    </>
  );
}
