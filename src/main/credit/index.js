import React, { Component } from 'react';
import { storageGet } from '../service/storage.service';
import CalcCredit from '../../shared/credit/calccredit';
import * as moment from 'moment';
import 'moment/locale/ru';

class CreditComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sum: undefined,
            period: undefined,
            newSum: undefined,
            percent: undefined,
            monthPay: undefined,
            creditSchema: undefined,
            error: undefined,
            remainder: undefined,
            date: undefined,
            payList: {
                summary: undefined
            }
        };
    }

    componentDidMount() {
        this.setState({
            sum: storageGet('credit.sum'),
            newSum: storageGet('credit.newSum'),
            percent: storageGet('credit.percent'),
            period: storageGet('credit.period'),
            monthPay: storageGet('credit.monthPay'),
            globalSum: storageGet('credit.globalSum'),
            creditSchema: storageGet('credit.creditSchema'),
            remainder: storageGet('credit.remainder'),
            date: storageGet('credit.date')
        });
        this.parseSum = this.parseSum.bind(this);
        this.parsePeriod = this.parsePeriod.bind(this);
        this.parsePercent = this.parsePercent.bind(this);
        this.calculateData = this.calculateData.bind(this);
        this.creditSchemaAnnuit = this.creditSchemaAnnuit.bind(this);
        this.creditSchemaDeff = this.creditSchemaDeff.bind(this);
        this.setDate = this.setDate.bind(this);
    }

    parseSum(event) {
        const value = event.target.value.replace(/[^\d.]*/g, '')
                                        .replace(/([.])[.]+/g, '$1')
                                        .replace(/^[^\d]*(\d+([.]\d{0,2})?).*$/g, '$1');
        this.setState({sum: value});
        localStorage.setItem('credit.sum', value);
    }
    parsePeriod(event) {
        const value = event.target.value.replace(/[^\d.]*/g, '');
        this.setState({period: value});
        localStorage.setItem('credit.period', value);
    }
    parsePercent(event) {
        const value = event.target.value.replace(/[^\d.]*/g, '');
        this.setState({percent: value});
        localStorage.setItem('credit.percent', value);
    }
    creditSchemaAnnuit(event) {
        this.setState({creditSchema: "annuit"});
    }
    creditSchemaDeff(event) {
        this.setState({creditSchema: "diff"});
    }
    shouldComponentUpdate(nextState, nextProps) {
        if(this.state !== nextState) 
            return true;
    }
    setDate(event) {
        this.setState({date: event.target.value});
    }
    calculateData(event) {
        event.preventDefault();
        if (!this.state.creditSchema)
            this.setState({error: "Пожалуйста, выберите способ кредитования!"});
        else {
            var newSum = parseFloat(this.state.sum);
            var period = parseFloat(this.state.period);
            var percent = parseFloat(this.state.percent);
            var mPay;
            var pPay;
            var remainder = newSum;
            var globalPayList = {list: [], summary: undefined};
            var myDate = this.state.date ? moment(this.state.date) : moment();
            moment.locale('ru');
            switch(this.state.creditSchema) {
                case 'diff': {
                    remainder = newSum/period;
                    pPay = newSum/period;
                    mPay = newSum/period;
                    var mainSum = 0.00;
                    var sumPayNow = 0.00;
                    var stavka = percent/100;
                    remainder = newSum;
                    for(let i = 0; i < period; i++) {
                        pPay = remainder * stavka/12;
                        sumPayNow = mPay + pPay;
                        myDate.add('months', 1)
                        globalPayList.list[i] = {date: myDate.format('MMMM YYYY'), remainder: remainder.toFixed(2), mPay: mPay.toFixed(2), pPay: pPay.toFixed(2), sPay: sumPayNow.toFixed(2)}
                        remainder = remainder - mPay;
                        mainSum = mainSum + sumPayNow;
                    }
                    break;
                }
                case 'annuit': {
                    remainder = 0.00;
                    pPay = 0.00;
                    mPay = 0.00;
                    var mainSum = 0.00;
                    var sumPayNow = 0.00;
                    var stavka = (percent / 12) / 100;
                    remainder = newSum;
                    sumPayNow = newSum * (stavka + (stavka / (Math.pow((1 + stavka), period) - 1)));
                    for(let i = 0; i < period; i++) {
                        pPay = remainder * stavka;
                        mPay = sumPayNow - pPay;
                        myDate.add('months', 1)
                        globalPayList.list[i] = {date: myDate.format('MMMM YYYY'), remainder: remainder.toFixed(2), mPay: mPay.toFixed(2), pPay: pPay.toFixed(2), sPay: sumPayNow.toFixed(2)}
                        remainder = remainder - mPay;
                        mainSum = mainSum + sumPayNow;
                    }
                    break;
                }
                default:
                    return '';
            }
            this.setState({
                payList: globalPayList
            });
        }
    }
    render() {
        return (
            <div>
                <form>
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
                            <input type="date" id="date" className="input form-control" placeholder=" " onChange={this.setDate}/>
                        </label>
                    </div>
                    <div className="flexbox flexbox-spbetween">
                        <label htmlFor="anuit" className="form-field">
                            <input type="radio" name="schema" id="anuit" className="input" placeholder=" " onClick={this.creditSchemaAnnuit}/>
                            <span className="">Аннуитетный</span>
                        </label>
                        <label htmlFor="diff" className="form-field">
                            <input type="radio" name="schema" id="diff" className="input" placeholder=" " onClick={this.creditSchemaDeff}/>
                            <span className="">Дифференцированный</span>
                        </label>
                    </div>
                    <div className="flexbox flexbox-spbetween">
                        <button type="submit" className="button button-action" onClick={this.calculateData}>Рассчитать</button>
                    </div>
                </form>
                <div className="views-body">
                    <table className="table">
                        <thead>
                            {this.state.payList.list && this.state.creditSchema? 
                                <tr>
                                    <th>
                                        <div className="list-row">
                                            <div className="list-head">№ Платежа</div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="list-row">
                                            <div className="list-head">Дата</div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="list-row">
                                            <div className="list-head">Остаток</div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="list-row">
                                            <div className="list-head">Основная выплата</div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="list-row">
                                            <div className="list-head">Выплата %</div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="list-row">
                                            <div className="list-head">Платёж</div>
                                        </div>
                                    </th>
                                </tr> : 
                                <div className="summary">Выберите схему кредитования</div> }
                        </thead>
                        <tbody>
                            { this.state.payList.list?
                                this.state.payList.list.map((item, index) => {
                                    return <CalcCredit key={index} 
                                                        payNumber={index + 1}
                                                        date={item.date}
                                                        remainder={item.remainder}
                                                        mPay={item.mPay}
                                                        pPay={item.pPay}
                                                        sPay={item.sPay}/>
                                }) : '' }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CreditComponent;
