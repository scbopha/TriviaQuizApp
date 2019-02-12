import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://opentdb.com/',
  timeout: 2000
})

loadQuiz = () => {
  return instance.get('api.php?amount=10')
}

export default {
  loadQuiz
}