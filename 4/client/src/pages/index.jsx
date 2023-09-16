import { Routes, Route } from "react-router";
import { PrivateRoutes } from "./private-route"
import { TodoPage } from "./todo/todo"
import { AuthPage } from "./auth/auth"

export const Routing = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<TodoPage />} />
      </Route>
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  );
};