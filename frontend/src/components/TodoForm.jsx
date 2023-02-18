import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Form from "react-bootstrap/Form"
import axios from 'axios'

function TodoForm() {
    const [ name, setName ] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = async(value) => {
        axios.post('/api/todos/', value)
            .then((res) => {
                const { data } = res;
                console.log(data);
            }).catch(() => {
                alert("Something went wrong")
            })
    }

  return (
    <Form>
        <InputGroup>
            <FormControl placeholder="New todo" onChange={handleChange} value={name}/>
            <Button type="submit" onClick={() => handleSubmit({name: name})}>
                Add
            </Button>
        </InputGroup>
    </Form>
  )
}

export default TodoForm
