import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Form } from "./components/Form";
import { UserList } from "./components/UserList";
import { UserView } from "./components/UserView";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="bg-gray-200 min-h-screen">
          <div className="max-w-xl mx-auto w-full py-32 px-4">
            <div className="bg-white p-8 py-12 rounded-lg shadow-xl">
              <Routes>
                <Route path="/" element={<Form />} />
                <Route
                  path="/users"
                  element={<UserList />}
                />
                <Route 
                  path="/users/:id" 
                  element={<UserView />} 
                />
            </Routes>
            </div>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;