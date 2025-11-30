import { getGithubUser } from "../handlers/github_handlers";

export async function getGitAuthor() {
  const user = await getGithubUser();
  const author = user
    ? {
        name: `[oliveagent]`,
        email: user.email,
      }
    : {
        name: "[oliveagent]",
        email: "git@oliveagent.sh",
      };
  return author;
}
