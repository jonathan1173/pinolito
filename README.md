
![Hackathon Nicaragua 2025 – Certificado de Participación](CertificadoDeParticipacion.png)

# Pinolito – Hackathon Nicaragua 2025

**Pinolito** es una **aplicación web interactiva** desarrollada con **React.js + Vite** para explorar la riqueza cultural de Nicaragua, utilizando mapas, vistas detalladas y una interfaz dinámica.  
Este proyecto fue desarrollado como parte del **Hackathon Nicaragua 2025**, demostrando habilidades en **full-stack web development, frontend interactivity y gestión de datos en tiempo real**.

🔗 **Demo en producción**: [https://pinolito.vercel.app/](https://pinolito.vercel.app/)

---

## 👤 Professional Profile

Aspiring full-stack developer with experience in **rapid prototyping, interactive web applications, and working under hackathon constraints**.  
This project demonstrates my ability to:
- Build interactive, responsive web interfaces using React.js and Tailwind CSS
- Integrate frontend with a backend (Supabase) for dynamic data
- Implement maps and location-based content using Leaflet
- Structure scalable and maintainable code using feature-based architecture

---

## 📝 Project Description

Pinolito permite explorar información cultural organizada por **departamentos y municipios**, en categorías como:

- Historia  
- Gastronomía  
- Tradiciones  
- Turismo  
- Sociedad  

Además, incluye:

- **Calendario de eventos** en los diferentes departamentos  
- **Sección de juegos interactivos** para fomentar el aprendizaje

---

## 🚀 Features

- Exploración cultural por departamentos y municipios  
- Vistas de detalle para cada elemento cultural  
- Mapas interactivos con **Leaflet + React Leaflet**  
- Diseño responsivo y adaptable a móvil y escritorio  
- Integración con **Supabase** para datos en tiempo real  
- Animaciones y transiciones con **Framer Motion / GSAP**  

---

## 🛠️ Technologies

- **React 19.1.1** – UI framework  
- **Vite 7.1.5** – Dev environment and build tool  
- **React Router DOM 7.8.2** – Page routing  
- **Tailwind CSS 4.1.12** – Utility-first styling  
- **Supabase** – Backend and database  
- **Framer Motion / GSAP** – Animations  
- **Leaflet + React Leaflet** – Interactive maps  

---

## 📂 Project Architecture

Feature-based structure:

src/
├── features/
│   ├── home/          # Homepage
│   ├── departments/   # Cultural content by departments/municipios
│   └── games/         # Interactive games
├── shared/
│   └── components/    # Reusable components
└── services/          # Supabase API integration

---

### Application Routes

```mermaid
graph LR
    Root["/"]
    Departments["/department"]
    DeptDetail["/department/:ciudad"]
    Municipality["/department/:departmentSlug/municipios/:municipioSlug"]
    
    subgraph "Cultural Content"
        Historia["/department/:departmentSlug/historia/:slug"]
        Lugares["/department/:departmentSlug/lugares/:slug"]
        Comida["/department/:departmentSlug/comida/:slug"]
        Tradiciones["/department/:departmentSlug/artes_y_tradiciones/:slug"]
        Sociedad["/department/:departmentSlug/gente_y_sociedad/:slug"]
    end
    
    subgraph "Additional Features"
        Games["/games"]
        Calendar["/calendar"]
    end
    
    Root --> HomePage
    Departments --> DepartmentsPage
    DeptDetail --> DepartmentDetails
    Municipality --> MunicipalityPage
    Historia --> HistoriaDetail
    Lugares --> TurismoDetail
    Comida --> GastronomiaDetail
    Tradiciones --> TradicionesDetail
    Sociedad --> SociedadDetail
    Games --> GamePage
    Calendar --> CalendarPage
```




## ⚙️ Installation & Usage

**Node.js** is required for dependency management:

```bash
# Clone repository
git clone https://github.com/jonathan1173/pinolito.git

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

---

## 🔑 Configuration

Create a `.env` file in the project root with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_api_key
```

---

## 👨‍💻 Author

**Jonathan Samuel Dávila Mendoza**
Participant, Hackathon Nicaragua 2025

---

## 📝 Notes

* Deploy currently on **Vercel**
* Scalable feature-based architecture
* Error handling and loading states implemented throughout