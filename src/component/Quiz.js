import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import { quiz } from "./json/quiz";
import { Wrapper, Question } from "./styles/quiz";

class Quiz extends PureComponent {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.quizData = quiz[this.id];
    this.state = {
      score: 0,
      submit: false,
      value: []
    };
  }

  handleOnChange = question => event => {
    let obj = { id: question, name: event.target.name };
    let currentValue = this.state.value;
    currentValue = currentValue.filter(c => c.id !== question);
    currentValue = currentValue.concat([obj]);
    this.setState({ value: currentValue });
  };

  handleOnSubmit = () => {
    const { value } = this.state;
    const correctAnswers = {};
    for (let i of this.quizData) {
      correctAnswers[i.id] = i.correctAnswer;
    }
    let score = 0;
    value.forEach(v => {
      if (v.name === correctAnswers[v.id]) {
        score++;
      }
    });
    let newObj = {};
    newObj[this.id] = score;
    localStorage.setItem("score", JSON.stringify(newObj));
    this.setState({ score });
    this.setState({ submit: true });
  };

  render() {
    const { submit, score, value } = this.state;
    if (submit) {
      return <div>{`your score is ${score}`}</div>;
    }
    return (
      <Wrapper>
        {this.quizData === undefined ? (
          <div>Not Valid Course</div>
        ) : (
          <div>
            {this.quizData.map((q, i) => {
              return (
                <Question key={i}>
                  <div>{q.question}</div>
                  <div>
                    <input
                      type="radio"
                      name={q.option1}
                      checked={value.some(
                        v => v.id === q.id && v.name === q.option1
                      )}
                      onChange={this.handleOnChange(q.id)}
                    />
                    <div>{q.option1}</div>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name={q.option2}
                      checked={value.some(
                        v => v.id === q.id && v.name === q.option2
                      )}
                      onChange={this.handleOnChange(q.id)}
                    />
                    <div>{q.option2}</div>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name={q.option3}
                      checked={value.some(
                        v => v.id === q.id && v.name === q.option3
                      )}
                      onChange={this.handleOnChange(q.id)}
                    />
                    <div>{q.option3}</div>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name={q.option4}
                      checked={value.some(
                        v => v.id === q.id && v.name === q.option4
                      )}
                      onChange={this.handleOnChange(q.id)}
                    />
                    <div>{q.option4}</div>
                  </div>
                </Question>
              );
            })}
            <button onClick={this.handleOnSubmit}>Submit</button>
          </div>
        )}
      </Wrapper>
    );
  }
}

export default withRouter(Quiz);
