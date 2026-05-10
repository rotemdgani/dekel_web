import { Link } from "react-router-dom";

import { HOME_PROJECTS } from "@/data/homeProjects";
import "./HomeProjects.css";

const HomeProjects = () => (
  <section className="home-projects" aria-labelledby="home-projects-heading">
    <div className="home-projects-container">
      <header className="home-projects-header">
        <p className="home-projects-eyebrow">Projects</p>
        <h2 id="home-projects-heading" className="home-projects-title">
          Ongoing Bodies of Work
        </h2>
      </header>

      <ul className="home-projects-list">
        {HOME_PROJECTS.map((project) => (
          <li key={project.slug} className="home-projects-item">
            <Link
              className="home-project-block"
              to={`/works#${project.slug}`}
              aria-label={`${project.title}: Read more`}
            >
              <div className="home-project-visual">
                <img
                  src={project.imageUrl}
                  alt=""
                  className="home-project-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="home-project-copy">
                <h3 className="home-project-heading">{project.title}</h3>
                <p className="home-project-year">{project.yearRange}</p>
                <p className="home-project-desc">{project.description}</p>
                <span className="home-project-readmore">Read More</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default HomeProjects;
