import { useEffect, useState } from "react";
import "./App.css";
import { getUsers } from "./api/usersApi";

const FILTER_METHOD = {
  default: "default",
  ascendix: "ascendix",
  discendix: "discendix",
};

const isUserOdd = (id) => (id % 2 === 0 ? "red" : "green");

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [filterMethod, setFilterMethod] = useState(FILTER_METHOD.default);

  const handleUpdateFilter = (type) => {
    if (filterMethod === FILTER_METHOD.default)
      setFilterMethod(FILTER_METHOD.ascendix);
    if (filterMethod === FILTER_METHOD.ascendix)
      setFilterMethod(FILTER_METHOD.discendix);
    if (filterMethod === FILTER_METHOD.discendix)
      setFilterMethod(FILTER_METHOD.default);

    setFilterType(type);
  };

  const sortHelper = (user_a, user_b) => {
    if (filterMethod === FILTER_METHOD.ascendix)
      return user_a[filterType].localeCompare(user_b[filterType]);
    if (filterMethod === FILTER_METHOD.discendix)
      return user_b[filterType].localeCompare(user_a[filterType]);
    return 0;
  };

  useEffect(() => {
    getUsers.then((users) => setUsers(users));
  }, []);

  return (
    <div className="App">
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => handleUpdateFilter("name")}>Name</th>
            <th onClick={() => handleUpdateFilter("email")}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.name.toLowerCase().includes(name))
            .sort(sortHelper)
            .map((user) => {
              return (
                <tr bgcolor={isUserOdd(user.id)} key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
