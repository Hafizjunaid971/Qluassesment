import styles from "./styles.module.css";
import { useState, useEffect } from 'react';
import axios from "axios";
import Item from "../Todo/item";
import ReactPaginate from "react-paginate";

import '../Todo/todo.css';
const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [text, setText] = useState("");
	const [todo, setTodo] = useState([]);
	const [isUpdating, setUpdating] = useState("");
  
	useEffect(() => {
	  axios.get("http://localhost:5000/get-todo")
		.then((res) => setTodo(res.data))
		.catch((err) => console.log(err));
	})
  
	const addUpdateTodo = () => {
  
	  if (isUpdating === "") {
		axios.post("http://localhost:5000/save-todo", { text })
		  .then((res) => {
			console.log(res.data);
			setText("");
		  })
		  .catch((err) => console.log(err));
	  }else{
		axios.post("http://localhost:5000/update-todo", { _id: isUpdating, text })
		  .then((res) => {
			console.log(res.data);
			setText("");
			setUpdating("");
		  })
		  .catch((err) => console.log(err));
	  }
	}
  
	const deleteTodo = (_id) => {
	  axios.post("http://localhost:5000/delete-todo", { _id })
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));
	}
  
	const updateTodo = (_id, text) => {
	  setUpdating(_id);
	  setText(text);
	}
  

// pagination
const [pageNumber, setPageNumber] = useState(0);

const usersPerPage = 10;
const pagesVisited = pageNumber * usersPerPage;


const pageCount = Math.ceil(todo.length / usersPerPage);

const changePage = ({ selected }) => {
  setPageNumber(selected);
};

// 
	

	return (
		<>
	<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>QLU TasK</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>

		<div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder='Write Something...'
            value={text}
            onChange={(e) => setText(e.target.value)} />
          <div className="add"
            onClick={addUpdateTodo}>{isUpdating ? "Update" : "Add"}</div>
        </div>

        <div className="list">

		{/* const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => { */}
          {todo.slice(pagesVisited,pagesVisited +usersPerPage).map(item => <Item
		  
            key={item._id}
            text={item.text}
            remove={() => deleteTodo(item._id)}
            update={() => updateTodo(item._id, item.text)} />)}
        </div>

      </div>
    </div>


	<div className="App">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
		</>



	);
};

export default Main;
