Tests delete-rename-write order
<oliveagent-delete path="src/main.tsx">
</oliveagent-delete>
<oliveagent-rename from="src/App.tsx" to="src/main.tsx">
</oliveagent-rename>
<oliveagent-write path="src/main.tsx" description="final main.tsx file.">
finalMainTsxFileWithError();
</oliveagent-write>
EOM
