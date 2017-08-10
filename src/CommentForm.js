import React, { Component } from 'react';
import style from './style';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {author: '', text: ''};
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value});
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(`${this.state.author} said "${this.state.text}"`)
    //Will be tied to post method
  }

  render() {
    return (
      <form>
        <input
          type='text'
          palceholder='Your name...'
          style={style.commentFormAuthor}
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type='text'
          placeholder='Say something...'
          style={style.commentFormText}
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input
          type='submit'
          style={style.commentFormPost}
          value='Post'
        />
      </form>
    )
  }
}

export default CommentForm;
