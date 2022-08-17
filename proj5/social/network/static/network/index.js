// execution part
document.addEventListener('DOMContentLoaded', () => {
    // get the CSRF token from cookies
    const csrftoken = Cookies.get('csrftoken');
    
    // fetch the posts
    fetch('/get_posts')
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            // throw response;
            throw new Error()
        };
    })
    .then(data => {
        // data is now a list of all serialized posts in JSON format
        data = data.posts;
        console.log('fetch posts');
        console.log(data);
        // load the initial ten posts
        load_posts(0, data, csrftoken);
        // start from the 11th post
        let start = 10;
        // every time the Next button is clicked, load ten more posts and increment start
        document.querySelector('#load-more-button').onclick = () => {
            load_posts(start, data, csrftoken);
            start += 10;
        };
        // define the new-post form action
        document.querySelector('#new-post-form').onsubmit = () => {
            const title = document.querySelector('new-post-title').value.trim();
            if (title === '') {
                alert('Title cannot be empty.');
            } else {
                const content = document.querySelector('new-post-content').value.trim();
                if (content === '') {
                    alert('Post content cannot be empty.');
                } else {
                    fetch('post_post', {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': csrftoken,
                        },
                        body: JSON.stringify({
                            title: title,
                            content: content
                        })
                    })
                    .then(response => {
                        if (response.ok) {
                            // if posting is successful, reload the whole page
                            location.reload();
                        } else {
                            throw response;
                        };
                    })
                    .catch(error => {
                        error.json().then(body => {
                            console.log(body.error);
                            alert(body.error);
                        })
                    });
                };
            };
        };
    })
    .catch(error => {console.log(error);
        // error.json().then(body => {
        //     console.log(body.error);
        //     alert(body.error);
        // });
    });
});


// // load ten posts
// function load_posts(start, data, csrftoken) {
//     let end = start+10;
//     // if not enough posts to load, only load what's left and hide the Next button
//     if (data.length <= start+10) {
//         end = data.length;
//         document.querySelector('#no-more-post').style.display = 'block';
//         document.querySelector('#load-more-button').style.display = 'none';
//     };
//     // console.log(end);
//     // load posts
//     for (let i=start; i<end; i++) {
//         load_each_post(data[i], csrftoken);
//     };
// };


// function load_each_comment(comment) {
//     // create a container for a comment
//     const comment_container = document.createElement('div');
//     comment_container.className = 'container';
//     // the commenter part (bold, link to profile page)
//     const comment_commenter = document.createElement('a');
//     comment_commenter.className = 'container font-weight-bold';
//     comment_commenter.innerHTML = comment.commenter;
//     comment_commenter.href = `/profile/${comment.commenter}`;
//     // the content part (normal)
//     const comment_content = document.createElement('div');
//     comment_content.className = 'container';
//     comment_content.innerHTML = comment.content;
//     // the timestamp part (text-muted)
//     const comment_timestamp = document.createElement('div');
//     comment_timestamp.className = 'container text-muted';
//     comment_timestamp.innerHTML = comment.timestamp;
//     // append commenter, content, and timestamp to the comment container
//     comment_container.append(comment_commenter, comment_content, comment_timestamp);
//     // append the container to the comment section
//     return comment_container;
// };


// function load_new_comment_section(post_comments, csrftoken) {
//     // create a hidden form for submitting a new comment
//     const new_comment = document.createElement('div');
//     new_comment.className = 'container';
//     // create the form
//     const new_comment_form = document.createElement('form');
//     new_comment_form.method = 'post';
//     // input for comment
//     const new_comment_content = document.createElement('input');
//     new_comment_content.autofocus = true;
//     new_comment_content.className = 'form-control';
//     new_comment_content.type = 'text';
//     new_comment_content.name = 'content';
//     new_comment_content.placeholder = 'Comment Here...';
//     // submit button
//     const new_comment_submit = document.createElement('input');
//     new_comment_submit.className = 'btn btn-primary';
//     new_comment_submit.type = 'submit';
//     new_comment_submit.value = 'Post';
//     // append the comment input and submit button to the form
//     new_comment_form.append(new_comment_content, new_comment_submit);
//     // set the action of the form
    // new_comment_form.onsubmit = () => {
    //     if (new_comment_content.value.trim() === '') {
    //         alert('Comment cannot be empty.')
    //     } else {
    //         fetch(`/post_comment/${post.pk}`, {
    //             method: 'POST',
    //             headers: {
    //                 'X-CSRFToken': csrftoken,
    //             },
    //             body: JSON.stringify({
    //                 comment: new_comment_content.value
    //             })
    //         })
    //         .then(response => {
    //             if (response.ok) {
    //                 return response.json()
    //             } else {
    //                 throw response
    //             }
    //         })
    //         .then(data => {
    //             // prepend this new comment to the top of comment section
    //             const new_comment_container = load_each_comment(data);
    //             post_comments.prepend(new_comment_container);
    //         })
    //         .catch(error => {
    //             error.json().then(body => {
    //                 console.log(body.error);
    //                 alert(body.error);
    //             })
    //         });
    //     };
    // };
//     // append the form to the container
//     new_comment.append(new_comment_form);
//     // hide this div by default
//     new_comment.style.display = 'none';
//     return new_comment;
// };


// function load_each_post(post, csrftoken) {
//     // the container for the post
//     const post_container = document.createElement('div');
//     post_container.className = 'container border p-4';

//     // first line: title of post
//     const post_title = document.createElement('h5');
//     post_title.innerHTML = post.title;

//     // second line: author of the post, link to the author's profile page
//     const post_author_link = document.createElement('a');
//     post_author_link.className = 'container';
//     const post_author = document.createElement('small');
//     post_author.innerHTML = post.author;
//     post_author.className = 'text-muted';
//     post_author_link.append(post_author);
//     post_author_link.href = `/profile/${post.author}`;

