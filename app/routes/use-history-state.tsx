import useHistoryState from "../hooks/useHistoryState";

interface Todo {
  id: ReturnType<typeof crypto.randomUUID>;
  name: string;
}

interface FormProps {
  addItem: (todo: string) => void;
}

function Form(props: FormProps): React.JSX.Element {
  return (
    <form
      action={(formData) => {
        const todoText = formData.get("todo-text");

        props.addItem(todoText!.toString());
      }}
    >
      <input type="text" name="todo-text" id="todo-text" />
      <button>Add</button>
    </form>
  );
}

export default function App() {
  const { state, set, undo, redo, clear, canUndo, canRedo } = useHistoryState<
    { items: Todo[] }
  >({
    items: [],
  });

  const addTodo = (val: string) => {
    console.log("adding");
    set({
      ...state,
      items: state.items.concat({ id: crypto.randomUUID(), name: val }),
    });
  };

  const removeTodo = (id: string) => {
    set({
      ...state,
      items: state.items.filter((item) => item.id !== id),
    });
  };

  return (
    <section>
      <header>
        <h1>useHistoryState</h1>
        <div>
          <button disabled={!canUndo} className="link" onClick={undo}>
            Undo
          </button>
          <button disabled={!canRedo} className="link" onClick={redo}>
            Redo
          </button>

          <button
            disabled={!state.items.length}
            className="link"
            onClick={clear}
          >
            Clear
          </button>
        </div>
        <Form addItem={addTodo} />
      </header>

      <ul>
        {state.items.map((item, index) => {
          return (
            <li key={index}>
              <span>{item.name}</span>
              <button className="link" onClick={() => removeTodo(item.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
