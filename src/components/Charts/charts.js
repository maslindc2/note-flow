import React, { Component } from 'react'
import './charts.css'
import mermaid from 'mermaid';
import debounce from 'debounce';

class Charts extends Component {
    handleChange = debounce(
        (value) => {
            console.log(value);
            var output = document.getElementById('output');
            try {
                mermaid.parse(value);
                output.innerHTML = '';
                mermaid.render('theGraph', value, function (svgCode) {
                    console.log(svgCode);
                    output.innerHTML = svgCode;
                });
            } catch (err) {
                console.error(err);
            }
        },
        600,
        false
    );
    componentDidMount() {
        var output = document.getElementById('output');
        mermaid.initialize({ startOnLoad: true });

        var graphDefinition = `graph TB
        a-->b
        b-->a`;
        mermaid.render('theGraph', graphDefinition, function (svgCode) {
            console.log(svgCode);
            output.innerHTML = svgCode;
        });
    }
    render(){
        return (
            
            <div className="Charts">
                <textarea
                    rows="4"
                    onChange={(e) => this.handleChange(e.target.value)}
                />
                <div id="output"/>
            </div>
        );
    }
}export default Charts;