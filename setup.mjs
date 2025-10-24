import fs from "fs";
import { spawnSync } from "child_process";

function checkDocker() {
  const check = spawnSync("docker", ["--version"], { stdio: "pipe" });
  if (check.status !== 0) {
    console.error("❌ Docker is not installed or not available in PATH.");
    console.error("👉 Please install Docker Desktop or ensure the docker command is accessible.");
    process.exit(1);
  } else {
    console.log(`🐳 Docker found: ${check.stdout.toString().trim()}`);
  }
}

function copyEnvFiles() {
  const envs = [
    { example: ".env.web.example", target: "./apps/web/.env", name: "web" },
    { example: ".env.api.example", target: "./apps/api/.env", name: "api" },
  ];

  for (const { example, target, name } of envs) {
    if (!fs.existsSync(example)) {
      console.warn(`⚠️  Missing ${example} — skipping ${name} env creation`);
      continue;
    }

    const dir = target.split("/").slice(0, -1).join("/");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (!fs.existsSync(target)) {
      fs.copyFileSync(example, target);
      console.log(`✅ Created ${target} from ${example}`);
    } else {
      console.log(`ℹ️ ${target} already exists — skipping copy.`);
    }
  }
}

function runDockerCompose() {
  console.log("\n🚀 Starting Docker Compose...");
  const result = spawnSync("docker", ["compose", "up", "--build"], { stdio: "inherit" });
  process.exitCode = result.status;
}

console.log("🔧 Setting up environment...");
checkDocker();
copyEnvFiles();
runDockerCompose();