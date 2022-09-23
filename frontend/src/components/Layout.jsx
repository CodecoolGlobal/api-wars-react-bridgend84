import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="main">{children}</div>
    </>
  );
};

export default Layout;