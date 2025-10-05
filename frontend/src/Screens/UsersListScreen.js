import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Mess from "../Components/Message.js";
import Load from "../Components/Loading.js";
import {
  UserAll_ListAction,
  userDeleteAction,
} from "../Actions/User_action.js";

const UsersListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const users_List = useSelector((state) => state.users_List);
  const { loading, error, allUsers } = users_List;

  const user_Login = useSelector((state) => state.user_Login); //user_Login -> from the store
  const { UserInfo } = user_Login;

  const user_Delete = useSelector((state) => state.user_Delete); //user_Delete -> from the store
  const { success: seccessDeleteUser } = user_Delete;

  useEffect(() => {
    if (UserInfo && UserInfo.isAdmin) dispatch(UserAll_ListAction());
    else history.push("/login");
  }, [dispatch, history, seccessDeleteUser]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      dispatch(userDeleteAction(id));
      console.log("User Deleted Successfully");
    }
  };

  return (
    <div>
      <h1 className="cartHead" style={{ paddingBottom: "2rem" }}>
        Users
      </h1>
      {loading ? (
        <Load />
      ) : error ? (
        <Mess variant="danger">{error}</Mess>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>SL. NO.</th>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  {" "}
                  <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                </td>
                <td style={{ textAlign: "center" }}>
                  {user.isAdmin ? (
                    <i
                      className="fas fa-check"
                      style={{ color: "green", fontSize: "1.5rem" }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", fontSize: "1.5rem" }}
                    ></i>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UsersListScreen;
