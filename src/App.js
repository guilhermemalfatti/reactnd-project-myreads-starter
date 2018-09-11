import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Header from './components/header/index'
import Container from './components/container/index'
import { Tabs, Tab } from 'react-bootstrap';
import Grid from './components/grid/index';
import Loading from './components/loadingSpinner/index';
import './App.css';

const WANTTOREAD = 'wantToRead';
const CURRENTLYREADING = 'currentlyReading';
const READ = 'read';

class BooksApp extends Component {

  constructor(props) {
    super(props);

    this.updateShelf = this.updateShelf.bind(this);
}

  state = {
    boooksCurrentlyReading : [],
    booksRead: [],
    booksWantToRead: [],
    loading: true
  }

  componentDidMount(){
    this.setState({loading: true});
    BooksAPI.getAll().then((books) => {
      let curretnReadingBooks = [];
      let readBooks = [];
      let wantToReadBooks = [];

      books.map((book) =>{
        switch (book.shelf) {
          case CURRENTLYREADING:
            curretnReadingBooks.push(book);
            break;
          case WANTTOREAD:
            wantToReadBooks.push(book);
            break;
          default:
            readBooks.push(book);
            break;
        }
      });

      this.setState({
        boooksCurrentlyReading: curretnReadingBooks,
        booksRead: readBooks,
        booksWantToRead: wantToReadBooks,
        loading: false
      })
    })

  }

  updateShelf = (event, currentState) => {
    this.setState({loading: true});
    switch (currentState) {
      case CURRENTLYREADING:
        this.state.boooksCurrentlyReading.map((book)=>{
          if(book.id === event.target.id){
            book.shelf = event.target.value;
            BooksAPI.update(book, event.target.value).then((res)=>{
              //since the BookAPI is not handling the errors, I am always considering succes on the return.
              this.updateState()
            });

          }
        });
        break;
      case WANTTOREAD:
        this.state.booksWantToRead.map((book)=>{
          if(book.id === event.target.id){
            book.shelf = event.target.value;
            BooksAPI.update(book, event.target.value).then(()=>{
              this.updateState()
            });
          }
        });
        break;
      default:
        this.state.booksRead.map((book)=>{
          if(book.id === event.target.id){
            book.shelf = event.target.value;
            BooksAPI.update(book, event.target.value).then(()=>{
              this.updateState()
            });
          }
        });
        break;
    }
  }

  updateState(){
    let allBooks = [this.state.boooksCurrentlyReading, this.state.booksRead,this.state.booksWantToRead];
    this.setState({
      boooksCurrentlyReading : this.filterBooks(allBooks, CURRENTLYREADING),
      booksWantToRead: this.filterBooks(allBooks, WANTTOREAD),
      booksRead: this.filterBooks(allBooks, READ),
      loading: false
    })
  }

  filterBooks(arrays, shelf){
    return arrays.reduce((a,b)=>{
      return a.concat(b);
    }).filter((b)=> b.shelf === shelf);
  }

  render() {
    const { boooksCurrentlyReading, booksWantToRead, booksRead, loading } = this.state;
    return (
      <div className="main clearfix">
          <Header/>
          <Container >
            <Tabs
                  activeKey={this.state.key}
                  id="controlled-tab"
                  >
                  <Tab eventKey={1} title="Want to read">
                    {loading ? <Loading /> :
                      <Grid books={booksWantToRead}  onUpdateShelf={this.updateShelf}/>
                    }
                  </Tab>
                  <Tab eventKey={2} title="Reading">
                    {loading ? <Loading /> :
                      <Grid books={boooksCurrentlyReading} onUpdateShelf={this.updateShelf}/>
                    }
                  </Tab>
                  <Tab eventKey={3} title="Read">
                    {loading ? <Loading /> :
                      <Grid books={booksRead} onUpdateShelf={this.updateShelf}/>
                    }
                  </Tab>
              </Tabs>
          </Container>

      </div>
    )
  }
}

export default BooksApp
