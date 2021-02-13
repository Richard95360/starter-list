import React, { Fragment, useState, useEffect } from 'react';
import '../../styles/App.css';
import {NavBar} from '../../components'
import {list } from '../../data';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {CartPage} from './Cart'
import {Home} from './Home'
import {Checkout} from './Checkout'
import UserProfileContextProvider from '../../lib/UserProfileContext'
import { Confirm} from '../../views/components/Confirm'

const App = props => {
  const {items, saveLocalStorage} = props
  const [category , setCategory] = useState(0);
  const [isFiltering , setFiltering] = useState(false);
  const [filtered , setFiltered] = useState(false);
  const [count, setCount] = useState(1);
  const loadCategory = i => {setCategory(i)}
  const filterResults = (input) => {
       let fullList = list.flat()
       let results = fullList.filter(item => {
         const name = item.name.toLowerCase()
         const term = input.toLowerCase()
         return name.indexOf(term) > 1
       })
      setFiltered(results);
  }

  useEffect(() => {
    saveLocalStorage(items)
    
  },[items])

 
 const update = () =>{

  }

  return (
    <Fragment>
      <Router>
        <UserProfileContextProvider>
     <NavBar filter={filterResults} setFiltering={setFiltering} count={count}/>
    
     <Route exact path="/" component={() => <Home 
                                                category={category} 
                                                loadCategory={loadCategory} 
                                                updateCart={update}
                                                list={list}
                                                isFiltering={isFiltering}
                                                filtered={filtered}/ >
                                                  }/>
      <Route path="/cart" component={CartPage} / >
      <Route path="/checkout" component={Checkout} / >
      <Route path="/delivery" component={Confirm} / >
        </UserProfileContextProvider>
      </Router>
      </Fragment>
  );
}
export default App;
