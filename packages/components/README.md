# Components

## Bit.dev

1. Initialize Bit on a project
   Open a terminal application and follow these steps to initialize Bit for your project. Make sure to authenticate Bit and NPM.

   ```powershell
   cd project_directory
   bit init
   bit login
   ```

2. Track components
   Use glob pattern to track components with their test files and validate that Bit can isolate all components. Note - the command below fits the directory structure to the right. Find more usage examples.

   ```powershell
   bit add src/*
   bit status
   ```

   If any component has dependency graph issues, click here to learn how to resolve them.

3. Configure build step
   Configure build step for React-TypeScript.

   ```
   bit import bit.envs/compilers/react-typescript --compiler
   ```

4. Tag and export
   Set a version to all tracked components, and export to this collection.

   ```powershell
   $ bit tag --all 1.0.0
   $ bit export <user>.<lib>
   ```
