import React from "react";

const Contenido = () => {
  const videoList = [
    "https://www.youtube.com/watch?v=hTKDQ5FRB18",
    "https://www.youtube.com/watch?v=im3vc2NzCVc",
    "https://www.youtube.com/watch?v=EmHIoI-ceoI",
    // ... Puedes añadir tantas URLs como desees
  ];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#f9f4f5",
      height: "100vh",
    },
    videoList: {
      marginTop: "20px",
      marginBottom: "100px", // Agregamos el margen aquí
      width: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    videoItem: {
      marginBottom: "20px",
      width: "100%",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    },
    iframe: {
      borderRadius: "15px",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Contenido</h2>

      <div style={styles.videoList}>
        {videoList.map((url, index) => (
          <div key={index} style={styles.videoItem}>
            <iframe
              width="100%"
              height="315"
              src={url.replace("watch?v=", "embed/")}
              title={`video-${index}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={styles.iframe}
            ></iframe>
          </div>
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Contenido;
