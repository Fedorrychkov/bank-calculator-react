import React, { Component } from 'react';
import { storageGet } from '../service/storage.service';
import ViewComponent from '../../shared/calculate';

class DebitComponent extends Component {
    constructor(props) {
        super(props);
        // const date = new Date()
        // let nowDate; 
        // nowDate.day = date.getDate();
        // nowDate.month = date.getMonth()+1;
        // nowDate.year = date.getFullYear();
        this.state = {
            sum: undefined,
            period: undefined,
            newSum: undefined,
            percent: undefined,
            monthPay: undefined,
            payList: {
                summary: undefined
            }
            // date: `${nowDate.day}.${nowDate.month}.${nowDate.year}`
        };
    }

    componentDidMount() {
        this.setState({
            sum: storageGet('depos.sum'),
            newSum: storageGet('depos.newSum'),
            percent: storageGet('depos.percent'),
            period: storageGet('depos.period'),
            monthPay: storageGet('depos.monthPay'),
            globalSum: storageGet('depos.globalSum')
        });
        this.parseSum = this.parseSum.bind(this);
        this.parsePeriod = this.parsePeriod.bind(this);
        this.parsePercent = this.parsePercent.bind(this);
        this.calculateData = this.calculateData.bind(this);
    }

    parseSum(event) {
        const value = event.target.value.replace(/[^\d.]*/g, '')
                                        .replace(/([.])[.]+/g, '$1')
                                        .replace(/^[^\d]*(\d+([.]\d{0,2})?).*$/g, '$1');
        this.setState({sum: value});
        localStorage.setItem('depos.sum', value);
    }
    parsePeriod(event) {
        const value = event.target.value.replace(/[^\d.]*/g, '');
        this.setState({period: value});
        localStorage.setItem('depos.period', value);
    }
    parsePercent(event) {
        const value = event.target.value.replace(/[^\d.]*/g, '');
        this.setState({percent: value});
        localStorage.setItem('depos.percent', value);
    }
    shouldComponentUpdate(nextState, nextProps) {
        if(this.state !== nextState) 
            return true;
    }
    calculateData() {
        var newSum = parseFloat(this.state.sum);
        var pay = 0;
        var globalSum;
        var globalPayList = {list: [], summary: undefined};
        for(let i = 0; i < this.state.period; i++) {
            pay = newSum*(this.state.percent/100)/12;
            newSum = newSum + pay;
            globalPayList.list[i] = {sum: (newSum - pay).toFixed(2), pay: pay.toFixed(2), newSum: newSum.toFixed(2)};
            globalSum = newSum;
        }
        globalPayList.summary = globalSum.toFixed(2);
        globalPayList.percent = this.state.percent;
        
        this.setState({
            payList: globalPayList
        });
    }
    render() {
        return (
            <div>
                <div className="flexbox flexbox-spbetween">
                    <label htmlFor="sum" className="form-field">
                        <input type="text" id="sum" className="input form-control" placeholder=" " onInput={this.parseSum} value={this.state.sum}/>
                        <span className="form-label">Общая сумма</span>
                    </label>
                    <label htmlFor="period" className="form-field">
                        <input type="text" id="period" className="input form-control" placeholder=" " onInput={this.parsePeriod} value={this.state.period}/>
                        <span className="form-label">Срок</span>
                    </label>
                </div>
                <div className="flexbox flexbox-spbetween">
                    <label htmlFor="percent" className="form-field">
                        <input type="text" id="percent" className="input form-control" placeholder=" " onInput={this.parsePercent} value={this.state.percent}/>
                        <span className="form-label">Процент годовых</span>
                    </label>
                    <label htmlFor="date" className="form-field">
                        <input type="date" id="date" className="input form-control" placeholder=" "/>
                    </label>
                </div>
                <div className="flexbox flexbox-spbetween">
                    <button className="button button-action" onClick={this.calculateData}>Рассчитать</button>
                </div>
                <div className="views-body">
                    { this.state.payList.summary ? 
                        <div className="summary"> <b>Итог</b>: { this.state.payList.summary.toLocaleString() } руб. </div> : ''}
                    <table className="table">
                        <thead>
                            {this.state.payList.summary? 
                                <tr>
                                    <th>
                                        <div className="list-row">
                                            <div className="list-head">№ Платежа</div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="list-row">
                                            <div className="list-head">Сумма</div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="list-row">
                                            <div className="list-head">Начисление</div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="list-row">
                                            <div className="list-head">Новая сумма</div>
                                        </div>
                                    </th>
                                </tr> : '' }
                        </thead>
                        <tbody>
                            { this.state.payList.summary ?
                                this.state.payList.list.map((item, index) => {
                                    return <ViewComponent key={index} 
                                                        payNumber={index + 1} 
                                                        percent={this.state.payList.percent} 
                                                        newSum={item.newSum} 
                                                        sum={item.sum}
                                                        pay={item.pay}/>
                                }) : '' }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default DebitComponent;
