import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
//
import { gql, useQuery } from "@apollo/client";

// query to fetch tasks
const GET_TASKS = gql`
  query GetTasks {
    tasks {
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

// React component listing tasks
function TaskList() {
  const { loading, error, data, refetch } = useQuery(GET_TASKS);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Task Id</th>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Owner</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.taskId}</td>
              <td>{task.taskName}</td>
              <td>{task.taskDescription}</td>
              <td>{task.startDate}</td>
              <td>{task.endDate}</td>
              <td>{task.owner}</td>
              <td>
                <Link to={`/edittask/${task.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="center">
        <button className="center" onClick={() => refetch()}>
          Refetch
        </button>
      </div>
    </div>
  );
}
//
export default TaskList;
//
//

