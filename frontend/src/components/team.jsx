import React from "react";
import sohailpic from "../components/assets/sohailpic.jpeg";
import mopic from "../components/assets/mopic.jpeg";
import "../styling/Team.css";

const teamMembers = [
  {
    name: "Sohail Charef",
    image: sohailpic,
    role: "Fullstack Developer",
    description: "Sohail is a passionate developer with expertise in building user-friendly interfaces and exploring new technologies to enhance user experiences.",
    links: {
      github: "https://github.com/SohailPro12",
      linkedin: "https://www.linkedin.com/in/sohail-charef/",
      twitter: "https://twitter.com/CHSOHY"
    }
  },
  {
    name: "Mohamed Chatr",
    image: mopic,
    role: "Fullstack Developer",
    description: "Mohamed is a dedicated developer specializing in solving technical challenges and building robust systems to support web applications.",
    links: {
      github: "https://github.com/Mochatr",
      linkedin: "https://www.linkedin.com/in/mochatr/",
      twitter: "https://twitter.com/mo_chatr"
    }
  }
];

const TeamMember = ({ name, image, role, description, links }) => (
  <div className="team-member">
    <img src={image} alt={name} className="team-member-image" />
    <h2 className="team-member-name">{name}</h2>
    <h3 className="team-member-role">{role}</h3>
    <p className="team-member-description">{description}</p>
    <div className="team-member-links">
      {Object.entries(links).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`team-member-link ${platform}`}
        >
          {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </a>
      ))}
    </div>
  </div>
);

const Team = () => {
  return (
    <div className="team-page">
      <div className="team-container">
        <h1 className="team-heading">The Team Behind Flashmaster</h1>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
