import React, { Component } from 'react';

class CalcCredit extends Component {
    render() {
        return (
            <tr className="list-item">
                <td className="list-section">
                    <div className="list-row">
                        {/* <div className="list-head">№ Платежа</div> */}
                        <div className="list-value">{this.props.payNumber}</div>
                    </div>
                </td>
                <td className="list-section">
                    <div className="list-row">
                        {/* <div className="list-head">№ Платежа</div> */}
                        <div className="list-value">{this.props.date}</div>
                    </div>
                </td>
                <td className="list-section">
                    <div className="list-row">
                        {/* <div className="list-head">Сумма</div> */}
                        <div className="list-value">{this.props.remainder.toLocaleString()} руб.</div>
                    </div>
                </td>
                <td className="list-section">
                    <div className="list-row">
                        {/* <div className="list-head">Начисление</div> */}
                        <div className="list-value">{this.props.mPay.toLocaleString()} руб.</div>
                    </div>
                </td>
                <td className="list-section">
                    <div className="list-row">
                        {/* <div className="list-head">Новая сумма</div> */}
                        <div className="list-value">{this.props.pPay.toLocaleString()} руб.</div>
                    </div>
                </td>
                <td className="list-section">
                    <div className="list-row">
                        {/* <div className="list-head">Новая сумма</div> */}
                        <div className="list-value">{this.props.sPay.toLocaleString()} руб.</div>
                    </div>
                </td>
            </tr>
        );
    }
}

export default CalcCredit;