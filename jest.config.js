module.exports = {
  name: "Minded API",
  verbose: true,
  coverageReporters: ["text", "lcov"],
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  rootDir: "./",
  moduleNameMapper: {
    "@/libs/(.*)": "<rootDir>/libs/$1",
    "@/(.*)": "<rootDir>/src/$1",
  },
  setupFiles: ["./test/setup.ts"],
};
