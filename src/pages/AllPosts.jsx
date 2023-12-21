
import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading,setLoading]=useState(true);
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
        setLoading(false)
    })
  return (
    <div className='w-full py-8'>
        <Container>
           {loading?( <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
  <span className='sr-only'>Loading...</span>
  <div className='h-8 w-8 bg-black rounded-full animate-bounce' style={{ animationDelay: '-0.3s' }}></div>
  <div className='h-8 w-8 bg-black rounded-full animate-bounce' style={{ animationDelay: '-0.15s' }}></div>
  <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
</div>




):( <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>)}
            </Container>
    </div>
  )
}

export default AllPosts