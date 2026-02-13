const apiUrl = import.meta.env.VITE_API_URL;
export default function EmbeddedPage() {
  return (
    <div style={{ width: "100%", height: "60vh" }}>
      <iframe
        src={apiUrl}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Embedded Website"
      />
    </div>
  );
}
