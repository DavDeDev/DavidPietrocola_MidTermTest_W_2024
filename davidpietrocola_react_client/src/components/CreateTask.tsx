import React from 'react';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'; // Import react-bootstrap components

// mutation to add a task
const ADD_TASK = gql`
  mutation AddTask($taskId: String!, $taskName: String!, $taskDescription: String!
        $startDate: String!, $endDate: String!, $owner: String!) {
    createTask(taskId: $taskId, taskName: $taskName, taskDescription: $taskDescription,
        startDate: $startDate, endDate: $endDate, owner: $owner) {
      id
      taskId
      taskName
    }
  }
`;

function CreateTask() {
  let navigate = useNavigate();
  const [addTask] = useMutation(ADD_TASK);
  const [taskId, setTaskId] = React.useState('');
  const [taskName, setTaskName] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [owner, setOwner] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ variables: { taskId, taskName, taskDescription, startDate, endDate, owner } });
    setTaskId('');
    setTaskName('');
    setTaskDescription('');
    setStartDate('');
    setEndDate('');
    setOwner('');
    navigate('/tasklist');
  };

  return (
    <Container>
      <h2>Add Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Task Id</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Task Id"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Task Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Description</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Start Date</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>End Date</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Owner</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">Add Task</Button>
      </Form>
    </Container>
  );
}

export default CreateTask;

