import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import type { NextConfig } from "next";

/**
 * Short SHA of the commit this build came from, read straight out of .git so it works
 * in the Docker build too, where no git binary is installed. Empty when unavailable,
 * and the footer simply drops the stamp.
 */
function commitSha() {
  const fromEnv = process.env.NEXT_PUBLIC_COMMIT_SHA;
  if (fromEnv) return fromEnv.slice(0, 7);

  try {
    const head = readFileSync(".git/HEAD", "utf8").trim();
    if (!head.startsWith("ref: ")) return head.slice(0, 7);

    const ref = head.slice(5);
    try {
      return readFileSync(`.git/${ref}`, "utf8").trim().slice(0, 7);
    } catch {
      // Shallow and freshly cloned repos keep their refs packed instead of loose
      const packed = readFileSync(".git/packed-refs", "utf8");
      const match = packed.match(new RegExp(`^([0-9a-f]{40}) ${ref}$`, "m"));
      return match?.[1].slice(0, 7) ?? "";
    }
  } catch {
    return "";
  }
}

/** First line of the commit message, for the footer's hover card. Empty without git. */
function commitSubject() {
  try {
    return execFileSync("git", ["log", "-1", "--pretty=%s"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .trim()
      .slice(0, 120);
  } catch {
    return "";
  }
}

const nextConfig: NextConfig = {
  output: "export",
  env: {
    // Day index of the build; lets date-derived labels hydrate exactly as prerendered
    NEXT_PUBLIC_BUILD_DAY: String(Math.floor(Date.now() / 86_400_000)),
    NEXT_PUBLIC_COMMIT_SHA: commitSha(),
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10),
    NEXT_PUBLIC_COMMIT_SUBJECT: commitSubject(),
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
