import React from "react";
import Task from "./Task";
import { updateTaskState } from "../lib/store";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types"

export default function TaskList() {

    const tasks = useSelector((state) => {
        const tasksInOrder = [
            ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
            ...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED')

            /*         //тут  викликаєтьс-я 2 фільтра щоб спочатку з загального масиву витягнути pinned елементи а потім усі окрім  pinned і додаємо ї в масив
            ...tasks.filter((t) => t.state === "TASK_PINNED"),//all pined elements
            ...tasks.filter((t) => t.state !== "TASK_PINNED"),//all non-pinned elemets
     */
        ];
        const filteredTask = tasksInOrder.filter(
            (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
        );
        return filteredTask

    });
    const { status } = useSelector((state) => state.taskbox);
    console.log(status)
    const dispatch = useDispatch();
    const pinTask = (value) => {
        dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }));
    }
    const archiveTask = (value) => {
        dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
    }
    const LoadingRow = (//елемент блока завантаження з стилями
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );
    if (status === 'loading') {//блок який показує завантаження 
        return (
            <div className="list-items" data-testid="loading" key={"loading"} >
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        )
    }
    if (status === 0) {// блок який показує що відсутні таски 
        return (
            <div className="list-items" key={'empty'} data-testid="empty" >
                <div className='wrapper-message'>
                    <span className="icon-check" />
                    <p className="title-message">You have no tasks</p>
                    <p className="subtitle-message">Sit back and relax</p>
                </div>
            </div>
        )
    }
    return (

        <div className="list-items">
            {
            tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    onPinTask={(task) => pinTask(task)}
                    onArchiveTask={(task) => archiveTask(task)}
                />
            ))}
        </div>
    )
}
TaskList.propTypes = {
    /** Checks if it's in loading state */
    loading: PropTypes.bool,
    /** The list of tasks */
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
    /** Event to change the task to pinned */
    onPinTask: PropTypes.func,
    /** Event to change the task to archived */
    onArchiveTask: PropTypes.func,
};
TaskList.defaultProps = {
    loading: false,
};