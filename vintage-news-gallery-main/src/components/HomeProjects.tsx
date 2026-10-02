import { Link } from "react-router-dom";

import { HOME_PROJECTS } from "@/data/homeProjects";
import "./HomeProjects.css";

const pad = (n: number) => String(n).padStart(2, "0");

const HomeProjects = () => (
  <section
    className="home-projects"
    id="home-series"
    aria-labelledby="home-projects-heading"
  >
    <div className="home-projects-container">
      <header className="home-projects-header">
        <p className="home-projects-eyebrow">Projects</p>
        <h2 id="home-projects-heading" className="home-projects-title">
          Ongoing Bodies of Work
        </h2>
      </header>

      <ul className="home-projects-list">
        {HOME_PROJECTS.map((project, i) => (
          <li key={project.slug} className="home-projects-item">
            <Link
              className="home-project-cover"
              to={`/works#${project.slug}`}
              aria-label={`${project.title}: View the series`}
            >
              {/* Blurred, darkened copy of the cover fills the frame */}
              <div
                className="home-project-backdrop"
                style={{ backgroundImage: `url(${project.imageUrl})` }}
                aria-hidden="true"
              />
              <div className="home-project-visual">
                <img
                  src={project.imageUrl}
                  alt={`${project.title} — series cover`}
                  className="home-project-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="home-project-shade" aria-hidden="true" />

              <div className="home-project-copy">
                <p className="home-project-index">
                  Series {pad(i + 1)} <span>/ {pad(HOME_PROJECTS.length)}</span>
                </p>
                <h3 className="home-project-heading">{project.title}</h3>
                <p className="home-project-meta">
                  <span className="home-project-year">{project.yearRange}</span>
                  <span className="home-project-desc">{project.description}</span>
                </p>
                <span className="home-project-cta">
                  View the Series <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default HomeProjects;
