import React, { useState } from "react";
import { generatePushId } from "../helpers";
import { useProjectsValue } from "../context";
import { firebase } from "../firebase";

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");

  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();

  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection("projects")
        .add({
          projectId,
          name: projectName,
          userId: "asdfghjkl",
        })
        .then(() => {
          setProjects([...projects]);
          setProjectName("");
          setShow(false);
        });
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project_input">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project_name"
            type="text"
            data-testid="project-name"
            placeholder="Name your project"
          ></input>
          <button
            className="add-project_submit"
            type="button"
            onClick={() => addProject()}
          >
            Add
          </button>
          <span
            data-testd="hide-project-overlay"
            className="add-project_cancel"
            onClick={() => setShow(false)}
            onKeyDown={() => setShow(!show)}
            role="button"
            tabIndex={0}
          >
            Cancel
          </span>
        </div>
      )}
      <div onClick={() => setShow(!show)}>
        <span className="add-project-action">+</span>
        <span className="add-project_text">Add Project</span>
      </div>
    </div>
  );
};
