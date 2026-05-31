async function pingServer() {
    try {
        await fetch("https://feed-back-server.onrender.com/ping");
        console.log("Pinged server successfully to keep it awake.");
    } catch (error) {
        console.error("Ping server failed:", error);
    }
}

// Ping immediately when loaded, then every 5 minutes
pingServer();
setInterval(pingServer, 5 * 60 * 1000);
