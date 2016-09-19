import React, {Component} from 'react';

import Superagent from 'superagent';

import Chatroom from './Chatroom';

export default class Movies extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            movies: [],
            selected: {
                title: ""
            }
        }
    }
    componentDidMount() {
        const url = 'http://api.themoviedb.org/3/discover/movie'
        const params = {
            api_key: '98b525225a2fe71d855108eca4fdf12d',
            'primary_release_date.gte': '2016-08-01'
        }

        Superagent
        .get(url)
        .query(params)
        .set('Accept', 'text/json')
        .end((error, response) => {
            if(error) {
                console.log("Error:" + error)
                return
            }

            const json = response.body
            const firstMovie = json.results[0]
            
            this.setState({
                movies: json.results
            })
            this.selectMovie(firstMovie, null)
        })
    }
    selectMovie(movie, event) {
        if(event != null)
            event.preventDefault()
        if(movie.posts == null)
            movie['posts'] = []
        this.setState({
            selected: movie
        })

        firebase.database().ref('posts/' + movie.id).on('value', (snapshot) => {
            const currentMessages = snapshot.val()

            if(currentMessages != null) 
                movie['posts'] = currentMessages

            this.setState({
                selected: movie
            })
            
        })
    }
    render() {
        const list = this.state.movies.map((movie, i) => {
            return (
                <li key={movie.id}>
                    <a onClick={this.selectMovie.bind(this, movie)} href="#" className="movie">{movie.title}</a>
                </li>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        {list}
                    </div>

                    <div className="col-md-8">
                        <Chatroom  movie={this.state.selected} />
                    </div>
                </div>
            </div>
        )
    }
}