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
                    output.innerHTML = svgCode;
                });

            } catch (err) {
                console.error(err);
            }
        },
        600,
        false
    );

    flowChart() {
        var graphType = `graph TD
        A[Christmas] -->|Get money| B(Go shopping)
        B --> C{Let me think}
        C -->|One| D[Laptop]
        C -->|Two| E[iPhone]
        C -->|Three| F[fa:fa-car Car]`;

        this.componentDidMount(graphType);
    }
    classDiagram() {
        var graphType = `classDiagram
        Animal <|-- Duck
        Animal <|-- Fish
        Animal <|-- Zebra
        Animal : +int age
        Animal : +String gender
        Animal: +isMammal()
        Animal: +mate()
        class Duck{
        +String beakColor
        +swim()
        +quack()
        }
        class Fish{
        -int sizeInFeet
        -canEat()
        }
        class Zebra{
        +bool is_wild
        +run()
        }`;
        this.componentDidMount(graphType);
    }
    componentDidMount(graphType) {
        var output = document.getElementById('output');
        mermaid.initialize({ startOnLoad: true });
        console.log("Working");
        if (graphType) {
            var graphDefinition = graphType;
            document.getElementById("textBox").value = graphType;
        } else {
            var template = `graph TB
            a-->b
            b-->a`;
            var graphDefinition = template;
            document.getElementById("textBox").value = template;
        }

        mermaid.render('theGraph', graphDefinition, function (svgCode) {
            console.log(svgCode);
            output.innerHTML = svgCode;
        });
    }

    render() {
        return (

            <div className="Charts">
                <button onClick={(e) => this.classDiagram(e)}>flowChart</button>
                <button onClick={(e) => this.flowChart(e)}>Class</button>
                <textarea
                    id="textBox"
                    rows="4"
                    onChange={(e) => this.handleChange(e.target.value) }
                />
                <div id="output" />
            </div>
        );
    }
} export default Charts;