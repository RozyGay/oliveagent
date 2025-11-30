import { testSkipIfWindows } from "./helpers/test_helper";

testSkipIfWindows("oliveagent tags handles nested < tags", async ({ po }) => {
  await po.setUp({ autoApprove: true });
  await po.importApp("minimal");
  await po.sendPrompt("tc=oliveagent-write-angle");
  await po.snapshotAppFiles({ name: "angle-tags-handled" });
});
