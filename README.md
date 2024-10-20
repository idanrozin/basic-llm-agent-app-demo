# My TypeScript Project

This is a Node.js project with TypeScript that implements an AI agent capable of using various tools to answer questions and perform tasks.

## Features

- Google Search Tool
- AI-powered Chat LLM (Large Language Model)
- ReAct Agent for complex problem-solving
- JavaScript Code Runner Tool
- Playground for testing and experimentation

## Prerequisites

- Node.js (version 20.3.0 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/my-typescript-project.git
   cd my-typescript-project
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   AI21_API_KEY=your_ai21_api_key_here
   SEARCH_API_KEY=your_serpapi_key_here
   ```

## Usage

The project includes several scripts that can be run using npm:

- Google Search: `npm run dev:googleSearch`
- Chat LLM: `npm run dev:chatLLM`
- Run Agent: `npm run dev:runAgent`
- Playground: `npm run dev:playground`
- Playground with Agent: `npm run dev:playgroundWithAgent`

Example:

```
npm run dev:runAgent
```

## Development

- Build the project: `npm run build`
- Run in development mode: `npm run dev`
- Lint the code: `npm run lint`
- Format the code: `npm run format`
- Run tests: `npm run test`

## Project Structure

- `src/`: Source code directory
  - `index.ts`: Main entry point
  - `Agent.ts`: ReAct agent implementation
  - `ChatLLM.ts`: Chat LLM interface
  - `GoogleSearchTool.ts`: Google Search tool implementation
  - `CodeRunner.ts`: JavaScript code runner tool
  - `types/`: TypeScript type definitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
