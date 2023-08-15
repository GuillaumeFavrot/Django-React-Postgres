import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import PostComponent from './index';
import { Post } from '../../types';
import fs from 'fs'
import path from 'path'

const dummyPost: Post = { _id: 1, text: 'First post' }

let component: any;

describe('PostComponent', () => {
    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <PostComponent key={dummyPost._id} _id={dummyPost._id} text={dummyPost.text}/>
            </Provider>
        );

        const cssFile = fs.readFileSync(
            path.resolve(__dirname, '../../assets/App.css'),
            'utf8'
        )
        
        const { container } = component
        
        const style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = cssFile
        container.append(style)
    });

    it('should display the post text', () => {
        const postText = component.getByText(dummyPost.text)
        expect(postText).toBeInTheDocument();
        });

    it('should display the post delete button', () => {
        const deleteLink = component.queryByTestId("Delete");
        expect(deleteLink).toBeInTheDocument();
        }
    );  
    
    it('The modification form should be hidden from the start then appear on click', () => {
        const modifyLink = component.queryByTestId("Modify");
        expect(modifyLink).not.toBeVisible();
        const postText = component.getByText(dummyPost.text);
        fireEvent.click(postText);
        expect(modifyLink).toBeVisible();
        }
    );  
})




