export default function BookPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          viewTransitionName: "book",
          padding: "4rem",
        }}
      >
        <h1>Book Page</h1>
        <p>Book page content</p>
      </div>
    </div>
  );
}
