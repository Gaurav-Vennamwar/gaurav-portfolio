import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);




const projects = [
  {
    num: "01",
    name: "SKMS Version 2",
    category: "Full Stack Knowledge Platform",
    tools: "ASP.NET Core, Angular, Azure SQL, EF Core, JWT Auth & Refresh Tokens, Markdown Editor",
    image: "/images/skmsv2-home.png",
    link: "https://secure-knowledge-management-systemv-ten.vercel.app/"
  },
  {
    num: "02",
    name: "Ascendly AI",
    category: "AI Career SaaS (Active Build)",
    tools: "ATS Optimization, AI Mock Interviews, Resume Intelligence, Personal Learning Roadmaps",
    image: "/images/ascendly-home.png",
    link: "#"
  },
  {
    num: "03",
    name: "SKMS Version 1",
    category: "Full Stack Web Application",
    tools: "C#, ASP.NET Core, Angular, SQL Server, Dapper ORM, REST APIs, Render Deployment",
    image: "/images/skms-home.png",
    link: "https://secure-knowledge-management-systemv-ten.vercel.app/"
  }
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const  timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools & Technologies</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage 
                image={project.image} 
                alt={project.name} 
                link={project.link !== "#" ? project.link : undefined} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

