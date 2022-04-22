import { GlitchServer } from "@earthstar-project/replica-server";

// Set the shares you want your replica server to have at data/known_shares.json
new GlitchServer({ port: 3000 });

console.log(
  `Sync with this server at https://${process.env.PROJECT_DOMAIN}.glitch.me/earthstar-api/v2`,
);
