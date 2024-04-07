import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Post from './components/Post'
import AddPost from './components/AddPost';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';


function App() {
  const End_Point = "http://localhost:9000/posts";
  // const DB_NAME = "posts";
  let [posts, setPosts] = useState([]);

  const addnewPost = async (post) => {
    await fetch(End_Point, {
      method: "POST",
      body: JSON.stringify(
        {
          title: post.title,
          desc: post.desc
        }
      ),
      headers: {
        'content-type': "application/json"
      }
    })
    setPosts([post, ...posts]);
  }

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(End_Point);
      let posts = await response.json();
      setPosts(posts);
    };

    fetchData();
  }, []);

  const postDeleteHandler = async (id) => {
    await fetch(End_Point + "/" + id, {
      method: "DELETE"
    })
    setPosts(posts.filter(post => post.id !== id));
  }

  const updatePostHandler = async (updatePost) => {
    await fetch(End_Point + "/" + updatePost.id, {
      method: "PATCH",
      body: JSON.stringify(updatePost),
      headers: {"content-type" :"application/json"}
    });
    setPosts(posts.map(po => po.id === updatePost.id ? updatePost : po))
  }

  return (
    <div className='container my-5 '>
      <div>

        <h1 className='text-center text-info my-3' >Posts</h1>

        <Router>
          <Routes>
            <Route path='/' element={<Post posts={posts} removePost={postDeleteHandler}></Post>}></Route>
            <Route path='/add' element={<AddPost addPost={addnewPost}></AddPost>}></Route>
            <Route path='/post/:id' element={<PostDetail></PostDetail>}></Route>
            <Route path="/post/edit/:id" element={<EditPost updatePost={updatePostHandler}></EditPost>}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
