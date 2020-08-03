import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";

import moment from "moment";
import { firebase } from "../firebase";
import { useSelectedProjectValue } from "../context";

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAdd,
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;

    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      collatedDate = moment().add(7, "days").format("DD/MM/YYYY");
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection("tasks")
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: "asdfghjkl",
        })
        .then(() => {
          setTask("");
          setProject("");
          setShowMain("");
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? "add-task add-task_overlay" : "add-task"}
      data-testId="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          className="add-task_shallow"
          data-testId="show-main-action"
          onClick={() => setShowMain(!showMain)}
        >
          <span className="add-task_plus">+</span>
          <span className="add-task_text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task_main" data-testId="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testId="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task_cancel-x"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAdd(false);
                  }}
                >
                  x
                </span>
              </div>
            </>
          )}

          <p>Project overlay here</p>
          <p>TaskDate here</p>

          <input
            className="add-task_content"
            data-testId="add-task-cotent"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          ></input>
          <button
            classname="add-task_submit"
            type="button"
            data-testId="add-task"
            onClick={() => addTask()}
          >
            Add Task
          </button>

          {!showQuickAddTask && (
            <span
              className="add-task_cancel"
              data-testId="add-task-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
            >
              Cancel
            </span>
          )}

          <span
            className="add-task_project"
            data-testId="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task_date"
            data-testId="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
