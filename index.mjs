import { createServer } from "http";
import { Replica, setGlobalCryptoDriver } from "earthstar";
import {
  CryptoDriverChloride,
  ExtensionKnownShares,
  ExtensionSyncWeb,
  ReplicaDriverFs,
  Server,
} from "earthstar/node";

// Use the fastest crypto drive available for Node.
setGlobalCryptoDriver(CryptoDriverChloride);

// Create underlying HTTP server to be used by Earthstar server.
const nodeServer = createServer();

new Server([
  new ExtensionKnownShares({
    // Set the shares you want your replica server to have at data/known_shares.json
    knownSharesPath: "./.data/known_shares.json",
    // Persist share replica data to ./.data
    onCreateReplica: (shareAddress) => {
      return new Replica({
        driver: new ReplicaDriverFs(
          shareAddress,
          `./.data/${shareAddress}/`,
        ),
      });
    },
  }),
  // Allow syncing at root path
  new ExtensionSyncWeb({ server: nodeServer }),
], { port: 3000, server: nodeServer });

if (process.env.PROJECT_DOMAIN) {
  console.log(
    `Sync with this server at https://${process.env.PROJECT_DOMAIN}.glitch.me/`,
  );
} else {
  console.log(`Sync with this server at http://localhost:3000`);
}
