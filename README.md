# Setting enviroment
	1. Setting node js
	2. git scm
	3. install express, ejs
		npm install express ejs
		npm install babel-cli@6 babel-preset-react-app@3
		


# Setting webpack to project react js
	Chia các cây dependency thành các chunk được load khi cần thiết
	Thời gian init ngắn hơn
	Mỗi static asset đểu có thể trở thành một module
	Khả năng tích hợp 3rd-party library như module
	Khả năng custom gần như mọi thành phần của module bundler
	Phù hợp với các dự án lớn

	1. Install webpack
		`npm install webpack -g`

	2. Create file webpack.config.js
		`
			module.exports = {
				entry: "./app.js",
				output: {
					filename: "bundle.js"
				}
			}
		`

	`webpack`

	- Watchmode: giup chung ta theo doi files, va khi co bat ky thay doi nao se ngay lap truc build va xuat ra file output

	3. Webpack loader và preloader
		`npm install babel-core babel-loader babel-preset-es2015 babel-preset-react webpack  --save-dev`

# React Js
	Mô hình trong React: M - V - V - M

	1. props - Propreties
		Sample: 
			`
				class Welcome extends React.Component {
					render() {
						return <h1>Hello {this.props.name}</h1>;
					}
				}

				const element = <Welcome name="Sara" />;
			`
		The same:
			`
				function Welcome(props) {
					return <h1>Hello {props.name}</h1>;
				}
			`

		default props
			`
				Welcome.defaultProps = {
					name: 'worls'
				}
			`

		-> Có thể truyền từ parent hoặc thiết lập từ chính component đó khi không có giá trị truyền vào.
		-> Không nên thay đổi props, có thể thay đổi bằng cách dùng setProps hoặc replateProps
		-> Thường sử dụng props cho các component hiển thị.
		- Trong React khi chúng ta muốn thay đổi props thì chúng ta sẽ gán nó với một state của component và thay đổi nó như state. Việc này không làm thay đổi giá trị props của component cha.
	2. state - Thành phần của component
		- Trong component có thể update state trực tiếp bằng cách this.state nhưng nên sử dụng setState để update state. 
		- Sử dụng setState để re-renders một component và tất cả các component con. Điều này giúp chúng ta ko phải lo lắng về việc viết các xử lý sự kiện event handler...
		- Bất cứ khi nào dữ liệu thay đổi trong component, state có thể sử dụng.

		- Sample:
			`
				class Form extends React.Component {
					constructor (props) {
						super(props)
						this.state = {
						input: ''
						}
					}
					handleChange = (text) => {
						this.setState({ input: text })
					}
					
					render () {
						const { input } = this.state
						return (
						<div>
							<label>
							Name:
							<input type="text" value={this.state.value} onChange={this.handleChange} />
							</label>
							<input type="submit" value="Submit" />
						</div>
						)
						}
				}
			`

			- Khi có tác động làm state thay đổi thì view ứng với state sẽ được cập nhập,
	3. Different props and state
		| Props | State 
		| :---: | :---: 
		| Props được sử dụng để truyền dữ liệu đến các component con | State được sử dụng để xác định hình dạng của dữ liệu ban đầu và khi tương tác của người dùng.
		| :---: | :---: 
		| Props thường được truyền lại từ các component cha | State được tạo trong component, nó lấy dữ liệu ban đầu trong phương thức constructor
		| :---: | :---: 
		| Props là thay đổi cho các component nhận được chúng. Bạn không thay đổi props được truyền cho một component từ bên trong component con đó | State có thể thay đổi, React sử dụng phương thức setState() để cập nhật object của state. State chỉ có thể bị thay đổi bởi component chứa state đó. Nó là riêng tư.
		| :---: | :---: 

	4. Ref - Referent