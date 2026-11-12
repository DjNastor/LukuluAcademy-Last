/** Lukulu Academy optional development API.
 * The HTML Student Hub still runs independently as a static prototype.
 */
"use strict";
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "64kb" }));
app.use("/api", apiRoutes);

// Export without opening a port, so HTTP smoke tests can use an ephemeral port.
if (require.main === module) {
  const PORT = Number(process.env.PORT || 3000);
  if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    console.error("PORT must be an integer between 1 and 65535");
    process.exitCode = 1;
  } else {
    // Local development only. Production hosting needs a separate deployment review.
    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Lukulu Academy development API: http://127.0.0.1:${PORT}/api/example`);
    });
  }
}

module.exports = app;
