import React from 'react';
import PostForm from '../../components/logical/postForm'
import RequestStatusComponent from '../../components/logical/serverResponseComponent';
import PostList from '../../components/logical/postList';


export default function Main() {

    return (
		<div className='h-screen w-screen flex items-center bg-slate-600'>
			
				<div className="container mx-auto bg-slate-500">
				
					<h1 className='text-3xl font-bold' aria-label='main-title'>API Tester</h1>
					
					<hr />
					
					<PostForm />
					
					<hr />
					
					<RequestStatusComponent />
					
					<hr />

					<PostList />
				
				</div> 

		</div>

    )
}

