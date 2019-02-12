import React from 'react';
import { Text, Modal, View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Button } from '../components/buttons';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';

class StartScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Trivia Quiz App'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      quizStatus: 'ready',
      isRetry: false,
      isWaitingDialog: false,
      waitingMessage: '',
      quizIndex: 0,
      quizResult: [],
      question: {},
      answers: [],
      correctAnswer: 0,
      startTime: new Date()
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.Api.loadResult.success) {
      Alert.alert('Error', `Fail to load data:${newProps.Api.loadResult.error}`);
    } else if (this.state.quizStatus === 'loading') {
      if (newProps.Api.loadResult.data.length === 0) {
        Alert.alert('Error', `Fail to load data: there is no quiz data`);
        return;
      }

      // Start quiz with first question
      const quizIndex = 0;
      const question = newProps.Api.loadResult.data[quizIndex];
      var answers = question.incorrect_answers.map((e, i) => {
        return { isCorrect: false, text: e }
      });
      var correctindex = Math.floor(Math.random() * answers.length + 1);
      answers.splice(correctindex, 0, { isCorrect: true, text: question.correct_answer })

      this.setState({
        quizStatus: 'game',
        quizIndex: quizIndex,
        question: question,
        answers: answers,
        quizResult: [],
        correctAnswer: 0,
        startTime: new Date()
      })
    }
  }

  // loading method
  loadQuiz() {
    this.setState({
      waitingMessage: 'Preparing Quiz',
      quizStatus: 'loading'
    })
    this.props.navigation.dispatch({ type: 'LOAD_QUIZ' });
  }

  // render loading modal
  renderLoading() {
    return (
      <Modal transparent={true} onRequestClose={() => null} visible={this.props.Api.isLoading}>
        <View style={styles.waitingBackground}>
          <View style={styles.waitingLayout}>
            {this.state.waitingMessage !== '' && <Text style={{ fontSize: 18, fontWeight: '200' }}>{this.state.waitingMessage}</Text>}
            <ActivityIndicator size="large" />
          </View>
        </View>
      </Modal>
    );
  }

  renderStart() {
    return (
      <Button containerStyle={styles.startButton} onPress={() => this.loadQuiz()}>
        <Text>Start Quiz</Text>
      </Button>
    );
  }

  onPressAnwser(answer) {
    var quizresult = this.state.quizResult;
    quizresult.push(answer.isCorrect)
    var correctAnswer = this.state.correctAnswer
    if (answer.isCorrect) {
      correctAnswer++;
    }
    if (this.state.quizIndex === this.props.Api.loadResult.data.length - 1) {// if last quiz
      // show result
      var diff = Math.floor((new Date().getTime() -  this.state.startTime.getTime()) / 1000);
      this.setState({
        quizStatus: 'result',
        diff: diff
      })
      return;
    }

    const quizIndex = this.state.quizIndex + 1;
    const question = this.props.Api.loadResult.data[quizIndex];
    var answers = question.incorrect_answers.map((e, i) => {
      return { isCorrect: false, text: e }
    });
    var correctindex = Math.floor(Math.random() * answers.length + 1);
    answers.splice(correctindex, 0, { isCorrect: true, text: question.correct_answer })

    this.setState({
      quizStatus: 'game',
      quizIndex: quizIndex,
      question: question,
      answers: answers,
      correctAnswer: correctAnswer
    })
  }

  renderQuiz() {
    return (
      <View style={styles.content}>
        <Text style={styles.questionTitle}>Question {this.state.quizIndex + 1}</Text>
        <View
          style={{ width: 300, height: 100 }}>
          <WebView
            originWhitelist={['*']}
            source={{ html: this.state.question.question }}
            useWebKit={false}
            scalesPageToFit={false}
          />
        </View>
        {
          this.state.answers.map((answer, index) => {
            return (
              <Button key={`${index}`} containerStyle={styles.answerButton} onPress={() => this.onPressAnwser(answer)}>
                <Text>{answer.text}</Text>
              </Button>
            )
          })
        }
      </View>
    )
  }

  renderResult() {    
    return (
      <View style={styles.content}>
        <Text style>Result: {this.state.correctAnswer}/{this.props.Api.loadResult.data.length}</Text>
        <Text style>Time: {this.state.diff}s</Text>
        <Button containerStyle={styles.retryButton} onPress={() => this.loadQuiz()}>
          <Text>Retry Again</Text>
        </Button>
      </View>
    )
  }

  renderContent() {
    switch (this.state.quizStatus) {
      case 'game':
        return this.renderQuiz()
      case 'result':
        return this.renderResult()
      default:
        return this.renderStart()
    }
  }

  render() {
    return (
      <View style={styles.background}>
        {this.renderContent()}
        {this.renderLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    width: '100%',
    alignItems: 'center'
  },
  startButton: {
    borderColor: 'grey',
    borderWidth: 1,
    width: '60%',
    height: 50
  },
  waitingBackground: {
    flex: 1,
    backgroundColor: '#000000A0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  waitingLayout: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 25
  },
  questionTitle: {
    fontSize: 20,
    color: 'black',
    height: '15%',
    width: '100%',
    textAlign: 'center'
  },
  question: {
    fontSize: 16,
    color: 'black',
    width: '80%',
    textAlign: 'center',
    marginVertical: 20
  },
  answerButton: {
    borderColor: 'grey',
    borderWidth: 1,
    width: '60%',
    height: 40,
    marginVertical: 5
  },  
  retryButton: {
    borderColor: 'grey',
    borderWidth: 1,
    width: '60%',
    height: 50,
    top: 20
  }
})

function mapStateToProps(state) {
  return {
    Api: state.Api
  }
}

export default connect(
  mapStateToProps
)(StartScreen)
