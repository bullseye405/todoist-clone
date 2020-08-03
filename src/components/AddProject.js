import React, { useState } from "react";
import { generatePushId } from "../helpers";
import { useProjectsValue } from "../context";
import { firebase } from "../firebase";

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");

  const projectId = generatePushId();
  const { setProjects } = useProjectsValue();

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
          setProjects([]);
          setProjectName("");
          setShow(false);
        });
  };

  return (
    <div className="add-project" data-testId="add-project">
      {show && (
        <div className="add-project_input">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project_name"
            type="text"
            data-testId="project-name"
            placeholder="Name your project"
          ></input>
          <button
            className="add-project_submit"
            type="button"
            onClick={() => addProject()}
          >
            Add Button
          </button>
          <span
            data-testId="hide-project-overlay"
            className="add-project_cancel"
            onClick={() => setShow(false)}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project-action">+</span>
      <span className="add-project_text" onClick={() => setShow(!show)}>
        Add Project
      </span>
    </div>
  );
};
