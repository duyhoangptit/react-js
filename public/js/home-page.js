var listItem;

function addDiv() {
    ReactDOM.render(
        <InputDivComponent />,
        document.getElementById("div-add")
    );
}

class Note extends React.Component {
    constructor(props) {
        super(props);
        // init state
        this.state = {
            modeEdit: false
        }

        // init bind this to method
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.cancelChange = this.cancelChange.bind(this);
    }

    deleteItem() {
        $.post('/delete', { id: this.props.id }, function (data) {
            listItem.setState({
                listTodo: data
            });
        });
    }

    updateItem() {
        this.setState({
            modeEdit: true
        });
    }

    saveChange() {
        var self = this;

        $.post("/update", {
            id: self.props.id,
            note: self.refs.txtNote.value
        }, function (data) {
            listItem.setState({
                listTodo: data
            });

            // Update lai state cua view
            self.setState({
                modeEdit: false
            });
        });
    }

    cancelChange() {
        // Update lai state cua view khi cancel
        this.setState({
            modeEdit: false
        });
    }

    render() {
        if (this.state.modeEdit) {
            return (
                <div className="div-note">
                    <input defaultValue={this.props.children} ref="txtNote" />
                    <button onClick={this.saveChange}>Save</button>
                    <button onClick={this.cancelChange}>Cancel</button>
                </div>
            );
        } else {
            return (
                <div className="div-note">
                    <p>{this.props.children}</p>
                    <button onClick={this.deleteItem}>Delete</button>
                    <button onClick={this.updateItem}>Update</button>
                </div>
            );
        }
    }
}

class ListComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listTodo: []
        }

        listItem = this;
    }

    componentDidMount() {
        $.get("/mock-todo-list", function (data) {
            listItem.setState({
                listTodo: data
            });
        });
    }

    render() {
        return (
            <div>
                <button onClick={addDiv}>Add</button>
                <div className="div-list">
                    <div id="div-add"></div>
                    {this.state.listTodo.map((note, index) => {
                        return <Note key={index} id={index}>{note}</Note>
                    })}
                </div>
            </div>
        );
    }
}


class InputDivComponent extends React.Component {
    constructor(props) {
        super(props);

        this.send = this.send.bind(this);
    }

    send() {
        const todoListName = this.refs.todoListName.value;
        $.post("/add", { note: todoListName }, function (data) {
            // Cap nhat lai mang sau khi duoc update
            listItem.setState({
                listTodo: data
            });
        });

        // An div input div using unmountComponentAtNode
        ReactDOM.unmountComponentAtNode(document.getElementById("div-add"));
    }

    render() {
        return (
            <div className="input-div">
                <input type="text" ref="todoListName" placeholder="Enter your note!" />
                <button onClick={this.send}>Save</button>
            </div>
        );
    }
}


ReactDOM.render(
    <div>
        <ListComponent></ListComponent>
    </div>,
    document.getElementById("root")
)