import React, { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser, updateUser } from "./api/userService";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "" });
  const [message, setMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null); // track edit mode

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.user || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      showMessage("Failed to fetch users!");
    }
  };

  const handleCreate = async () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email) {
      showMessage("All fields are required!");
      return;
    }
    try {
      const response = await createUser(newUser);
      showMessage(response.data.message);
      setNewUser({ firstName: "", lastName: "", email: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
      showMessage("Failed to create user!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      showMessage(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      showMessage("Failed to delete user!");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateUser(editingUser.id, editingUser);
      showMessage(response.data.message);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      showMessage("Failed to update user!");
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        input:focus {
          border-color: rgba(102,126,234,0.6) !important;
          box-shadow: 0 0 0 3px rgba(102,126,234,0.2) !important;
        }
        
        input::placeholder {
          color: rgba(255,255,255,0.6);
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        
        li:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }
      `}</style>
      <div style={styles.container}>
      <h1 style={styles.heading}>Crud Operations Using NestJS</h1>

      {/* Popup message */}
      {message && <div style={styles.message}>{message}</div>}

      {/* Add User Form */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          value={newUser.firstName}
          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleCreate} style={styles.button}>Add User</button>
      </div>

      {/* User List Header */}
      <div style={styles.tableHeader}>
        <div style={styles.columnHeader}>First Name</div>
        <div style={styles.columnHeader}>Last Name</div>
        <div style={styles.columnHeader}>Email</div>
        <div style={styles.columnHeader}>Actions</div>
      </div>

      {/* User List */}
      <ul style={styles.list}>
        {users.map((user) => (
          <li key={user.id} style={styles.listItem}>
            {editingUser?.id === user.id ? (
              <>
                <div style={styles.column}>
                  <input
                    type="text"
                    value={editingUser.firstName}
                    onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                    style={styles.inputSmall}
                  />
                </div>
                <div style={styles.column}>
                  <input
                    type="text"
                    value={editingUser.lastName}
                    onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                    style={styles.inputSmall}
                  />
                </div>
                <div style={styles.column}>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    style={styles.inputSmall}
                  />
                </div>
                <div style={styles.column}>
                  <button onClick={handleUpdate} style={styles.buttonSmall}>Save</button>
                  <button onClick={() => setEditingUser(null)} style={styles.deleteButton}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div style={styles.column}>{user.firstName}</div>
                <div style={styles.column}>{user.lastName}</div>
                <div style={styles.column}>{user.email}</div>
                <div style={styles.column}>
                  <button onClick={() => setEditingUser(user)} style={styles.buttonSmall}>Edit</button>
                  <button onClick={() => handleDelete(user.id)} style={styles.deleteButton}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
              </ul>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%)",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
    color: "#ffffff",
    minHeight: "400px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#ffffff",
    fontSize: "2.2em",
    fontWeight: "300",
    letterSpacing: "1px",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  message: {
    background: "linear-gradient(135deg, #00d4aa 0%, #00b894 100%)",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: "10px",
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "500",
    boxShadow: "0 4px 12px rgba(0,212,170,0.3)",
    animation: "slideIn 0.3s ease-out",
  },
  form: {
    display: "flex",
    gap: "12px",
    marginBottom: "30px",
    flexWrap: "wrap",
    padding: "20px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
  },
  input: {
    flex: "1 1 auto",
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "8px",
    outline: "none",
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  button: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
  },
  tableHeader: {
    display: "flex",
    background: "rgba(255,255,255,0.1)",
    padding: "16px",
    marginBottom: "12px",
    borderRadius: "10px",
    fontWeight: "600",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    fontSize: "14px",
    letterSpacing: "0.5px",
  },
  columnHeader: {
    flex: "1",
    padding: "0 12px",
    textAlign: "left",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.05)",
    padding: "16px",
    borderRadius: "10px",
    marginBottom: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "all 0.3s ease",
    backdropFilter: "blur(5px)",
  },
  column: {
    flex: "1",
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#ffffff",
    fontSize: "14px",
  },
  inputSmall: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "6px",
    background: "rgba(255,255,255,0.1)",
    color: "#ffffff",
    fontSize: "13px",
    outline: "none",
    transition: "all 0.3s ease",
  },
  buttonSmall: {
    background: "linear-gradient(135deg, #00d4aa 0%, #00b894 100%)",
    color: "#ffffff",
    padding: "8px 14px",
    marginRight: "8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0,212,170,0.3)",
  },
  deleteButton: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #e55656 100%)",
    color: "#ffffff",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(255,107,107,0.3)",
  },
};

export default App;
//updated