import './styles/Work.css';
import WorkImage from './WorkImage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    num: '01',
    name: 'Ascendly AI',
    category: 'AI-Powered Career Platform',
    description:
      'A modern SaaS platform that helps software engineers optimize resumes, improve ATS compatibility, practice AI-powered mock interviews, follow personalized learning roadmaps, and track interview readiness through an intelligent career dashboard.',

    tools:
      'Angular 21 • ASP.NET Core Web API • PostgreSQL • JWT Authentication • Google Gemini AI • Entity Framework Core • Render • Vercel • Supabase',

    image: '/images/ascendly-home.png',

    link: 'https://ascendly-ai-five.vercel.app/',
  },

  {
    num: '02',
    name: 'Secure Knowledge Management System (V2)',
    category: 'Production Knowledge Platform',

    description:
      'A full-stack knowledge management platform built with enterprise architecture featuring secure authentication, markdown-powered blog management, role-based authorization, image management, syntax highlighting, and a modern SaaS user experience.',

    tools:
      'Angular • ASP.NET Core • Azure SQL • Entity Framework Core • JWT • Refresh Tokens • Cloudinary • Render • Vercel • Azure Sql',

    image: '/images/skmsv2-home.png',

    link: 'https://secure-knowledge-management-systemv-ten.vercel.app/',
  },

  {
    num: '03',
    name: 'Secure Knowledge Management System (V1)',
    category: 'Enterprise Blog Platform',

    description:
      'The first production version of SKMS demonstrating a complete authentication system, CRUD operations, REST APIs, layered architecture, Dapper integration, SQL Server database design, and responsive Angular frontend.',

    tools: 'ASP.NET Core • Angular • SQL Server • Dapper • JWT • REST APIs • Render',

    image: '/images/skms-home.png',

    link: 'https://secure-knowledge-management-systemv-ten.vercel.app/',
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName('work-box');
      if (box.length === 0) return;
      const rectLeft = document.querySelector('.work-container')!.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number = parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.work-section',
        start: 'top top',
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: 'work',
      },
    });

    timeline.to('.work-flex', {
      x: -translateX,
      ease: 'none',
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById('work')?.kill();
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
                <h4>Project Overview</h4>
                <p>{project.description}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link !== '#' ? project.link : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
