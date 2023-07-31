import { NavLink } from "react-router-dom";

export default function NavButton({ anchor, path }) {
  return <NavLink to={path}>{anchor}</NavLink>;
}