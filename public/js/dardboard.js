// Global func - <button onClick={getName}>Get Name</button>
function getName(name) {
    alert(name);
}


// Tao component, khi component đó được sử dụng lại.
// Khai báo đối tượng component in React 16.8.6, ban < 15.4 su dung React.createClass
class HeaderComponent extends React.Component {
    render() {
        // props
        return (
            <h1>{this.props.headerData}</h1>
        );
    };
}

class FooterComponent extends React.Component {
    render() {
        return (
            <h1>{this.props.footerData}</h1>
        );
    };
}

class ContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            age: 25,
            email: 'hoangtd5@fsoft.com.vn',
            sumAll: parseInt(this.props.valueDefault)
        }

        // bind this to method
        this.viewChirdren = this.viewChirdren.bind(this);
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    /**
     * Xu ly su kien khi click button View Chirdren
     */
    viewChirdren() {
        alert(this.props.children);
    }

    /**
     * Xu ly su kien dang ky
     */
    register() {
        this.state.sumAll = this.state.sumAll + 1;

        this.setState(this.state);

        // Khi đăng ký ta tăng số lượng tổng học viên
        console.log(this.state);
    }

    handleChange(event) {
        // Kiem tra xem input nao thay doi
        const target = event.target;
        // Lay gia tri change
        const valueChange = target.type === 'checkbox' ? target.checked : target.value;

        // Set value vao state
        this.setState({
            [target.name]: valueChange
        });
    }

    render() {
        return (
            <div id="content">
                <InputTag/>
                <MenuComponent />
                {this.props.contentData}
                <div>Tổng số học viên: {this.state.sumAll}</div>
                <p>Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input></p>
                <p>Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input></p>
                <p>Age: <input type="number" name="age" value={this.state.age} onChange={this.handleChange}></input></p>
                <p>Email: <input type="email" name="email" value={this.state.email} onChange={this.handleChange}></input></p>

                <h1 className="color-bg">Hello world{this.props.children}</h1>
                <button onClick={this.viewChirdren}>View children</button>
                <button onClick={() => { getName(this.props.contentData) }}>Get Name</button>
                <button onClick={this.register}>Register</button>
            </div>
        );
    };
}

class InputTag extends React.Component {
    constructor(props){
        super(props);

        this.show = this.show.bind(this);
    }

    show(){
        const name = this.refs.txtName.value;
        const slSex = this.refs.slSex.value;

        alert("Name: " + name + " Sex: " + slSex);
    }

    render() {
        return (
            <div>
                <select ref="slSex">
                    <option value="boy">Boy</option>
                    <option value="girl">Girl</option>
                    <option value="orther">Orther</option>
                </select>

                <p>Name: <input type="text" ref="txtName"/></p>

                <button onClick={this.show}>Show</button>
            </div>
        );
    }
}


class MenuComponent extends React.Component {
    render() {
        return (
            <div id="menu">Menu</div>
        );
    }
}

// 2 phan
// + Render cai gi
// + Render o dau
// Sử dung className thay cho class, vì trong javascript nó hiểu class là tạo class mới.
// Cach truyen gia tri vao trong react
// children se lay gia tri ben trong the component ma minh dinh nghia ra
const headerData = "Footer";
const footerData = "Header";
ReactDOM.render(
    <div>
        <HeaderComponent headerData={headerData} />
        <ContentComponent contentData="Data content" valueDefault="10">Dữ liệu children</ContentComponent>
        <FooterComponent footerData={footerData} />
    </div>
    ,
    document.getElementById("root"));

// 3. Su kien trong React js with props
/*{ <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button> }*/

    // Muon su dung bien this thi can dung bind de keep lai gia tri this
/*{ <button onClick={(e) => this.handleClick(e)}>
hoac
<button onClick={this.handleClick.bind(this)}></button> }*/
    // {getName(this.props.contentData) -> React hieu la thuc thi mot ham luc khoi tao chuong trinh
    // Co cac cach de thuc hien ham tren
    // - Cach 1: Goi thong qua ham khac(Khong nen dung)
    //      method(){getName(this.props...)}
    // - Cach 2: arrow func ()=>{}

// 4. State in react