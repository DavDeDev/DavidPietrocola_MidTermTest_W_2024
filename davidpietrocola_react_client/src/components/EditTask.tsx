import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const GET_TASK = gql`
  query GetTask($id: String!) {
    task(id: $id) {
      taskId
      taskName
      taskDescription
      startDate
      endDate
      owner
    }
  }
`;
//
const UPDATE_TASK = gql`
  mutation UpdateTask($id: String!, $taskId: String!, 
    $taskName: String!, $taskDescription: String!,
    $startDate: String!, $endDate: String!, $owner: String!) {
    updateTask(id: $id, taskId: $taskId, taskName: $taskName, 
    taskDescription: $taskDescription, startDate: $startDate, 
    endDate: $endDate, owner: $owner) {
      id
      taskId
      taskName
      taskDescription
      startDate
      endDate
      owner
    }
  }
`;
//
function EditTask(props) {
  let navigate = useNavigate();
  const { id } = useParams(); // Get the id parameter from the URL

  const { loading, error, data } = useQuery(GET_TASK, {
    variables: { id },
    onCompleted: (data) => {
      const { taskId: currentTaskId, taskName: currentTaskName,
        taskDescription: currentTaskDescription, startDate: currentStartDate,
        endDate: currentEndDate, owner: currentOwner } = data.task;
      setTask({
        id, taskId: currentTaskId, taskName: currentTaskName,
        taskDescription: currentTaskDescription, startDate: currentStartDate,
      });

    },
  });

  const [updateTask] = useMutation(UPDATE_TASK);

  const [task, setTask] = useState({
    id: '', taskId: '', taskName: '',
    taskDescription: '', startDate: '', endDate: '', owner: ''
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('in handleSubmit, task=', task);
    updateTask({ variables: { id, ...task } });
    navigate('/tasklist');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Task Id</Form.Label>
          <Form.Control
            type="text"
            name="taskId"
            placeholder="Enter task Id"
            value={task.taskId || data.task.taskId}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            name="taskName"
            placeholder="Enter task name"
            value={task.taskName || data.task.taskName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            type="text"
            name="taskDescription"
            placeholder="Enter task description"
            value={task.taskDescription || data.task.taskDescription}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="text"
            name="startDate"
            placeholder="Enter start date"
            value={task.startDate || data.task.startDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formEndDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="text"
            name="endDate"
            placeholder="Enter end date"
            value={task.endDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formOwner">
          <Form.Label>Owner</Form.Label>
          <Form.Control
            type="text"
            name="owner"
            placeholder="Enter owner"
            value={task.owner}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
//
export default EditTask;
