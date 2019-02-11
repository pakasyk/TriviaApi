import React, { Component } from "react";
import Trivia from "./API/trivia";

class App extends Component {
  state = {
    questions: [],
    number: 0,
    score: 0
  };

  onButtonClick = e => {
    if (
      e.target.value === this.state.questions[this.state.number].correct_answer
    ) {
      this.setState({ score: this.state.score + 1 });
    }
    this.setState({ number: this.state.number + 1 });

    if (this.state.number >= 9) {
      if (
        window.confirm(`You scored: ${this.state.score}.\n Wanna play again?`)
      ) {
        this.setState({
          number: 0,
          score: 0,
          questions: [{ question: "Loading..." }]
        });
        this.getQuestions();
      } else {
        alert("Looser!");
      }
    }
  };

  componentDidMount = () => {
    this.getQuestions();
  };

  getQuestions = () => {
    Trivia.get("api.php", {
      params: {
        amount: 10
        // type: "boolean"
      }
    })
      .then(response => {
        this.setState({ questions: response.data.results });
      })
      .catch(error => console.log(error));
  };

  render() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    const renderedQuestions = this.state.questions.map((question, index) => {
      if (question.type === 'boolean'){
        return (
          <div>
          <h3 key={index}>
          {index + 1}.{" "}
          {question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
        </h3>
        <div className="buttons d-flex" style={{ marginTop: "80px" }}>
        <button
          type="button"
          className="btn btn-success btn-lg btn-block"
          value="True"
          onClick={this.onButtonClick}
        >
          True
        </button>
        <button
          type="button"
          className="btn btn-danger btn-lg btn-block"
          value="False"
          onClick={this.onButtonClick}
          style={{ margin: 0 }}
        >
          False
        </button>
      </div>
      </div>
        );
      }else if (question.type === 'multiple'){
       
        let answers = question.incorrect_answers.map((answer, index) => (
          <button
          key={index}
          type="button"
          className="btn btn-primary btn-lg btn-block"
          onClick={this.onButtonClick}
          value={answer}
          style={{ margin: 0 }}
        >
          {answer}
        </button>
        ))

        let correct = <button
        key="3"
        type="button"
        className="btn btn-primary btn-lg btn-block"
        onClick={this.onButtonClick}
        value={question.correct_answer}
        style={{ margin: 0 }}
      >
        {question.correct_answer}
      </button>;

      answers.splice(getRandomInt(answers.length+1), 0, correct);
        return (
          <div>
          <h3 key={index}>
          {index + 1}.{" "}
          {question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
        </h3>
        <div className="buttons d-flex" style={{ marginTop: "80px" }}>
        {answers}
       
      </div>
      </div>
        )}
        
     
      // if(question.type === 'multiple'){
      //   <button className="btn btn-primary">labas</button>
      // }
    });

    return (
      <div className="container">
        <div
          className="jumbotron"
          style={{ marginTop: "50px", marginBottom: "20px" }}
        >
          <h1 className="display-4 text-right">score: {this.state.score}</h1>
          {renderedQuestions[this.state.number]}
          
        </div>
      </div>
    );
  }
}

export default App;
