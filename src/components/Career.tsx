import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2>
          My journey <span>&</span>
          <br /> milestones
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Projects</h4>
                <h5>Self-Led Engineering</h5>
              </div>
              <h3>2025 - NOW</h3>
            </div>
            <p>
              Designed and deployed production-ready applications from scratch, including SKMS (Secure Knowledge Management System) 
              and Ascendly AI. Integrated full-stack ecosystems using modern hosting platforms (Render, Vercel).
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Backend Engineering</h4>
                <h5>Microsoft Stack Focus</h5>
              </div>
              <h3>DEVELOPMENT</h3>
            </div>
            <p>
              Engineered secure, scalable REST APIs using ASP.NET Core and C#. Implemented robust JWT authentication, 
              role-based access control (RBAC), and refresh token rotation.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Database & Cloud</h4>
                <h5>Azure SQL & ORMs</h5>
              </div>
              <h3>ARCHITECTURE</h3>
            </div>
            <p>
              Designed relational schemas in SQL Server and Azure SQL. Wrote stored procedures, optimized complex joins 
              and indexes, and interfaced using Entity Framework Core and Dapper.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Architecture</h4>
                <h5>Responsive Web Apps</h5>
              </div>
              <h3>FRONTEND</h3>
            </div>
            <p>
              Developed interactive user interfaces using Angular. Leveraged standalone components, HTTP interceptors, 
              and services to build seamless, client-side web applications.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;

