import React from 'react';
import PostForm from '../../components/logical/postForm'
import RequestStatusComponent from '../../components/logical/serverResponseComponent';
import PostList from '../../components/logical/postList';


export default function Main() {

    return (
		<div className='h-screen w-screen flex items-center bg-slate-600'>
			
				<div className="bg-slate-500 max-w-lg card">
				
					<h1 className='card-title' aria-label='main-title'>API Tester</h1>
					
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

