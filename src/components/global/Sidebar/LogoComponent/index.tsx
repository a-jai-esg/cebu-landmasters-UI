import logoImage from "../../../../assets/CLI-Logo-Transparent-Grayscale.png";

const LogoComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#24274c",
        height: "145px", // Adjust this value according to your layout
      }}
    >
      <img
        src={logoImage}
        alt="Logo"
        style={{
          cursor: "pointer",
          maxWidth: "25.5vh",
          maxHeight: "25.5vh",
        }}
      />
    </div>
  );
};

export default LogoComponent;