//     // third line: post content
//     const post_content = document.createElement('div');
//     post_content.className = 'container text-wrap';
//     post_content.style.whiteSpace = 'pre-wrap';
//     post_content.style.wordBreak = 'break-word';
//     post_content.innerHTML = post.content;

//     // const post_edit = document.createElement('div');
//     // create a hidden form for editing the content of the post
//     const edit_post = document.createElement('form');
//     edit_post.method = 'post';
//     // create a textarea and prepopulate it with current post content
//     const edit_textarea = document.createElement('textarea');
//     edit_textarea.className = 'form-control';
//     edit_textarea.value = post.content;
//     // create a save button
//     const edit_save_button = document.createElement('input');
//     edit_save_button.type = 'submit';
//     edit_save_button.className = 'btn btn-primary';
//     edit_save_button.value = 'Save';
//     // append the textarea and submit button
//     edit_post.append(edit_textarea, edit_save_button);
//     // set the display of this editing area to be none by default
//     edit_post.style.display = 'none';
//     // when clicks Save, send a PUT request to update the post, and change its displayed content
//     edit_post.onsubmit = () => {
        // if (edit_textarea.value.trim() === '') {
        //     alert('Post content cannot be empty.');
        // } else {
            // // PUT the new post content to the server
            // fetch(`/edit_post/${post.pk}`, {
            //     method: 'PUT',
            //     body: JSON.stringify({
            //         content: edit_textarea.value
            //     })
            // })
            // .then(response => {
            //     if (response.ok) {
            //         // change displayed content
            //         post_content.innerHTML = edit_textarea.value;
            //     } else {
            //         throw response;
            //     };
            // })
            // .catch(error => {
            //     error.json().then(body => {
            //         console.log(body.error),
            //         alert(body.error);
            //     })
            // });
        // };
//     };

//     // fourth line: post timestamp
//     const post_timestamp = document.createElement('div');
//     post_timestamp.className = 'container text-muted';
//     post_timestamp.innerHTML = post.timestamp;

//     // fifth line: the like button, number of likes
//     const post_likes = document.createElement('div');
//     post_likes.className = 'container';
//     // like button
//     const like_button = document.createElement('button');
//     like_button.className = 'heart';
//     like_button.style.color = post.if_liked ? 'red' : 'white';
//     // number of likes
//     const likes_num = document.createElement('span');
//     likes_num.innerHTML = parseInt(post.likes);
//     likes_num.className = 'text-muted';
//     // like button action
//     like_button.onclick = () => {
//         fetch(`/put_likes/${post.pk}`, {
//             method: 'PUT',
//             body: JSON.stringify({
//                 if_liked: post.if_liked
//             })
//         })
//         .then(response => {
//             if (response.ok) {
//                 // if the post was already liked, cancel the like; otherwise, make it liked
//                 if (post.if_liked) {
//                     post.likes--;
//                     likes_num.innerHTML = post.likes;
//                     like_button.style.color = 'white';
//                     post.if_liked = false;
//                 } else {
//                     post.likes++;
//                     likes_num.innerHTML = post.likes;
//                     like_button.style.color = 'red';
//                     post.if_liked = true;
//                 };
//             } else {
//                 throw response
//             };
//         })
//         .catch(error => {
//             error.json().then(body => {
//                 console.log(body.error);
//                 alert(body.error);
//             })
//         });
//     };
//     // put the button and number of likes into the container
//     post_likes.append(like_button, likes_num);

//     // last line: comment and edit (if author of the post) buttons
//     const edit_comment = document.createElement('div');
//     edit_comment.className = 'container';
//     // comment button
//     const comment_button = document.createElement('button');
//     comment_button.innerHTML = 'Comment';
//     comment_button.className = 'btn btn-link';
//     // edit button
//     const edit_button = document.createElement('button');
//     edit_button.innerHTML = 'Edit';
//     edit_button.className = 'btn btn-link';
//     // if user is not author of post, hide the edit button
//     if (!post.if_self_post) {
//         edit_button.style.display = 'none';
//     }
//     edit_comment.append(comment_button, edit_button);

//     // create a hidden section for posting new comments, put it between comment button and previous comments
//     const new_comment = load_new_comment_section(post_comments, csrftoken);

//     // extra section: load previous comments
//     const post_comments = document.createElement('div');
//     post_comments.className = 'container border p-2';
//     // load all comments for this post
//     fetch(`/get_comments/${post.pk}`)
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new Error(`Fetch GET comments of post ${post.pk} failed`)
//         };
//     })
//     .then(data => data.forEach(comment => {
//         // load each comment
//         const comment_container = load_each_comment(comment);
//         post_comments.append(comment_container);
//     }))
//     .catch(error => {
//         console.log(error);
//         alert(error);
//     });

//     // comment_button action
//     comment_button.onclick = () => {
//         // toggle between showing and hiding the new_comment section
//         if (new_comment.style.display === 'none') {
//             new_comment.style.display === 'block';
//         } else {
//             new_comment.style.display === 'none';
//         }
//     };

//     // edit button action
//     edit_button.onclick = () => {
//         // toggle between content of post and textarea repopulated with post content
//         if (edit_post.style.display === 'none') {
//             edit_post.style.display === 'block';
//             post_content.style.display === 'none';
//         } else {
//             edit_post.style.display === 'none';
//             post_content.style.display === 'block';
//         }
//     };

//     // append all the sections to the post container
//     post_container.append(post_title, post_author, post_content, edit_post, post_timestamp, post_likes, edit_comment, new_comment, post_comments);
//     // append this post to the #past-posts div on the main page
//     document.querySelector('#past-posts').append(post_container);
// };
