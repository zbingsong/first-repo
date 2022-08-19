document.addEventListener('DOMContentLoaded', () => load_index);


function load_posts() {
    // Edit button action
    document.querySelectorAll('.edit-post-button').forEach(button => button.onclick = () => {
        const post_id = button.dataset.postid;
        const post_content = document.querySelector(`#post-content-${post_id}`);
        const edit_post = document.querySelector(`#edit-post-${post_id}`);
        if (edit_post.style.display === 'none') {
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
        const content = document.querySelector(`#edit-post-${post_id}`).value;
        if (content === '') {
            alert('Post content cannot be empty');
        } else {
            fetch(`/edit_post/${post_id}`, {
                method: 'PUT',
                credentials: 'include',
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
        // const past_comments = document.querySelector(`#past-comments-${post_id}`);
        if (new_comment.style.display === 'none') {
            new_comment.style.display = 'block';
            // past_comments.style.display = 'block';
        } else {
            new_comment.style.display = 'none';
            // past_comments.style.display = 'none';
        };
    });

    // posting new comment form action
    document.querySelectorAll('.new-comment').forEach(form => form.onsubmit = (event) => {
        event.preventDefault();
        const post_id = form.dataset.comment;
        const content = document.querySelector(`#new-comment-input-${post_id}`).value;
        if (content === '') {
            alert('Comment cannot be empty.');
        } else {
            fetch(`/post_comment/${post_id}`, {
                method: 'POST',
                credentials: 'include',
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
                const new_comment_container = document.createElement('div');
                new_comment_container.className = 'container border p-1';

                const new_comment_commenter = document.createElement('a');
                new_comment_commenter.innerHTML = data.commenter;
                new_comment_commenter.className = 'font-weight-bold';
                new_comment_commenter.href = `/profile/${commenter}`;

                const new_comment_content = document.createElement('div');
                new_comment_content.innerHTML = content;
                new_comment_content.className = 'container';

                const new_comment_timestamp = document.createElement('div');
                new_comment_timestamp = data.timestamp;
                new_comment_timestamp.className = 'container text-muted';

                new_comment_container.append(new_comment_commenter, new_comment_content, new_comment_timestamp);
                document.querySelector(`#past-comments-${post_id}`).prepend(new_comment_container);
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
};


function load_index() {
    load_posts();

    const new_post = document.querySelector('#mew-post-form');
    if (new_post !== null) {
        fetch('post_post', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                'title': document.querySelector('#new-post-title').value,
                'content': document.querySelector('#new-post-content').value
            })
        })
        .then(response => {
            if (response.ok) {
                location.reload();
            } else {
                throw response;
            };
        })
        .catch(error => {
            console.log(error);
            error.json().then(body => alert(body.error));
        });
    };

    const follow_button = document.querySelector('#follow-button');
    const unfollow_button = document.querySelector('#unfollow-button');
    if (follow_button !== null) {
        follow_button.onclick = () => {
            fetch(`/change_follow/${follow_button.dataset.username}`, {
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
                    // TODO
                } else {
                    throw response
                };
            })
            .catch(error => {
                console.log(error);
                error.json().then(body => alert(body.error));
            });
        };
    } else if (unfollow_button !== null) {
        unfollow_button.onclick = () => {
            fetch(`/change_follow/${unfollow_button.dataset.username}`, {
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
                    // TODO
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
};
