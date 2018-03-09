import React, { Component } from 'react';
import './index.css';

class ViewComponent extends Component {
    render() {
        return (
            <tr className="list-item">
                <td className="list-section">
                    <div className="list-row">
                        <div className="list-value">{this.props.payNumber}</div>
                    </div>
                </td>
                <td className="list-section">
                    <div className="list-row">
                        <div className="list-value">{this.props.sum.toLocaleString()} руб.</div>
                    </div>
                </td>
                <td className="list-section">
                    <div className="list-row">
                        <div className="list-value">{this.props.pay.toLocaleString()} руб.</div>
                    </div>
                </td>
                <td className="list-section">
                    <div className="list-row">
                        <div className="list-value">{this.props.newSum.toLocaleString()} руб.</div>
                    </div>
                </td>
            </tr>
        );
    }
}

export default ViewComponent;
