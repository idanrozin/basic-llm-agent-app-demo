import { ToolInterface } from './types';
type Args = Map<string, unknown>;

interface JavascriptCodeRunnerConstructor {
  globals?: Args;
  locals?: Args | null;
}

class JavascriptCodeRunner {
  private _globals: Args;
  private _locals: Args | null;

  constructor({ globals = new Map(), locals = new Map() }: JavascriptCodeRunnerConstructor) {
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
      // Note: This is a simplified version. In Javascript, we can't directly
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

function getDefaultJavascriptCodeRunner(): JavascriptCodeRunner {
  return new JavascriptCodeRunner({ locals: null });
}

export class JavascriptCodeRunnerTool implements ToolInterface {
  name = 'Javascript Code Runner';
  description: string =
    'A Javascript code runner. Use this to execute Javascript commands. ' +
    'Input should be a valid Javascript command. ' +
    'If you want to see the output of a value, you should print it out ' +
    'with `console.log(...)`.';
  jsRunner: JavascriptCodeRunner; // like REPL in python

  constructor() {
    this.jsRunner = getDefaultJavascriptCodeRunner();
  }

  async use(inputText: string): Promise<string> {
    const cleanedString = cleanCode(inputText);
    return this.jsRunner.run(cleanedString);
  }
}

// a helper function to clean the code from the user input the tool is used with
const cleanCode = (str: string): string => {
  const prefix = '```javascript\n';
  const suffix = '```';

  if (str.startsWith(prefix) && str.endsWith(suffix)) {
    return str.slice(prefix.length, -suffix.length);
  }
  return str;
};
