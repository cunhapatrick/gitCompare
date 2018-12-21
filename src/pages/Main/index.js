/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-first-prop-new-line */
import React, {
  Component,
} from 'react';
import moment from 'moment';
import Global from '../../styles/global';
import logo from '../../assets/logo.png';

import {
  Container,
  Form,
} from './styles';
import CompareList from '../../components/compareList';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositories: [],
    repositoryInput: '',
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });


    try {
      const { data: repository } = await api.get(`repos/${this.state.repositoryInput}`);

      repository.last_commit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositories: [...this.state.repositories, repository],
        repositoryInput: '',
        repositoryError: false,
      });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Container>
        <Global />
        <img src={logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit"> {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK' } </button>
        </Form>

        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}
