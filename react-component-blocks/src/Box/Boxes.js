import React from 'react';
import './Boxes.css'
function ListItem(props) {
    return <li>{props.value}</li>
}
function CheckOddEven(props) {
    if (props.isOddEven) {
        return <p>{props.oddEvenValue} is an even number</p>
    }
    return <p>{props.oddEvenValue} is an odd number</p>;
}
function FunctionComponent(props) {
    if (!props.isToggle) {
        return null;
    }
    let numbers = [10, 20, 30, 40, 50];
    let lists = numbers.map((number) =>
        <ListItem key={number.toString()} value={number} />
    )
    return (
        <div className="fnComponent">
            This is a function component and will be only shown when the check Odd or Even button
            is clicked. <br />
            <CheckOddEven isOddEven={props.isOddEven} oddEvenValue={props.oddEvenValue} />
        </div>
    );
}
class Boxes extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.checkOddEven = this.checkOddEven.bind(this);
        this.state = {
            isToggle: props.isToggle === "true" ? true : false,
            isOddEven: '',
            oddEvenValue: '',
            showOddEven: false
        }
    }
    handleClick() {
        this.setState(state => ({
            isToggle: !state.isToggle
        }))
    }
    inputChange(event) {
        this.setState({
            oddEvenValue: event.target.value,
            showOddEven:false
        },()=>{
            //this.checkOddEven()
        });
       
    }
    checkOddEven() {
        if(!this.state.oddEvenValue){
            alert("Please enter a number");
            return false;
        }
        if (this.state.oddEvenValue % 2 === 0) {
            this.setState({
                isOddEven: true,
                showOddEven: true
            })
        } else {
            this.setState({
                isOddEven: false,
                showOddEven: true
            })
        }
    }
    render() {
        var box = (
            <div className='box' id={this.props.number}>
                <p>
                    Reusing Box component with dynamic value, this is box <span>{this.props.number} </span>
                    from App component.
                </p>
                <div>
                    <button onClick={this.handleClick}>
                        {this.state.isToggle ? 'Toggle button - ON' : "Toggle button - OFF"}
                    </button>
                </div>
                <div className="oddEven">
                    <input type="number" 
                    onChange={this.inputChange} 
                    value={this.state.oddEvenValue}
                    placeholder='Enter a number' />
                    <button onClick={this.checkOddEven}>
                        Check Odd or Even
                    </button>
                </div>
                <FunctionComponent isToggle={this.state.showOddEven}
                    isOddEven={this.state.isOddEven} oddEvenValue ={this.state.oddEvenValue} />
            </div>
        )
        return box;
    }
}
export default Boxes;