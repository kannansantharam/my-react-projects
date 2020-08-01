import React from 'react';
import './Boxes.css'
class Boxes extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        var box = (
            <div className='box' id={this.props.number}>
                Reusing Box component, this is box <span>{this.props.number} </span>
                from App component.
            </div>
        )
        return box;
    }
}
export default Boxes;