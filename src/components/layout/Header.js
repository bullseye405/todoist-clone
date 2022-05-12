import React, { useState } from "react";
import { FaPizzaSlice } from "react-icons/fa";
import { AddTask } from "../AddTasks";

export const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li className="settings_add" data-testid="quick-add-task-action">
              <button
                onClick={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                }}
                onKeyDown={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                }}
              >
                +
              </button>
            </li>
            <li
              className="setting_darkmode"
              data-testid="dark-mode-action"
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              onKeyDown={() => {
                setDarkMode(!darkMode);
              }}
              role="button"
              tabIndex={0}
            >
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      ></AddTask>
    </header>
  );
};
