const { exec } = require("child_process");

const URL = "http://127.0.0.1:5000/swagger/v1/swagger.json",
  watchMode = !process.argv.includes("--once");
let lastHash = "";

console.log("👀 Watching for API changes...");

async function checkApi() {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const json = await response.text();

      // Si el JSON cambió, regeneramos
      if (json !== lastHash) {
        lastHash = json;
        console.log("New API version detected. Syncing types...");

        exec("npm run types", (err, stdout) => {
          if (err) console.error("Error syncing:", err);
          else console.log(stdout);
        });
      }
    }
  } catch (e) {
    // El servidor está caído o reiniciando, no hacemos nada
  }
  if (watchMode) {
    setTimeout(checkApi, 2000); // Reintenta cada 2 segundos
  }
}

checkApi();
