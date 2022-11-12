import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap';

const App = () => {
  const [post, setPost] = useState();
  const [postId, setPostid] = useState(1);

  const test = useCallback(() => {
    

    axios.get(`https://f05367a5-3cbb-4716-9ec9-28c4de105671.mock.pstmn.io/posts/1`)
        .then((response) => {
          //console.log(response);
          if(response.status === 200){
            setPost(response.data);
          } else {
            alert("잘못된 데이터입니다.")
          }
        })
        .catch((error) => {
          // console.log(error);
          if(error.response.status === 404){
            alert("페이지가 없습니다.")
          } else {
            alert("문제가 발생하였습니다. 개발자에게 연락주세요.")
          }
        })
        .finally(() => {
          console.log("무조건 실행됨")
        })



    // fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`,{method: "GET"})
    //   .then((data) => data.json())
    //   .then((data) => {
    //     setPost(data);
    //   });
  }, [postId]);

  useEffect(() => {
    test();
  }, [postId]);

  return (
    <div>
      {post == null ? (
        <div>로딩 중...</div>
      ) : (
        <Card style={{ width: "100%" }}>
          <Card.Header>Post 1 데이터</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>{post.userId}</ListGroup.Item>
            <ListGroup.Item>{post.id}</ListGroup.Item>
            <ListGroup.Item>{post.title}</ListGroup.Item>
            <ListGroup.Item>{post.body}</ListGroup.Item>
            <ListGroup.Item>
              {post.contents.map((item, index) => (
                // 함수 중괄호를 쓰려면 안에 return();를 추가하면 됨
                 <Card style={{ width: '100%' }} key={index}> 
                 {/* 반복문은 key={index} 필요 */}
                 <Card.Header>{item.email}</Card.Header>
                 <ListGroup variant="flush">
                   <ListGroup.Item>{item.body}</ListGroup.Item>
                 </ListGroup>
               </Card>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}
      <button onClick={ () => setPostid((prev)=> (prev)+1)}>다음 글</button>
    </div>
  );
};
export default App