import React, { useState } from "react";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { IndividualProject } from "./IndividualProject";

export const Projects = ({ activeValue = true }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map((project) => {
      return (
        <li
          key={project.projectId}
          data-doc-id={project.docId}
          data-testid="project-action"
          role="button"
          className={
            active === project.projectId
              ? "active sidebar_project"
              : "sidebar_project"
          }
          onKeyDown={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
        >
          <IndividualProject project={project} />
        </li>
      );
    })
  );
};
