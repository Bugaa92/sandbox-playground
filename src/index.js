import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class TodoListItem extends React.Component {
  render() {
    const { content } = this.props;
    return (
      <div>
        {content}
        <button onClick={this.handleClick}>Remove</button>
        <button onClick={this.handleMoveUp}>Move up</button>
        <button>Move down</button>
      </div>
    );
  }

  handleClick = e => {
    const { onRemove, id } = this.props;
    onRemove && onRemove(e, id);
  };

  handleMoveUp = e => {
    const { onMoveUp, id } = this.props;
    onMoveUp && onMoveUp(e, id);
  };
}

class TodoList extends React.Component {
  state = {
    inputValue: "",
    items: [{ content: "todo 1" }, { content: "todo 2" }, { content: "todo 3" }]
  };

  render() {
    const { items, inputValue } = this.state;

    return (
      <div>
        {items.map((item, index) => (
          <TodoListItem
            {...item}
            key={index}
            id={index}
            onMoveUp={this.handeMoveUp}
            onRemove={this.handleRemove}
          />
        ))}
        <input type="text" value={inputValue} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Add</button>
      </div>
    );
  }

  handeMoveUp = (e, id) => {
    if (id < 1) {
      return;
    }
    const { items } = this.state;
    const removed = items.splice(id, 1);
    items.splice(id - 1, 0, removed[0]);
    this.setState({ items });
  };

  handleRemove = (e, id) => {
    const { items } = this.state;
    items.splice(id, 1);
    this.setState({ items });
  };

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleClick = () => {
    const { items, inputValue } = this.state;
    items.push({ content: inputValue });
    this.setState({ items });
  };
}

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
