import NavBarComponent from "./NavBar";

const Layout = (props) => {
  return (
    <>
      <NavBarComponent username={props.username}/>
      <div className="main">{props.children}</div>
    </>
  );
};

export default Layout;