import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Header from './components/header/index';
import ListBooks from './components/container/listBooks';
import SearchList from './components/container/search';
import { Tabs, Tab } from 'react-bootstrap';
import Grid from './components/grid/index';
import Loading from './components/loadingSpinner/index';
import FloatingButton from './components/floatingButton/index';
import CatalogSearch from './components/catalogSearch/index';
import { Route } from 'react-router-dom';
import './App.css';

const WANTTOREAD = 'wantToRead';
const CURRENTLYREADING = 'currentlyReading';
const READ = 'read';

class BooksApp extends Component {

  constructor(props) {
    super(props);

    this.onUpdateShelf = this.onUpdateShelf.bind(this);
}

  state = {
    boooksCurrentlyReading : [],
    booksRead: [],
    booksWantToRead: [],
    searchList: [],
    loading: true,
    order: 0
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
        return true;
      });

      this.setState({
        boooksCurrentlyReading: curretnReadingBooks,
        booksRead: readBooks,
        booksWantToRead: wantToReadBooks,
        loading: false
      })
    })

  }

  onUpdateShelf = (event, currentState, bookInfo) => {
    this.setState({loading: true});
    switch (currentState) {
      case CURRENTLYREADING:
        this.state.boooksCurrentlyReading.map((book)=>{
          if(book.id === event.target.id){
            book.shelf = event.target.value;
            BooksAPI.update(book, event.target.value).then((res)=>{
              //since the BookAPI is not handling the errors, I am always considering succes on the return.
              this.updateShelfState()
            });

          }
          return true;
        });
        break;
      case WANTTOREAD:
        this.state.booksWantToRead.map((book)=>{
          if(book.id === event.target.id){
            book.shelf = event.target.value;
            BooksAPI.update(book, event.target.value).then(()=>{
              this.updateShelfState()
            });
          }
          return true;
        });
        break;
      case READ:
        this.state.booksRead.map((book)=>{
          if(book.id === event.target.id){
            book.shelf = event.target.value;
            BooksAPI.update(book, event.target.value).then(()=>{
              this.updateShelfState()
            });
          }
          return true;
        });
        break;
      default:
        bookInfo.shelf = event.target.value;
        BooksAPI.update(bookInfo, event.target.value).then(()=>{
          this.setState({
            booksRead: this.state.booksRead.concat(bookInfo)
          });
          this.updateShelfState()
        });
        break;
    }
  }

  updateShelfState(){
    let allBooks = [this.state.boooksCurrentlyReading, this.state.booksRead,this.state.booksWantToRead];
    this.setState({
      boooksCurrentlyReading : this.filterBooks(allBooks, CURRENTLYREADING),
      booksWantToRead: this.filterBooks(allBooks, WANTTOREAD),
      booksRead: this.filterBooks(allBooks, READ),
      loading: false
    })
  }

  filterBooks(allBooks, shelf){
    return allBooks.reduce((a,b)=>{
      return a.concat(b);
    }).filter((b)=> b.shelf === shelf);
  }

  handleSearch(searchList){
    let allShelfBooks = [this.state.boooksCurrentlyReading, this.state.booksRead,this.state.booksWantToRead];

    allShelfBooks = allShelfBooks.reduce((a,b)=>{
      return a.concat(b);
    });

    searchList = searchList.map((b)=>{
      let obj = allShelfBooks.find((book)=>{
        return book.id === b.id
      });

      return obj ? obj : b;
    });

    this.setState({
      searchList: searchList
    })
  }

  onChangeOrderBy(value){

    this.setState({
      boooksCurrentlyReading : this.doSort([].concat(this.state.boooksCurrentlyReading), "title", value),
      booksRead: this.doSort([].concat(this.state.booksRead), "title", value),
      booksWantToRead: this.doSort([].concat(this.state.booksWantToRead), "title", value)
    });

  }

  doSort(list, property, direction){
    const dirMap = {
      gt: { asc: 1, desc: -1 },
      lt: { asc: -1, desc: 1 }
    };

    list.sort((a,b)=>{
      if (a[property] < b[property]) {
        return dirMap.lt[ direction.toLowerCase() ];
      }
      if (a[property] > b[property]) {
        return dirMap.gt[ direction.toLowerCase() ];
      }
      return 0;
    });

    return list;
  }

  render() {
    const { boooksCurrentlyReading, booksWantToRead, booksRead, loading, searchList } = this.state;
    return (
      <div className="main clearfix">
          <Header>
            <Route path='/search' render={() => (
              <CatalogSearch onSearch={this.handleSearch.bind(this)}></CatalogSearch>
            )}
            />
          </Header>
          <Route exact path='/' render={() => (
            <ListBooks onChangeOrderBy={this.onChangeOrderBy.bind(this)}>
              <Tabs
                  defaultActiveKey={1}
                  id="controlled-tab"
                  >
                  <Tab eventKey={1} title="Want to read">
                    {loading ? <Loading /> :
                      <Grid books={booksWantToRead}  onUpdateShelf={this.onUpdateShelf}/>
                    }
                  </Tab>
                  <Tab eventKey={2} title="Reading">
                    {loading ? <Loading /> :
                      <Grid books={boooksCurrentlyReading} onUpdateShelf={this.onUpdateShelf}/>
                    }
                  </Tab>
                  <Tab eventKey={3} title="Read">
                    {loading ? <Loading /> :
                      <Grid books={booksRead} onUpdateShelf={this.onUpdateShelf}/>
                    }
                  </Tab>
              </Tabs>
              <FloatingButton/>
            </ListBooks>
          )}
          />

          <Route path='/search' render={() => (
            <SearchList >
               {loading ? <Loading /> :
              <Grid books={searchList} onUpdateShelf={this.onUpdateShelf}/>
               }
            </SearchList>
          )}
          />

      </div>
    )
  }
}

export default BooksApp
