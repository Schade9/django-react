import axios from 'axios'
import React, { useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FormControl from "react-bootstrap/FormControl"
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from 'react-icons/md'

function TodoList({ todos, setTodos }) {
    const [ show, setShow ] = useState(false);
    const [ record, setRecord ] = useState(null);

    const handleClose = () => {
        setShow(false);
    }

    const handleDelete = (id) => {
        axios.delete(`/api/todos/${id}/`)
            .then(() => {
                const newTodos = todos.filter(todo => {
                    return todo.id !== id
                });
                setTodos(newTodos);
            }).catch(() => {
                alert("Something went wrong");
            })
    }

    const handleUpdate = async(id, value) => {
        return axios.patch(`/api/todos/${id}/`, value)
            .then((res) => {
                const { data } = res;
                const newTodos = todos.map((todo) => {
                    if(todo.id === id) {
                        return data;
                    }
                    return todo;
                })
                setTodos(newTodos);
            }).catch(() => {
                alert("Something went wrong")
            })
    }

    const handleChange = (e) => {
        setRecord({
            ...record,
            name: e.target.value
        })
    }

    const handleSaveChanges = async () => {
        await handleUpdate(record.id, {name: record.name});
        handleClose()
    }

    const completedTodos = todos.filter(todo => todo.completed === true)
    const incompletedTodos = todos.filter(todo => todo.completed === false)

  return (
    <div>
        <div className="mb-2 mt-4">
            Incompleted Todos ({incompletedTodos.length})
        </div>
        {/* incompleted todos */}
        <ListGroup>
            {incompletedTodos.map((todo) => {
                return (
                    <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-center">
                            <span style={{
                                marginRight: "12px", cursor: "pointer"
                            }}
                            onClick={() => {
                                handleUpdate(todo.id, {completed: !todo.completed})
                            }}>
                                {todo.completed === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                            </span>
                        </div>
                        <span>{todo.name}</span>
                        <div>
                            <MdEdit style={{
                                cursor: "pointer",
                                marginRight: "12px"
                            }}
                            onClick={() => {
                                setRecord(todo);
                                setShow(true)
                            }}/>
                            <MdDelete style={{
                                cursor: "pointer",
                                marginRight: "12px"
                            }}
                            onClick={() => {
                                handleDelete(todo.id);
                            }}/>
                        </div>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
        
        <div className="mb-2 mt-4">
            Completed Todos ({completedTodos.length})
        </div>
        {/* completed todos */}
        <ListGroup>
            {completedTodos.map((todo) => {
                return (
                    <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-center">
                            <span style={{
                                marginRight: "12px", cursor: "pointer"
                            }}
                            onClick={() => {
                                handleUpdate(todo.id, {completed: !todo.completed})
                            }}>
                                {todo.completed === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                            </span>
                        </div>
                        <span>{todo.name}</span>
                        <div>
                            <MdEdit style={{
                                cursor: "pointer",
                                marginRight: "12px"
                            }}
                            onClick={() => {
                                setRecord(todo);
                                setShow(true)
                            }}/>
                            <MdDelete style={{
                                cursor: "pointer",
                                marginRight: "12px"
                            }}
                            onClick={() => {
                                handleDelete(todo.id);
                            }}/>
                        </div>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl value={record ? record.name : ""} onChange={handleChange}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default TodoList
