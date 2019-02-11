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
          score: 0
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
        amount: 10,
        type: "boolean"
      }
    })
      .then(response => {
        this.setState({ questions: response.data.results });
      })
      .catch(error => console.log(error));
  };

  render() {
    const renderedQuestions = this.state.questions.map((question, index) => (
      <h3 key={index}>
        {index + 1}.{" "}
        {question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
      </h3>
    ));

    return (
      <div className="container">
        <div
          className="jumbotron"
          style={{ marginTop: "50px", marginBottom: "20px" }}
        >
          <h1 className="display-4 text-right">score: {this.state.score}</h1>
          {renderedQuestions[this.state.number]}
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
      </div>
    );
  }
}

export default App;
