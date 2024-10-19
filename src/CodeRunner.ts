import { ToolInterface } from './types';
type Args = Map<string, unknown>;

interface TypescriptCodeRunnerConstructor {
  globals?: Args;
  locals?: Args | null;
}

class TypescriptCodeRunner {
  private _globals: Args;
  private _locals: Args | null;

  constructor({ globals = new Map(), locals = new Map() }: TypescriptCodeRunnerConstructor) {
    this._globals = globals;
    this._locals = locals;
  }

  run(command: string): string {
    const oldConsoleLog = console.log;
    let output = '';
    console.log = (...args) => {
      output += args.join(' ') + '\n';
    };

    try {
      // Note: This is a simplified version. In TypeScript, we can't directly
      // execute arbitrary code like in Python's exec().
      // You might need to use a JavaScript runtime or interpreter here.
      eval(command);
    } catch (e) {
      output = String(e);
    } finally {
      console.log = oldConsoleLog;
    }

    return output;
  }
}

function getDefaultTypescriptCodeRunner(): TypescriptCodeRunner {
  return new TypescriptCodeRunner({ locals: null });
}

export class TypescriptCodeRunnerTool implements ToolInterface {
  name = 'Typescript Code Runner';
  description: string =
    'A Typescript code runner. Use this to execute Typescript commands. ' +
    'Input should be a valid Typescript command. ' +
    'If you want to see the output of a value, you should print it out ' +
    'with `console.log(...)`.';
  python_repl: TypescriptCodeRunner;

  constructor() {
    this.python_repl = getDefaultTypescriptCodeRunner();
  }

  async use(input_text: string): Promise<string> {
    input_text = input_text.trim().replace(/^```|```$/g, '');
    return this.python_repl.run(input_text);
  }
}
