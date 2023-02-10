document.addEventListener('DOMContentLoaded', () => {
    // Edit button action
    document.querySelectorAll('.edit-post-button').forEach(button => button.onclick = () => {
        console.log('Edit button clicked');
        const post_id = button.dataset.postid;
        const post_content = document.querySelector(`#post-content-${post_id}`);
        const edit_post = document.querySelector(`#edit-post-${post_id}`);
        if (getComputedStyle(edit_post).display === 'none') {
            edit_post.style.display = 'block';
            post_content.style.display = 'none';
        } else {
            edit_post.style.display = 'none';
            post_content.style.display = 'block';
        };
    });

    // edit post form action
    document.querySelectorAll('.edit-post').forEach(form => form.onsubmit = (event) => {
        event.preventDefault();
        const post_id = form.dataset.edit;
        const content = form.elements["content"].value;
        if (content === '') {
            alert('Post content cannot be empty');
        } else {
            fetch(`/edit_post/${post_id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                },
                body: JSON.stringify({
                    'content': content
                })
            })
            .then(response => {
                if (response.ok) {
                    const post_content = document.querySelector(`#post-content-${post_id}`)
                    post_content.innerHTML = content;
                    post_content.style.display = 'block';
                    form.style.display = 'none';
                } else {
                    throw response
                }
            })
            .catch(error => {
                console.log(error);
                error.json().then(body => alert(body.error));
            });
        };
    });
    
    // Comment button action
    document.querySelectorAll('.comment-button').forEach(button => button.onclick = () => {
        const post_id = button.dataset.postid;
        const new_comment = document.querySelector(`#new-comment-${post_id}`);
        console.log(`Comment button clicked, id=${post_id}`);
        // const past_comments = document.querySelector(`#past-comments-${post_id}`);
        if (getComputedStyle(new_comment).display === 'none') {
            console.log('change new-comment display to block');
            new_comment.style.display = 'block';
            // past_comments.style.display = 'block';
        } else {
            console.log('change new-comment display to none');
            new_comment.style.display = 'none';
            // past_comments.style.display = 'none';
        };
    });

    // posting new comment form action
    document.querySelectorAll('.new-comment').forEach(form => form.onsubmit = (event) => {
        event.preventDefault();
        const post_id = form.dataset.comment;
        const content = document.querySelector(`#new-comment-input-${post_id}`).value.trim();
        if (content === '') {
            alert('Comment cannot be empty.');
        } else {
            fetch(`/post_comment/${post_id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                },
                body: JSON.stringify({
                    'content': content
                })
            })
            .then(response => {
                if (response.ok) {
                    form.style.display = 'none';
                    return response.json();
                } else {
                    throw response
                }
            })
            .then(data => {
                // create a new div for the new comment and prepend it to #past-comments
                const new_comment_container = document.createElement('div');
                new_comment_container.className = 'container border p-1';

                const new_comment_commenter = document.createElement('a');
                new_comment_commenter.innerHTML = data.commenter;
                new_comment_commenter.className = 'font-weight-bold';
                new_comment_commenter.href = `/profile/${data.commenter}`;

                const new_comment_content = document.createElement('div');
                new_comment_content.innerHTML = content;
                new_comment_content.className = 'container';

                const new_comment_timestamp = document.createElement('div');
                new_comment_timestamp.innerHTML = data.timestamp;
                new_comment_timestamp.className = 'container text-muted';

                new_comment_container.append(new_comment_commenter, new_comment_content, new_comment_timestamp);
                document.querySelector(`#past-comments-${post_id}`).prepend(new_comment_container);

                // clear out the new-comment input field
                document.querySelector(`#new-comment-input-${post_id}`).value = '';
            })
            .catch(error => {
                console.log(error);
                error.json().then(body => alert(body.error));
            });
        };
    });

    // Like button action
    document.querySelectorAll('.fa-heart').forEach(button => button.onclick = () => {
        const post_id = button.dataset.postid;
        const if_liked = parseInt(button.dataset.ifliked);
        console.log(if_liked);
        fetch(`/put_likes/${post_id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            },
            body: JSON.stringify({
                'if_liked': if_liked
            })
        })
        .then(response => {
            if (response.ok) {
                const like_num = document.querySelector(`#like-number-${post_id}`)
                const likes = parseInt(like_num.innerHTML);
                like_num.innerHTML = likes - if_liked;
                button.dataset.ifliked = -if_liked;
            } else {
                throw response;
            };
        })
        .catch(error => {
            console.log(error);
            error.json().then(body => alert(body.error));
        });
    });

    // create a new post
    const new_post = document.querySelector('#new-post-form');
    // console.log(new_post);
    if (new_post !== null) {
        new_post.onsubmit = () => {
            // console.log('attempt to submit new post')
            const title = document.querySelector('#new-post-title').value.trim();
            const content = document.querySelector('#new-post-content').value.trim();
            console.log(content);
            if (title === '') {
                alert('Post title cannot be empty.');
            } else if (content === '') {
                alert('Post content cannot be empty.');
            } else {
                console.log('submitting a new post');
                fetch('post_post', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-type': 'application/json',
                        'X-CSRFToken': Cookies.get('csrftoken')
                    },
                    body: JSON.stringify({
                        'title': title,
                        'content': content
                    })
                })
                .then(response => {
                    if (response.ok) {
                        console.log('new post successfully submitted');
                        location.reload();
                    } else {
                        console.log('error in submitting new post');
                        throw response;
                    };
                })
                .catch(error => {
                    console.log(error);
                    error.json().then(body => alert(body.error));
                });
            };
            return false;
        };
    };

    // Follow and Unfollow buttons
    const follow_button = document.querySelector('#follow-button');
    const unfollow_button = document.querySelector('#unfollow-button');
    if (follow_button !== null) {
        follow_button.onclick = () => {
            const username = follow_button.dataset.username;
            fetch(`/change_follow/${username}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                },
                body: JSON.stringify({
                    'username': username,
                    'if_following': false
                })
            })
            .then(response => {
                if (response.ok) {
                    follow_button.style.display = 'none';
                    unfollow_button.style.display = 'block';
                    const follower = document.querySelector('#followers-num');
                    const follower_num = parseInt(follower.innerHTML) + 1;
                    follower.innerHTML = follower_num;
                } else {
                    throw response
                };
            })
            .catch(error => {
                console.log(error);
                error.json().then(body => alert(body.error));
            });
        };

        unfollow_button.onclick = () => {
            const username = unfollow_button.dataset.username;
            fetch(`/change_follow/${username}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                },
                body: JSON.stringify({
                    'username': username,
                    'if_following': true
                })
            })
            .then(response => {
                if (response.ok) {
                    follow_button.style.display = 'block';
                    unfollow_button.style.display = 'none';
                    const follower = document.querySelector('#followers-num');
                    const follower_num = parseInt(follower.innerHTML) - 1;
                    follower.innerHTML = follower_num;
                } else {
                    throw response
                };
            })
            .catch(error => {
                console.log(error);
                error.json().then(body => alert(body.error));
            });
        };
    };
});
